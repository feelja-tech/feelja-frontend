import React, { ReactElement } from "react";
import { DateMapPage } from "../../../../pages/main/meeting/date_map";
import { LayoutStory } from "../../../Layout.story";

export const Main = (): ReactElement => (
  <LayoutStory>
    <DateMapPage />
  </LayoutStory>
);

export default {
  title: "Pages/Main/Meeting/DateMap",
  component: Main,
};
