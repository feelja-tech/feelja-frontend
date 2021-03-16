import React, { ReactElement } from "react";
import { TimePickerPage } from "../../../pages/main/time_picker";
import { LayoutStory } from "../../Layout.story";

export const Main = (): ReactElement => (
  <LayoutStory>
    <TimePickerPage />
  </LayoutStory>
);

export default {
  title: "Pages/Main/TimePicker",
  component: Main,
};
