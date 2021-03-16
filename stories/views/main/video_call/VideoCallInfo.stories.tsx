import React, { ReactElement } from "react";
import { VideoCallInfoPage } from "../../../../pages/main/video_call/video_call_info";
import { LayoutStory } from "../../../Layout.story";

export const Main = (): ReactElement => (
  <LayoutStory>
    <VideoCallInfoPage />
  </LayoutStory>
);

export default {
  title: "Pages/Main/VideoCall/VideoCallInfo",
  component: Main,
};
