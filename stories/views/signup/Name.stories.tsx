import React, { ReactElement } from "react";
import { NamePage } from "../../../pages/signup/name";
import { LayoutStory } from "../../Layout.story";

export const Main = (): ReactElement => (
  <LayoutStory>
    <NamePage />
  </LayoutStory>
);

export default {
  title: "Pages/Signup/Name",
  component: Main,
};
