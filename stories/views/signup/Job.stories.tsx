import React, { ReactElement } from "react";
import { JobPage } from "../../../pages/signup/job";
import { LayoutStory } from "../../Layout.story";

export const Main = (): ReactElement => (
  <LayoutStory>
    <JobPage />
  </LayoutStory>
);

export default {
  title: "Pages/Signup/Job",
  component: Main,
};
