import React, { ReactElement } from "react";
import { WelcomePage } from "../../../pages/signup/welcome";
import { LayoutStory } from "../../Layout.story";

export const Main = (): ReactElement => {
  return (
    <LayoutStory>
      <WelcomePage />
    </LayoutStory>
  );
};

export default {
  title: "Pages/Signup/Welcome",
  component: Main,
};
