import React, { ReactElement } from "react";
import { InstagramPage } from "../../../pages/signup/instagram";
import { LayoutStory } from "../../Layout.story";

export const Main = (): ReactElement => (
  <LayoutStory>
    <InstagramPage />
  </LayoutStory>
);

export default {
  title: "Pages/Signup/Instagram",
  component: Main,
};
