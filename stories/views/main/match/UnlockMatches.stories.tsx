import React, { ReactElement } from "react";
import { UnlockMatchesPage } from "../../../../pages/main/match/unlock_matches";
import { LayoutStory } from "../../../Layout.story";

export const Main = (): ReactElement => (
  <LayoutStory>
    <UnlockMatchesPage />
  </LayoutStory>
);

export default {
  title: "Pages/Main/Match/UnlockMatches",
  component: Main,
};
