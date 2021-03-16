import React, { ReactElement } from "react";
import { PreparingDatePage } from "../../../../pages/main/meeting/preparing_date";
import { LayoutStory } from "../../../Layout.story";

export const Main = (): ReactElement => (
  <LayoutStory>
    <PreparingDatePage />
  </LayoutStory>
);

export default {
  title: "Pages/Main/Meeting/PreparingDate",
  component: Main,
};
