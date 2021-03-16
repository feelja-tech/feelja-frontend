import React, { ReactElement } from "react";
import styled, { CSSProperties } from "styled-components";
import { BigIcon } from "./BigIcon";
import { Description } from "./Typography";

const DescriptionWithIconContainer = styled.div`
  padding: 0 0 3% 3%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  width: 65%;
`;

interface DescriptionWithIconProps {
  description: string;
  icon: any;
  style?: CSSProperties;
}

const IconContainer = styled.div`
  margin: 0% 25%;
`;

export function DescriptionWithIcon(
  props: DescriptionWithIconProps
): ReactElement {
  const { description, icon, style = {} } = props;

  return (
    <DescriptionWithIconContainer style={style}>
      <Description>{description}</Description>
      <BigIcon as={icon} style={{ margin: "5px", height: "50px" }} />
      <Description>{description}</Description>
    </DescriptionWithIconContainer>
  );
}

export default DescriptionWithIcon;
