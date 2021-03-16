import React, { ReactElement } from "react";
import { TooBadPage } from "../../pages/main/too_bad";
import { LayoutStory } from "../Layout.story";

export const Main = (): ReactElement => (
  <LayoutStory>
    <TooBadPage />
  </LayoutStory>
);

export default {
  title: "Pages/Main/TooBad",
  component: Main,
};
