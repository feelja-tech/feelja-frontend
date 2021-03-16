import { motion } from "framer-motion";
import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import styled from "styled-components";

export const InheritStyleMotion = styled(motion.div)`
  display: inherit;
  flex-direction: inherit;
  align-items: inherit;
  justify-content: inherit;
  height: 100%;
  width: inherit;
`;

export function withGuidanceTransition(
  children: ReactNode,
  key: string
): ReactElement {
  const [goUp, setGoUp] = useState({ [key]: false });

  useEffect(() => {
    setTimeout(() => {
      setGoUp({ [key]: true });
    }, 2000);
  }, [key]);

  return goUp[key] ? (
    <InheritStyleMotion
      initial={{
        opacity: 1,
        y: 0,
        x: 0,
        zIndex: 1,
      }}
      animate={{
        y: "-40%",
        x: 0,
        zIndex: 1,
      }}
      exit={{
        x: 0,
        opacity: 0,
      }}
      transition={{
        y: { type: "spring", stiffness: 300, damping: 30 },
      }}
      key={key}
    >
      {children}
    </InheritStyleMotion>
  ) : (
    <InheritStyleMotion
      initial={{
        x: "100vw",
      }}
      animate={{
        x: 0,
        zIndex: 1,
      }}
      exit={{
        opacity: 1,
        x: 0,
        zIndex: 1,
      }}
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
      }}
      key={key}
    >
      {children}
    </InheritStyleMotion>
  );
}

export function withSlideInTransition(
  children: ReactNode,
  key: string
): ReactElement {
  return (
    <InheritStyleMotion
      initial={{
        x: "100vw",
      }}
      animate={{
        x: 0,
      }}
      exit={{
        x: "-100vw",
      }}
      transition={{
        x: {
          type: "spring",
          stiffness: 300,
          damping: 30,
        },
      }}
      key={key}
    >
      {children}
    </InheritStyleMotion>
  );
}

function withSwitchTransition(
  children: ReactNode,
  invert: boolean,
  key: string
): ReactElement {
  return (
    <InheritStyleMotion
      initial={{
        x: invert ? "100vw" : "-100vw",
      }}
      animate={{
        x: 0,
      }}
      exit={{
        x: invert ? "-100vw" : "100vw",
      }}
      transition={{
        x: { type: "spring", duration: 0.3 },
      }}
      key={key}
    >
      {children}
    </InheritStyleMotion>
  );
}

export function withSwitchLeftTransition(
  children: ReactNode,
  key: string
): ReactElement {
  return withSwitchTransition(children, false, key);
}

export function withSwitchRightTransition(
  children: ReactNode,
  key: string
): ReactElement {
  return withSwitchTransition(children, true, key);
}

export function withFadeTransition(
  children: ReactNode,
  key: string
): ReactElement {
  return (
    <InheritStyleMotion
      animate={{ opacity: 1, position: "absolute" }}
      initial={{ opacity: 0, position: "absolute" }}
      exit={{ opacity: 0, position: "absolute" }}
      transition={{ opacity: { duration: 0.3 } }}
      key={key}
    >
      {children}
    </InheritStyleMotion>
  );
}

export default withSlideInTransition;
