import React, { ReactElement } from "react";
import { SocialExplainationPage } from "../../../pages/signup/social_explaination";
import { LayoutStory } from "../../Layout.story";

export const Main = (): ReactElement => (
  <LayoutStory>
    <SocialExplainationPage />
  </LayoutStory>
);

export default {
  title: "Pages/Signup/SocialExplaination",
  component: Main,
};
