import React, { ReactElement } from "react";
import { LayoutStory } from "../Layout.story";
import { LoadingPage } from "../../pages/loading";

export const Main = (): ReactElement => (
  <LayoutStory>
    <LoadingPage />
  </LayoutStory>
);

export default {
  title: "Pages/Loading",
  component: Main,
};
