import React, { ReactElement } from "react";
import { ReviewCallPage } from "../../../../pages/main/video_call/review_call";
import { LayoutStory } from "../../../Layout.story";

export const Main = (): ReactElement => (
  <LayoutStory>
    <ReviewCallPage />
  </LayoutStory>
);

export default {
  title: "Pages/Main/VideoCall/ReviewCall",
  component: Main,
};
