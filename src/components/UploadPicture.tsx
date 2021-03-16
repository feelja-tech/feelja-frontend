/* eslint-disable no-nested-ternary */
import React, { ChangeEvent, MutableRefObject, ReactElement } from "react";
import styled from "styled-components";
import { ResponsiveImage } from "./ResponsiveImage";

// const UploadPictureIcon = styled(ResponsiveImage)`
//   height: 30px;
//   width: 30px;
//   position: absolute;
//   filter: brightness(2);
// `;

export const UploadedImage = ResponsiveImage;

interface PictureUploaderProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  setImageRef?: any; // MutableRefObject<HTMLImageElement>;
  src: string;
}

const PictureUploaderContainer = styled.label`
  filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.161));
  box-shadow: 0 0 0 1px #e4d7d7;
  border-radius: 8px;

  height: auto;
  width: 60%;
`;

export function PictureUploader(props: PictureUploaderProps): ReactElement {
  const { onChange, onClick, setImageRef, src } = props;

  return (
    <PictureUploaderContainer>
      {src ? (
        <ResponsiveImage onLoad={setImageRef} src={src} />
      ) : (
        <ResponsiveImage src="/avatar.jpg" />
      )}
      <input
        multiple={false}
        type="file"
        accept="image/png, image/jpeg"
        style={{ display: "none" }}
        onChange={(event) => {
          onChange(event);
        }}
        onClick={onClick}
      />
    </PictureUploaderContainer>
  );
}
