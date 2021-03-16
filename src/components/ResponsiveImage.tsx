import Image, { ImageProps } from "next/image";
import React, { ReactElement } from "react";
import styled from "styled-components";
import { BaseContainer } from "./Containers";

export const ResponsiveImageComponent = styled(Image)<
  ImageProps & {
    $circle?: boolean;
  }
>`
  transform: translateZ(0);

  object-fit: cover;
  width: 100%;
  height: auto;

  border-radius: ${(props) => (props.$circle ? "50%" : "8px")};
`;

export const ResponsiveImageContainer = styled(BaseContainer)`
  flex-direction: row;
  align-items: center;

  filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.161));
`;

interface ResponsiveImageProps {
  onLoad?: any;
  round?: boolean;
  src?: string | null;
  onClick?: () => void;
}

export function ResponsiveImage(props: ResponsiveImageProps): ReactElement {
  const { src, round, onLoad, onClick } = props;

  return src ? (
    <ResponsiveImageComponent
      height={500}
      width={500}
      layout="responsive"
      alt="Picture"
      onLoad={(event) => {
        if (onLoad) onLoad(event.target);
      }}
      src={src}
      $circle={round}
      onClick={onClick}
    />
  ) : (
    <></>
  );
}

export default ResponsiveImage;
