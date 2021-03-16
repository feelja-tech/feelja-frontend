import React, { ReactElement } from "react";
import { PoseCameraPage } from "../../../pages/signup/pose_camera";
import { LayoutStory } from "../../Layout.story";

export const Main = (): ReactElement => {
  return (
    <LayoutStory>
      <PoseCameraPage />
    </LayoutStory>
  );
};

export default {
  title: "Pages/Signup/PoseCamera",
  component: Main,
};
