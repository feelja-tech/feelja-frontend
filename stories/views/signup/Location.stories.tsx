import React, { ReactElement } from "react";
import { LocationPage } from "../../../pages/signup/location";
import { LayoutStory } from "../../Layout.story";

export const Main = (): ReactElement => (
  <LayoutStory>
    <LocationPage />
  </LayoutStory>
);

export default {
  title: "Pages/Signup/Location",
  component: Main,
};
