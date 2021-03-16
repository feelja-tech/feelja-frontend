import React, { ReactElement } from "react";
import { HeightPage } from "../../../pages/signup/height";
import { LayoutStory } from "../../Layout.story";

export const Main = (): ReactElement => (
  <LayoutStory>
    <HeightPage />
  </LayoutStory>
);

export default {
  title: "Pages/Signup/Height",
  component: Main,
};
