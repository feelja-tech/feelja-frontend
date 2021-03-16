import React, { ReactElement } from "react";
import { MainContentContainer } from "../../src/components/Containers";
import { PulsatingDot } from "../../src/components/PulsatingDot";
import { TitleDescription } from "../../src/components/TitleDescription";
import { usePageLayout } from "../../src/hooks/layout/usePageLayout";
import { LayoutState } from "../../src/redux/slices/layoutSlice.types";

const pageLayout: LayoutState = {
  headerButtonState: {
    show: true,
  },
  secondaryButtonState: {
    text: "More information",
    show: true,
    onClickRoute: "/main/how_it_works/0",
  },
};

export function InitialPage(): ReactElement {
  usePageLayout(pageLayout);

  return (
    <>
      <TitleDescription
        title="Hang tight"
        description={
          <>
            Feelja is searching for your soulmates.
            <br />
            She’ll be in touch soon.
          </>
        }
      />
      <MainContentContainer>
        <PulsatingDot />
      </MainContentContainer>
    </>
  );
}

export default InitialPage;
