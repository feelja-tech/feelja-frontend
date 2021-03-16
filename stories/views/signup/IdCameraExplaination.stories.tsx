import React, { ReactElement } from "react";
import { IdCameraExplainationPage } from "../../../pages/signup/id_camera_explaination";
import { LayoutStory } from "../../Layout.story";

export const Main = (): ReactElement => (
  <LayoutStory>
    <IdCameraExplainationPage />
  </LayoutStory>
);

export default {
  title: "Pages/Signup/IdCameraExplaination",
  component: Main,
};
