import React, { ReactElement } from "react";
import { invertedTheme } from "../src/helpers/themes";
import { LayoutState } from "../src/redux/slices/layoutSlice.types";
import { MainContentContainer } from "../src/components/Containers";
import SvgLoading from "../src/components/svg/SvgLoading";
import { usePageLayout } from "../src/hooks/layout/usePageLayout";

const pageLayout: LayoutState = {
  themeState: invertedTheme,
};

export function LoadingPage(): ReactElement {
  usePageLayout(pageLayout);

  return (
    <MainContentContainer>
      <SvgLoading style={{ transform: "scale(2)" }} />
    </MainContentContainer>
  );
}

export default LoadingPage;
