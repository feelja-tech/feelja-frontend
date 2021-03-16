import React, {
  CSSProperties,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from "react";
import styled from "styled-components";
import { Description, Title } from "./Typography";

interface TitleDescriptionProps {
  title: ReactNode;
  description: ReactNode;
  style?: CSSProperties;
  card?: boolean;
}

const TitleDescriptionContainer = styled.div`
  width: 80%;
`;

export function TitleDescription(
  props: PropsWithChildren<TitleDescriptionProps>
): ReactElement {
  const { title, description, children, style = {}, card = false } = props;

  return (
    <TitleDescriptionContainer style={style}>
      <Title
        style={{
          marginBottom: card ? "none" : "16px",
          textAlign: "left",
          fontSize: card ? "24px" : "32px",
        }}
      >
        {title}
      </Title>
      <Description style={{ margin: "0 auto", textAlign: "left" }}>
        {description}
      </Description>
      {children}
    </TitleDescriptionContainer>
  );
}

export default TitleDescription;
