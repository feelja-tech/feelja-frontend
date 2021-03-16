import React, { ReactElement } from "react";
import styled from "styled-components";

// hex2rgba(props.theme.primary, 0.07)

const BigIconComponent = styled.svg`
  background: #fef0f1;
  fill: ${(props) => props.fill || props.theme.secondary};
  color: ${(props) => props.theme.primary};

  border-radius: 50%;
  max-height: 17vh;
  max-width: 17vh;

  height: 100%;
  width: auto;
  stroke-width: 1.2;
  padding: 7%;
`;

export function BigIcon(props): ReactElement {
  return <BigIconComponent {...props} />;
}

export default BigIcon;
