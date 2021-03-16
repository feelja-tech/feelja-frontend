import React, { ReactElement } from "react";
import { InitialPage } from "../../../pages/main/initial";
import { LayoutStory } from "../../Layout.story";

export const Main = (): ReactElement => (
  <LayoutStory>
    <InitialPage />
  </LayoutStory>
);

export default {
  title: "Pages/Main/Initial",
  component: Main,
};
