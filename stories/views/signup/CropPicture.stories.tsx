import React, { ReactElement } from "react";
import { CropPicturePage } from "../../../pages/signup/crop_picture";
import { LayoutStory } from "../../Layout.story";

export const Main = (): ReactElement => {
  return (
    <LayoutStory>
      <CropPicturePage />
    </LayoutStory>
  );
};

export default {
  title: "Pages/Signup/CropPicture",
  component: Main,
};
