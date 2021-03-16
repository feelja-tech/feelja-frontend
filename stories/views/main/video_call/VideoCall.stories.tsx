import React, { ReactElement } from "react";
import { VideoCallPage } from "../../../../pages/main/video_call/video_call";
import { LayoutStory } from "../../../Layout.story";

export const Main = (): ReactElement => (
  <LayoutStory>
    <VideoCallPage />
  </LayoutStory>
);

export default {
  title: "Pages/Main/VideoCall/VideoCall",
  component: Main,
};
