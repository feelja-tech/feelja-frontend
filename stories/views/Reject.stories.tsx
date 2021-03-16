import React, { ReactElement } from "react";
import { RejectPage } from "../../pages/main/reject";
import { LayoutStory } from "../Layout.story";

export const Main = (): ReactElement => (
  <LayoutStory>
    <RejectPage />
  </LayoutStory>
);

export default {
  title: "Pages/Main/Reject",
  component: Main,
};
