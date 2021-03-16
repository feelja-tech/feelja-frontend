import React, { ReactElement } from "react";
import { MatchSelectorPage } from "../../../../pages/main/match/match_selector";
import { LayoutStory } from "../../../Layout.story";

export const Main = (): ReactElement => (
  <LayoutStory>
    <MatchSelectorPage />
  </LayoutStory>
);

export default {
  title: "Pages/Main/Match/MatchSelector",
  component: Main,
};
