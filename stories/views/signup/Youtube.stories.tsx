import React, { ReactElement } from "react";
import { YoutubePage } from "../../../pages/signup/youtube";
import { LayoutStory } from "../../Layout.story";

export const Main = (): ReactElement => (
  <LayoutStory>
    <YoutubePage />
  </LayoutStory>
);

export default {
  title: "Pages/Signup/Youtube",
  component: Main,
};
