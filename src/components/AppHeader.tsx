import { faHome, faUser } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import React, { ReactElement, useContext, useState } from "react";
import styled, { ThemeContext } from "styled-components";
import { colors } from "../helpers/themes";

interface AppHeaderProps {
  onToggle: (option: number) => void;
}

const brightnessVariants = {
  selected: {
    filter: "brightness(100%) opacity(100%)",
  },
  deselected: {
    filter: "brightness(10%) opacity(20%)",
  },
};

const AnimatedBrightnessContainer = styled(motion.div)`
  z-index: 1;
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const AppHeaderContainer = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  align-items: center;
  box-shadow: 0 2px 2px 0 lightgray;
  background: white;
`;

export function AppHeader(props: AppHeaderProps): ReactElement {
  const { onToggle } = props;

  const [selected, setSelected] = useState(0);

  const theme = useContext(ThemeContext);

  return (
    <AppHeaderContainer
      transition={{ duration: 0.6 }}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={() => {
        if (selected !== 1) {
          setSelected(1);
          onToggle(1);
        }

        if (selected !== 0) {
          setSelected(0);
          onToggle(0);
        }
      }}
    >
      <AnimatedBrightnessContainer
        animate={selected === 0 ? "selected" : "deselected"}
        variants={brightnessVariants}
        transition={{ duration: 0.3 }}
      >
        <FontAwesomeIcon icon={faHome} color={colors.primary} />
      </AnimatedBrightnessContainer>
      <AnimatedBrightnessContainer
        animate={selected === 1 ? "selected" : "deselected"}
        variants={brightnessVariants}
        transition={{ duration: 0.3 }}
      >
        <FontAwesomeIcon icon={faUser} color={colors.primary} />
      </AnimatedBrightnessContainer>
    </AppHeaderContainer>
  );
}

export default AppHeader;
