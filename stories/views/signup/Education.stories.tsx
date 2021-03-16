import React, { ReactElement } from "react";
import { EducationPage } from "../../../pages/signup/education";
import { LayoutStory } from "../../Layout.story";

export const Main = (): ReactElement => (
  <LayoutStory>
    <EducationPage />
  </LayoutStory>
);

export default {
  title: "Pages/Signup/Education",
  component: Main,
};
