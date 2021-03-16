import React, { ReactElement } from "react";
import { ConsentPage } from "../../../pages/signup/consent";
import { LayoutStory } from "../../Layout.story";

export const Main = (): ReactElement => {
  return (
    <LayoutStory>
      <ConsentPage />
    </LayoutStory>
  );
};

export default {
  title: "Pages/Signup/Consent",
  component: Main,
};
