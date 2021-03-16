import React, { ReactElement } from "react";
import styled, { keyframes } from "styled-components";

const BarsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const sound = keyframes`
    0% {
      opacity: .35;
      height: 3px; 
    }
    100% {
      opacity: 1;       
      height: 70px;        
    }
`;

const Bar = styled.div`
  background: ${(props) => props.theme.primary};
  bottom: 1px;
  height: 3px;
  width: 10px;
  margin: 0px 4px;
  border-radius: 5px;
  animation: ${sound} 0ms -600ms linear infinite alternate;

  &:nth-child(1) {
    left: 1px;
    animation-duration: 474ms;
  }
  &:nth-child(2) {
    left: 15px;
    animation-duration: 433ms;
  }
  &:nth-child(3) {
    left: 29px;
    animation-duration: 407ms;
  }
  &:nth-child(4) {
    left: 43px;
    animation-duration: 458ms;
  }
  &:nth-child(5) {
    left: 57px;
    animation-duration: 400ms;
  }
  &:nth-child(6) {
    left: 71px;
    animation-duration: 427ms;
  }
  &:nth-child(7) {
    left: 85px;
    animation-duration: 441ms;
  }
  &:nth-child(8) {
    left: 99px;
    animation-duration: 419ms;
  }
  &:nth-child(9) {
    left: 113px;
    animation-duration: 487ms;
  }
  &:nth-child(10) {
    left: 127px;
    animation-duration: 442ms;
  }
`;

export function AnimatedAudioSimple(): ReactElement {
  return (
    <BarsContainer>
      <Bar />
      <Bar />
      <Bar />
      <Bar />
      <Bar />
      <Bar />
      <Bar />
      <Bar />
      <Bar />
      <Bar />
    </BarsContainer>
  );
}
