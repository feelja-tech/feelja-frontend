import React, { ReactElement } from "react";
import { PoliticsPage } from "../../../pages/signup/politics";
import { LayoutStory } from "../../Layout.story";

export const Main = (): ReactElement => (
  <LayoutStory>
    <PoliticsPage />
  </LayoutStory>
);

export default {
  title: "Pages/Signup/Politics",
  component: Main,
};
