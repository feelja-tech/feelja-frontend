import React, { ReactElement } from "react";
import { MatchesOverviewPage } from "../../../../pages/main/match/matches_overview";
import { LayoutStory } from "../../../Layout.story";

export const Main = (): ReactElement => (
  <LayoutStory>
    <MatchesOverviewPage />
  </LayoutStory>
);

export default {
  title: "Pages/Main/Match/MatchesOverview",
  component: Main,
};
