import * as faceapi from "@vladmandic/face-api";
import { TinyFaceDetectorOptions } from "@vladmandic/face-api";
import mergeImages from "merge-images";
import { useCallback, useEffect, useState } from "react";
import Webcam from "react-webcam";

const REQUIRED_EMOTIONS: string[] = ["surprised", "happy"];

function runDetection(
  webcamRef,
  setCurrentEmotion
): Promise<
  faceapi.WithFaceExpressions<
    faceapi.WithFaceLandmarks<
      {
        detection: faceapi.FaceDetection;
      },
      faceapi.FaceLandmarks68
    >
  >
> {
  return faceapi
    .detectSingleFace(webcamRef.current.video, new TinyFaceDetectorOptions())
    .withFaceLandmarks(true)
    .withFaceExpressions()
    .then((detection) => {
      if (detection) {
        setCurrentEmotion(detection.expressions.asSortedArray()[0].expression);
      }

      return detection;
    });
}

function runDetectionRec(webcamRef, setCurrentEmotion, setRecordingTimeout) {
  runDetection(webcamRef, setCurrentEmotion).then(() => {
    setRecordingTimeout(
      setTimeout(() => {
        runDetectionRec(webcamRef, setCurrentEmotion, setRecordingTimeout);
      }, 1000)
    );
  });
}

export function useEmotionDetection(
  webcamRef: React.MutableRefObject<Webcam & HTMLVideoElement>
): [string, string] {
  const [recordingTimeout, setRecordingTimeout] = useState<NodeJS.Timeout>();

  const [emotions, setEmotions] = useState<Record<string, boolean>>(
    REQUIRED_EMOTIONS.reduce((acc, curr) => {
      acc[curr] = false;
      return acc;
    }, {})
  );

  const [finished, setFinished] = useState(false);

  const [guidanceText, setGuidanceText] = useState("Get ready!");

  const [images, setImages] = useState([]);
  const [image, setImage] = useState<string>();

  const [currentEmotion, setCurrentEmotion] = useState("");

  const imgWidth = 480;
  const imgHeight = 720;

  useEffect(() => {
    if (finished) {
      setGuidanceText("Done!");

      setTimeout(() => {
        setGuidanceText("Uploading");
      }, 2000);

      mergeImages(
        images.map((img, idx) => ({ src: img, y: 0, x: idx * imgWidth })),
        {
          width: imgWidth * images.length,
          height: imgHeight,
        }
      ).then(setImage);

      clearInterval(recordingTimeout);
    }
  }, [images, finished]);

  const handleEmotion = useCallback(
    (sourceEmotion: string, targetEmotion: string) => {
      setGuidanceText(
        `Make a${
          targetEmotion === "angry" ? " very" : ""
        } ${targetEmotion} face`
      );
      if (sourceEmotion === targetEmotion) {
        setEmotions((prev) => ({ ...prev, [targetEmotion]: true }));

        setImages((prev) => [
          ...prev,
          webcamRef.current.getScreenshot({
            height: imgHeight,
            width: imgWidth,
          }),
        ]);
      }
    },
    [webcamRef.current]
  );

  useEffect(() => {
    if (currentEmotion.length > 0)
      if (Object.values(emotions).reduce((acc, curr) => acc && curr)) {
        setFinished(true);
      } else if (!emotions[REQUIRED_EMOTIONS[0]]) {
        handleEmotion(currentEmotion, REQUIRED_EMOTIONS[0]);
      } else if (!emotions[REQUIRED_EMOTIONS[1]]) {
        handleEmotion(currentEmotion, REQUIRED_EMOTIONS[1]);
      }
    // else if (!emotions[REQUIRED_EMOTIONS[2]]) {
    //   handleEmotion(currentEmotion, REQUIRED_EMOTIONS[2]);
    // }
  }, [currentEmotion, handleEmotion, emotions]);

  useEffect(() => {
    if (!finished && webcamRef.current) {
      if (webcamRef.current.video)
        webcamRef.current.video.addEventListener("loadeddata", () => {
          runDetectionRec(webcamRef, setCurrentEmotion, setRecordingTimeout);
        });
    }

    return () => {
      if (recordingTimeout) clearInterval(recordingTimeout);
    };
  }, [finished, webcamRef.current, recordingTimeout]);

  return [guidanceText, image];
}

export default useEmotionDetection;
