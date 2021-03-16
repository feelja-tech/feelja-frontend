import React, { ReactElement } from "react";
import { SpotifyPage } from "../../../pages/signup/spotify";
import { LayoutStory } from "../../Layout.story";

export const Main = (): ReactElement => {
  return (
    <LayoutStory>
      <SpotifyPage />
    </LayoutStory>
  );
};

export default {
  title: "Pages/Signup/Spotify",
  component: Main,
};
