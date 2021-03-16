import React, { ReactElement } from "react";
import { PhoneConfirmationPage } from "../../../pages/signup/phone_confirmation";
import { LayoutStory } from "../../Layout.story";

export const Main = (): ReactElement => (
  <LayoutStory>
    <PhoneConfirmationPage />
  </LayoutStory>
);

export default {
  title: "Pages/Signup/PhoneConfirmation",
  component: Main,
};
