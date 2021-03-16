import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { AudioVisualizer } from "../../src/components/AudioVisualizer";
import { MainContentContainer } from "../../src/components/Containers";
import { MainButton } from "../../src/components/MainButton";
import { useUpdateProfileMutation } from "../../src/graphql/generated";
import { colors } from "../../src/helpers/themes";
import { usePageLayout } from "../../src/hooks/layout/usePageLayout";
import { RootState } from "../../src/redux/rootReducer";
import { LayoutState } from "../../src/redux/slices/layoutSlice.types";

const pageLayout: LayoutState = {
  disabled: true,
};

const FadingTrack = styled(motion.p)`
  width: 80%;
  font-size: 24px;
  color: ${colors.black};
  text-align: center;
  position: absolute;
  top: 45%;
  transform: translateY(-50%);
`;

export function InteractiveAudioPage(): ReactElement {
  usePageLayout(pageLayout);

  const [skippable, setSkippable] = useState(false);

  const [cue, setCue] = useState<string>();

  const router = useRouter();

  useEffect(() => {
    const introPlayed = localStorage.getItem("introPlayed");

    if (introPlayed === "true") {
      router.push("/main/initial");
    }
  }, []);

  const signupForm = useSelector((state: RootState) => state.signupForm);

  const [updateProfile] = useUpdateProfileMutation();

  useEffect(() => {
    if (signupForm) {
      updateProfile({
        variables: {
          ...signupForm,
          location: signupForm.location
            ? JSON.stringify(signupForm.location)
            : null,
        },
      });
    }
  }, [signupForm]);

  return (
    <MainContentContainer style={{ height: "100%" }}>
      <AudioVisualizer
        src={process.env.NEXT_PUBLIC_STATIC_MEDIA_BASE_URL + "/audio/main.m4a"}
        track={
          process.env.NEXT_PUBLIC_STATIC_MEDIA_BASE_URL + "/audio/main.en.vtt"
        }
        onEnd={() => {
          setSkippable(true);
        }}
        onCueChange={setCue}
        onStart={() => {
          localStorage.setItem("introPlayed", "true");
        }}
      >
        {skippable ? (
          <MainButton
            text="Begin"
            onClick={() => {
              router.push("/main/initial");
            }}
            style={{
              width: "70%",
            }}
          />
        ) : (
          <AnimatePresence>
            <FadingTrack
              animate={{ opacity: 1, zIndex: 1 }}
              initial={{ opacity: 0, zIndex: 0 }}
              exit={{ opacity: 0, zIndex: 0 }}
              transition={{ opacity: { duration: 0.3 } }}
              key={cue}
            >
              {cue}
            </FadingTrack>
          </AnimatePresence>
        )}
      </AudioVisualizer>
    </MainContentContainer>
  );
}

export default InteractiveAudioPage;
