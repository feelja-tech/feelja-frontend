import {
  WasmSDK,
  BlinkIdCombinedRecognizer,
  RecognizerRunner,
  VideoRecognizer,
  loadWasmModule,
  WasmSDKLoadSettings,
  createBlinkIdCombinedRecognizer,
  createRecognizerRunner,
  DisplayableQuad,
} from "@microblink/blinkid-in-browser-sdk";
import { useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import { microblinkLicense } from "../helpers/environment";
import { parseMicroblinkStatus } from "../helpers/parseMicroblinkStatus";

export function useMicroblink(
  webcamRef: React.MutableRefObject<Webcam & HTMLVideoElement>
): [string, string] {
  const [wasmSDK, setWasmSDK] = useState<WasmSDK>(null);
  const [recognizer, setRecognizer] = useState<BlinkIdCombinedRecognizer>(null);
  const [recognizerRunner, setRecognizerRunner] = useState<RecognizerRunner>(
    null
  );
  const [videoRecognizer, setVideoRecognizer] = useState<VideoRecognizer>(null);

  const [image, setImage] = useState(null);

  const [guidanceText, setGuidanceText] = useState("Get ready");

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    setInitialized(true);
    if (!initialized) {
      console.log("Load wasmSDK");

      loadWasmModule({
        ...new WasmSDKLoadSettings(microblinkLicense),
        engineLocation: `${window.location.origin}/microblink`,
      })
        .then((_wasmSDK: WasmSDK) => {
          setWasmSDK(_wasmSDK);
        })
        .catch(console.error);
    }
  }, [initialized]);

  useEffect(() => {
    if (wasmSDK && !recognizer) {
      console.log("Load recognizer");
      createBlinkIdCombinedRecognizer(wasmSDK)
        .then((_recognizer) => {
          setRecognizer(_recognizer);
        })
        .catch(console.error);
    }
  }, [wasmSDK, recognizer, setRecognizer]);

  const onQuadDetection = useCallback(
    (quad: DisplayableQuad) => {
      if (quad.detectionStatus) {
        const { guidanceText: text, success } = parseMicroblinkStatus(
          quad.detectionStatus
        );

        setGuidanceText(text);

        if (videoRecognizer && success && !image && webcamRef.current) {
          const img = webcamRef.current.getScreenshot({
            height: 1280,
            width: 720,
          });
          setImage(img);
          videoRecognizer.pauseVideoFeed();
          videoRecognizer.releaseVideoFeed();
        }
      }
    },
    [image, videoRecognizer, webcamRef.current]
  );

  useEffect(() => {
    if (recognizerRunner && !image) {
      recognizerRunner.setMetadataCallbacks({
        onQuadDetection,
      });
    }
  }, [recognizerRunner, onQuadDetection, image]);

  useEffect(() => {
    if (wasmSDK && recognizer && !recognizerRunner) {
      console.log("Load recognizerRunner");
      createRecognizerRunner(wasmSDK, [recognizer], true, {})
        .then((_recognizerRunner) => {
          setRecognizerRunner(_recognizerRunner);
        })
        .catch(console.error);
    }
  }, [wasmSDK, recognizer, recognizerRunner]);

  useEffect(() => {
    if (
      webcamRef.current.video &&
      recognizer &&
      recognizerRunner &&
      !videoRecognizer
    ) {
      console.log("Load videoRecognizer");
      VideoRecognizer.createVideoRecognizerFromCameraStream(
        webcamRef.current.video,
        recognizerRunner
      )
        .then((_videoRecognizer) => {
          setVideoRecognizer(_videoRecognizer);
        })
        .catch((err) => {
          console.error(err.reason);
        });
    }
  }, [recognizer, recognizerRunner, webcamRef, videoRecognizer]);

  useEffect(() => {
    if (
      !image &&
      videoRecognizer &&
      recognizer &&
      recognizerRunner &&
      webcamRef.current
    ) {
      console.log("Running recognizer");

      setGuidanceText("Frame your ID");

      videoRecognizer.pauseVideoFeed();

      videoRecognizer.startRecognition(() => {
        setGuidanceText("Done!");

        setTimeout(() => {
          setGuidanceText("Uploading");
        }, 2000);
      });
    }
  }, [videoRecognizer, recognizer, recognizerRunner, webcamRef, image]);

  return [guidanceText, image];
}

export default useMicroblink;
