import React, { ReactElement } from "react";
import { DateInfoPage } from "../../../../pages/main/meeting/date_info";
import { LayoutStory } from "../../../Layout.story";

export const Main = (): ReactElement => (
  <LayoutStory>
    <DateInfoPage />
  </LayoutStory>
);

export default {
  title: "Pages/Main/Meeting/DateInfo",
  component: Main,
};
