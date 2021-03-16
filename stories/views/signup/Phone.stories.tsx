import React, { ReactElement } from "react";
import { PhonePage } from "../../../pages/signup/phone";
import { LayoutStory } from "../../Layout.story";

export const Main = (): ReactElement => (
  <LayoutStory>
    <PhonePage />
  </LayoutStory>
);

export default {
  title: "Pages/Signup/Phone",
  component: Main,
};
