import React, { ReactElement } from "react";
import { IntroductionPage } from "../../../pages/signup/introduction";
import { LayoutStory } from "../../Layout.story";

export const Main = (): ReactElement => (
  <LayoutStory>
    <IntroductionPage />
  </LayoutStory>
);

export default {
  title: "Pages/Signup/Introduction",
  component: Main,
};
