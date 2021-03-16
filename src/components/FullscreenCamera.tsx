import React, { ReactElement } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";

interface FullscreenCameraProps {
  webcamRef?: React.MutableRefObject<Webcam & HTMLVideoElement>;
  facingMode: "environment" | "user";
}

const WebcamContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  overflow: hidden;
  width: 100%;
  justify-content: center;
  display: flex;
  height: 100%;
  align-items: center;
  top: 0;
`;

export function FullScreenCamera(props: FullscreenCameraProps): ReactElement {
  const { webcamRef, facingMode } = props;

  return (
    <WebcamContainer>
      <Webcam
        ref={webcamRef}
        audio={false}
        height={1080}
        width={1920}
        videoConstraints={{
          height: 1080,
          width: 1920,
          facingMode,
        }}
        mirrored={facingMode === "user"}
        style={{
          position: "absolute",
          zIndex: -1,
          height: "100%",
          width: "100%",
          objectFit: "cover",
        }}
      />
    </WebcamContainer>
  );
}

export default FullScreenCamera;
