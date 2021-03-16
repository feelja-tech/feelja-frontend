import React, { ReactElement } from "react";
import { MainContentContainer } from "../../../src/components/Containers";
import { PulsatingDot } from "../../../src/components/PulsatingDot";
import { TitleDescription } from "../../../src/components/TitleDescription";
import { usePageLayout } from "../../../src/hooks/layout/usePageLayout";
import { LayoutState } from "../../../src/redux/slices/layoutSlice.types";

const pageLayout: LayoutState = {
  headerButtonState: {
    show: true,
  },
  secondaryButtonState: {
    text: "About",
    show: true,
  },
};

export function PreparingDatePage(): ReactElement {
  usePageLayout(pageLayout);

  return (
    <>
      <TitleDescription
        title="Planning your meeting"
        description="We'll send you a notification once it's ready"
      />
      <MainContentContainer>
        <PulsatingDot />
      </MainContentContainer>
    </>
  );
}

export default PreparingDatePage;
