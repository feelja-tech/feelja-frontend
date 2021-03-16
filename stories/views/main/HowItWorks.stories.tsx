import React, { ReactElement } from "react";
import { HowItWorksPage } from "../../../pages/main/how_it_works/[page]";
import { LayoutStory } from "../../Layout.story";

export const Main = (): ReactElement => (
  <LayoutStory>
    <HowItWorksPage />
  </LayoutStory>
);

export default {
  title: "Pages/Main/HowItWorksPage",
  component: Main,
};
