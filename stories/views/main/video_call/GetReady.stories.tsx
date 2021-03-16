import React, { ReactElement } from "react";
import { GetReadyPage } from "../../../../pages/main/video_call/get_ready";
import { LayoutStory } from "../../../Layout.story";

export const Main = (): ReactElement => (
  <LayoutStory>
    <GetReadyPage />
  </LayoutStory>
);

export default {
  title: "Pages/Main/VideoCall/GetReady",
  component: Main,
};
