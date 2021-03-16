import React, { ReactElement } from "react";
import { LinkedinPage } from "../../../pages/signup/linkedin";
import { LayoutStory } from "../../Layout.story";

export const Main = (): ReactElement => (
  <LayoutStory>
    <LinkedinPage />
  </LayoutStory>
);

export default {
  title: "Pages/Signup/Linkedin",
  component: Main,
};
