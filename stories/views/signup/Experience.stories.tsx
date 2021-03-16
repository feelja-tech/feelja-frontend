import React, { ReactElement } from "react";
import { ExperiencePage } from "../../../pages/signup/experience";
import { LayoutStory } from "../../Layout.story";

export const Main = (): ReactElement => (
  <LayoutStory>
    <ExperiencePage />
  </LayoutStory>
);

export default {
  title: "Pages/Signup/Experience",
  component: Main,
};
