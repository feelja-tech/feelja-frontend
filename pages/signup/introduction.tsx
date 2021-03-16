import { motion } from "framer-motion";
import React, { ReactElement, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled, { Keyframes, keyframes } from "styled-components";
import { setPrimaryButtonState } from "../../src/redux/slices/layoutSlice";
import { LayoutState } from "../../src/redux/slices/layoutSlice.types";
import { BaseContainer } from "../../src/components/Containers";
import { Description } from "../../src/components/Typography";
import { usePageLayout } from "../../src/hooks/layout/usePageLayout";

const slideInAnimation = keyframes`
  from{
    transform:translateX(-400px)
  }
  to{
    transform:translateX(0px)
  }
`;

const AnimatedContainer = styled(BaseContainer)<{
  animation?: Keyframes;
  delay?: number;
  duration?: number;
}>`
  animation: ${(props) => props.animation}
    ${(props) => props.duration || "0.6"}s ease-in-out both;
  animation-delay: ${(props) => props.delay || 0}s;
`;

const pageLayout: LayoutState = {};

export function IntroductionPage(): ReactElement {
  usePageLayout(pageLayout);

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(
        setPrimaryButtonState({
          text: "Let's go",
          show: true,
          onClickRoute: "/signup/phone",
        })
      );
    }, 3000);
  }, []);

  return (
    <motion.div
      animate={{
        x: 0,
        zIndex: 1,
        position: "relative",
      }}
      exit={{
        x: "-100vw",
        zIndex: 0,
        position: "absolute",
      }}
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
      }}
    >
      <AnimatedContainer animation={slideInAnimation}>
        <Description big style={{ margin: "32px" }}>
          No swiping.
        </Description>
      </AnimatedContainer>
      <AnimatedContainer delay={1} animation={slideInAnimation}>
        <Description big style={{ margin: "32px" }}>
          No chat.
        </Description>
      </AnimatedContainer>
      <AnimatedContainer delay={2} animation={slideInAnimation}>
        <Description big style={{ margin: "32px" }}>
          No BS.
        </Description>
      </AnimatedContainer>
    </motion.div>
  );
}

export default IntroductionPage;
