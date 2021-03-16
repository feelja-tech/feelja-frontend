import React, { ReactElement } from "react";
import { SelectPicturePage } from "../../../pages/signup/select_picture";
import { LayoutStory } from "../../Layout.story";

export const Main = (): ReactElement => {
  return (
    <LayoutStory>
      <SelectPicturePage />
    </LayoutStory>
  );
};

export default {
  title: "Pages/Signup/SelectPicture",
  component: Main,
};
