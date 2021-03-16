import React, { ReactElement } from "react";
import { IdCameraPage } from "../../../pages/signup/id_camera";
import { LayoutStory } from "../../Layout.story";

export const Main = (): ReactElement => (
  <LayoutStory>
    <IdCameraPage />
  </LayoutStory>
);

export default {
  title: "Pages/Signup/IdCamera",
  component: Main,
};
