import { motion } from "framer-motion";
import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import Logo from "./svg/Logo";
import User3 from "./svg/User3";

const ToggleContainer = styled.div`
  display: flex;
  width: min-content;
  background-color: grey;
  border-radius: 30px;
  padding: 5px 3px;
  align-items: center;
  height: 40px;
`;

const ToggleButton = styled(motion.span)`
  width: 40px;
  height: 40px;
  background-color: white;
  position: absolute;
  border-radius: 30px;
  padding: 3px 10px;
  box-shadow: 0 0 5px gray;
`;

const brightnessVariants = {
  selected: {
    filter: "brightness(100%) opacity(100%)",
  },
  deselected: {
    filter: "brightness(10%) opacity(20%)",
  },
};

export const AnimatedBrightnessContainer = styled(motion.div)`
  z-index: 1;
  margin: 2px 10px;
  height: 40px;
  width: 40px;
`;

const UserComponent = styled(User3)`
  float: right;
  color: ${(props) => props.theme.primary};
`;

interface ToggleProps {
  onToggle: (option: number) => void;
}

export function Toggle(props: ToggleProps): ReactElement {
  const { onToggle } = props;
  const [selected, setSelected] = useState(0);

  return (
    <ToggleContainer>
      <ToggleButton animate={selected === 1 ? { x: "100%" } : { x: "0%" }} />
      <AnimatedBrightnessContainer
        animate={selected === 0 ? "selected" : "deselected"}
        variants={brightnessVariants}
        transition={{ duration: 0.3 }}
      >
        <Logo
          style={{ float: "left" }}
          onClick={() => {
            onToggle(0);
            setSelected(0);
          }}
        />
      </AnimatedBrightnessContainer>
      <AnimatedBrightnessContainer
        animate={selected === 1 ? "selected" : "deselected"}
        variants={brightnessVariants}
        transition={{ duration: 0.3 }}
      >
        <UserComponent
          onClick={() => {
            onToggle(1);
            setSelected(1);
          }}
        />
      </AnimatedBrightnessContainer>
    </ToggleContainer>
  );
}

export default Toggle;
