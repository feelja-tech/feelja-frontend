import React, { ReactElement } from "react";
import { AwaitingResponsePage } from "../../../pages/main/awaiting_response";
import { LayoutStory } from "../../Layout.story";

export const Main = (): ReactElement => (
  <LayoutStory>
    <AwaitingResponsePage />
  </LayoutStory>
);

export default {
  title: "Pages/Main/AwaitingResponse",
  component: Main,
};
