import { motion } from "framer-motion";
import React, { ReactElement, useContext } from "react";
import styled, { ThemeContext } from "styled-components";

interface ProgressBarProps {
  progress: number;
}

const ProgressBarContainer = styled(motion.div)`
  width: 100%;
  height: 3px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
`;

const ProgressBarBackground = styled.div`
  width: 70%;
  height: 100%;
  background-color: rgba(1, 1, 1, 0.1);
  border-radius: inherit;
`;

export function ProgressBar(props: ProgressBarProps): ReactElement {
  const { progress } = props;

  const theme = useContext(ThemeContext);

  return (
    <ProgressBarContainer
      transition={{ duration: 0.6 }}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <ProgressBarBackground>
        <motion.div
          initial={{
            width: "0%",
          }}
          animate={{
            width: `${progress}%`,
          }}
          transition={{
            ease: "linear",
            duration: 1,
          }}
          style={{
            height: "100%",
            borderRadius: "inherit",
            backgroundColor: theme.primary,
          }}
        />
      </ProgressBarBackground>
    </ProgressBarContainer>
  );
}

export default ProgressBar;
