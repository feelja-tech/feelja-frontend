import React, { ReactElement } from "react";
import { ErrorPage } from "../../pages/error";
import { LayoutStory } from "../Layout.story";

export const Main = (): ReactElement => (
  <LayoutStory>
    <ErrorPage />
  </LayoutStory>
);

export default {
  title: "Pages/Error",
  component: Main,
};
