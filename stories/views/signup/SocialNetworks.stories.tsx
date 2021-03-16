import React, { ReactElement } from "react";
import { SocialNetworksPage } from "../../../pages/signup/social_networks";
import { LayoutStory } from "../../Layout.story";

export const Main = (): ReactElement => {
  return (
    <LayoutStory>
      <SocialNetworksPage />
    </LayoutStory>
  );
};

export default {
  title: "Pages/Signup/SocialNetworks",
  component: Main,
};
