import React, { ReactElement, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import { useEmotionDetection } from "../hooks/useEmotionDetection";
import { FullScreenCamera } from "./FullscreenCamera";

interface PoseCameraProps {
  onGuidanceTextChange: (text: string) => void;
  onFinished: (blob: Blob) => void;
}

export function PoseCamera(props: PoseCameraProps): ReactElement {
  const { onGuidanceTextChange, onFinished } = props;

  const webcamRef = useRef<Webcam & HTMLVideoElement>(null);
  const [guidanceText, image] = useEmotionDetection(webcamRef);

  useEffect(() => {
    if (guidanceText) onGuidanceTextChange(guidanceText);
  }, [guidanceText]);

  useEffect(() => {
    if (image)
      fetch(image).then((rawImage) =>
        rawImage.blob().then((_blob) => {
          onFinished(_blob);
        })
      );
  }, [image]);

  return <FullScreenCamera webcamRef={webcamRef} facingMode="user" />;
}

export default PoseCamera;
