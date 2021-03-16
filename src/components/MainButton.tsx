import { AnimatePresence, motion } from "framer-motion";
import React, { ComponentProps, PropsWithChildren, ReactElement } from "react";
import styled from "styled-components";
import { ButtonText } from "./Typography";

interface MainButtonComponentProps {
  secondary: boolean;
}

const MainButtonComponent = styled(motion.button)<MainButtonComponentProps>`
  max-height: 48px;
  min-height: 48px;
  border-radius: 24px;

  box-shadow: 0 3px 6px lightgray;

  width: 100%;

  text-decoration: none;
  cursor: pointer;

  background: ${(props) =>
    props.secondary ? props.theme.secondary : props.theme.primary};

  transform: translateZ(0);

  border: ${(props) =>
    props.secondary ? "none" : `1px solid ${props.theme.primary}`};

  &:focus {
    outline: none;
  }
`;

interface MainButtonPropsInner {
  secondary?: boolean | undefined;
  text?: string;
  animated?: boolean;
  nextRoute?: string;
  innerKey?: string;
}

export type MainButtonProps = PropsWithChildren<MainButtonPropsInner> &
  ComponentProps<"button">;

export function MainButton(props: MainButtonProps): ReactElement {
  const {
    secondary,
    children,
    onClick,
    text,
    style = {},
    animated = true,
    innerKey,
  } = props;

  return (
    <AnimatePresence exitBeforeEnter>
      <MainButtonComponent
        secondary={secondary}
        onClick={onClick}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ opacity: { duration: 0.5 } }}
        style={style}
        key={innerKey + animated}
      >
        <ButtonText secondary={secondary}>{children || text}</ButtonText>
      </MainButtonComponent>
    </AnimatePresence>
  );
}

export default MainButton;
