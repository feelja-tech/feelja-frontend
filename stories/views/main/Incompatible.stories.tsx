import React, { ReactElement } from "react";
import { IncompatiblePage } from "../../../pages/incompatible";
import { LayoutStory } from "../../Layout.story";

export const Main = (): ReactElement => (
  <LayoutStory>
    <IncompatiblePage />
  </LayoutStory>
);

export default {
  title: "Pages/IncompatiblePage",
  component: Main,
};
