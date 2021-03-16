import React, { ReactElement } from "react";
import { PoseCameraExplainationPage } from "../../../pages/signup/pose_camera_explaination";
import { LayoutStory } from "../../Layout.story";

export const Main = (): ReactElement => {
  return (
    <LayoutStory>
      <PoseCameraExplainationPage />
    </LayoutStory>
  );
};

export default {
  title: "Pages/Signup/PoseCameraExplaination",
  component: Main,
};
