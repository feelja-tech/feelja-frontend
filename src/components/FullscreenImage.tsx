import React, { ReactElement } from "react";
import styled from "styled-components";

interface FullscreenImageProps {
  image: string;
}

const FullscreenImageContainer = styled.div<{ image?: string }>`
  position: absolute;
  z-index: -1;
  left: 50%;
  transform: translate(-50%, 0);
  overflow: hidden;
  width: 100%;
  justify-content: center;
  display: flex;
  height: 100%;
  background-image: ${(props) => `url(${props.image})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  align-items: center;
  top: 0;
`;

export function FullscreenImage(props: FullscreenImageProps): ReactElement {
  const { image } = props;
  return <FullscreenImageContainer image={image} />;
}

export default FullscreenImage;
