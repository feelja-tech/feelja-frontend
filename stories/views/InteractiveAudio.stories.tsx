import React, { ReactElement } from "react";
import { InteractiveAudioPage } from "../../pages/signup/interactive_audio";
import { LayoutStory } from "../Layout.story";

export const Main = (): ReactElement => (
  <LayoutStory>
    <InteractiveAudioPage />
  </LayoutStory>
);

export default {
  title: "Pages/InteractiveAudio",
  component: Main,
};
