import * as faceapi from "@vladmandic/face-api";
import React, { ReactElement, useEffect, useState } from "react";
import { PictureUploader } from "./UploadPicture";

interface UploadPictureProps {
  onChange: (blob?: Blob, visualAge?: number, sex?: string) => void;
  onIsLoading: () => void;
}

// There's a bug in face-api, need this to get a proper padded box instead of:
// detection.box.pad(padding, padding).toSqaure()
function getAbsoluteBox(detection: faceapi.FaceDetection): faceapi.Rect {
  const smallDim = Math.min(detection.imageHeight, detection.imageWidth);
  const padding = smallDim / 3;

  const square = detection.box.toSquare();
  const padded = detection.box.pad(padding, padding);

  return new faceapi.Rect(
    padded.x,
    padded.y,
    square.width + padding,
    square.height + padding
  );
}

/* <SmartUploadPicture
        onIsLoading={() => {
          setIsLoading(true);
        }}
        onChange={(blob, visualAge, sex) => {
          setIsLoading(false);

          if (sex) dispatch(setGenderState(sex));
          if (visualAge) dispatch(setVisualAgeState(visualAge));
          if (blob) setImageBlob(blob);
        }}
      /> */

export function SmartUploadPicture(props: UploadPictureProps): ReactElement {
  const { onChange, onIsLoading } = props;

  const [runningDetection, setRunningDetection] = useState(false);
  const [ranDetection, setRanDetection] = useState(false);

  const [image, setImage] = useState(null);

  const [blob, setBlob] = useState<Blob>();

  const [ageAndSex, setAgeAndSex] = useState(null);

  const [imageRef, setImageRef] = useState<HTMLImageElement>();

  const reader = new FileReader();

  reader.onload = () => {
    setImage(reader.result);
  };

  useEffect(() => {
    if (ranDetection) {
      setRanDetection(false);

      onChange(blob, ageAndSex?.visualAge, ageAndSex?.sex);
    }
  }, [ranDetection, blob, ageAndSex]);

  useEffect(() => {
    if (image && !runningDetection && imageRef) {
      setRunningDetection(true);

      // console.log("Running detection ");

      faceapi
        .detectSingleFace(imageRef, new faceapi.TinyFaceDetectorOptions())
        .withAgeAndGender()
        .then((detection) => {
          if (detection) {
            setAgeAndSex({
              sex: detection.gender,
              visualAge: Math.ceil(detection.age),
            });

            faceapi
              .extractFaces(imageRef, [getAbsoluteBox(detection.detection)])
              .then((faceImages) => {
                const img =
                  faceImages.length > 0
                    ? faceImages[0].toDataURL("image/webp")
                    : null;
                setImage(img);

                if (img)
                  fetch(img).then((rawImage) =>
                    rawImage.blob().then((_blob) => {
                      setBlob(_blob);
                      setRanDetection(true);
                    })
                  );
                else setRanDetection(true);
              });
          } else {
            setImage(null);
            setRanDetection(true);
          }

          return detection; // ?
        });
    }
  }, [image, runningDetection, imageRef]);

  return (
    <PictureUploader
      src={image}
      setImageRef={setImageRef}
      onChange={(event) => {
        if (event.target.files.length > 0)
          reader.readAsDataURL(event.target.files[0]);
        else onChange();
      }}
      onClick={() => {
        setImage(null);
        onIsLoading();
        setRunningDetection(false);
      }}
    />
  );
}

export default SmartUploadPicture;
