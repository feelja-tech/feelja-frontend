import React, { PropsWithChildren, ReactElement } from "react";
import styled, { keyframes } from "styled-components";
import SvgLogo from "./svg/Logo";

const pulsatingAnimationRing = keyframes`
    0% {transform: scale(0.1); opacity: 0.0;}
    50% {opacity: 1.0;}
    100% {transform: scale(0.65); opacity: 0.0;}
`;

const pulsatingAnimationCircle = keyframes`
    0% {transform: scale(0.3); }
    50% {transform: scale(0.5)}
    100% {transform: scale(0.3); }
`;

const PulsatingDotContainer = styled.div<{ angled?: boolean }>`
  ${(props) =>
    props.angled &&
    "transform-style: preserve-3d; transform: rotateX(-61deg);"};

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Circle = styled.div<{ animated?: boolean }>`
  background-color: ${(props) => props.theme.primary};
  border-radius: 100%;
  position: relative;
  animation: ${(props) => (props.animated ? pulsatingAnimationCircle : "none")}
    3s ease-out;
  animation-iteration-count: infinite;
  box-shadow: 0 0 10px ${(props) => props.theme.primary};
  width: 100%;
`;

const Ring = styled.svg<{ delay: number; animated?: boolean }>`
  border: 3px solid ${(props) => props.theme.primary};
  border-radius: 100%;
  position: absolute;
  animation: ${(props) => (props.animated ? pulsatingAnimationRing : "none")} 3s
    ease-out;
  animation-delay: ${(props) => props.delay}s;
  animation-iteration-count: infinite;
  opacity: 0;
  width: 100%;
`;

interface PulsatingDotProps {
  scale?: number;
  animated?: boolean;
}

export function PulsatingDot(
  props: PropsWithChildren<PulsatingDotProps>
): ReactElement {
  const { children, scale = 0, animated = true } = props;

  return (
    <PulsatingDotContainer
      style={{
        transform: "scale(1)",
        transition: "transform 600ms",
      }}
    >
      <Ring delay={0} viewBox="0 0 1 1" animated={animated} />
      <Ring delay={1} viewBox="0 0 1 1" animated={animated} />
      <Circle animated={animated}>
        {children || (
          <SvgLogo fill="white" style={{ transform: `scale(0.5)` }} />
        )}
      </Circle>
    </PulsatingDotContainer>
  );
}

export default PulsatingDot;
