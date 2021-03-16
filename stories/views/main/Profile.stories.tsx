import React, { ReactElement } from "react";
import { ProfilePage } from "../../../pages/main/profile";
import { LayoutStory } from "../../Layout.story";

export const Main = (): ReactElement => (
  <LayoutStory>
    <ProfilePage />
  </LayoutStory>
);

export default {
  title: "Pages/Main/Profile",
  component: Main,
};
