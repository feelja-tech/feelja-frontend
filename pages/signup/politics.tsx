import React, { ReactElement, useEffect } from "react";
import { useDispatch } from "react-redux";
import { MultiChoicePage } from "../../src/components/MultiChoicePage";
import { SIGNUP_PROGRESS_STEP } from "../../src/helpers/constants";
import { usePageLayout } from "../../src/hooks/layout/usePageLayout";
import { LayoutState } from "../../src/redux/slices/layoutSlice.types";
import { setPoliticPreferencesState } from "../../src/redux/slices/signupFormSlice";

// const PoliticalCompassSelector = dynamic(
//   () => import("../../src/components/PoliticalCompassSelector"),
//   { ssr: false }
// );

const pageLayout: LayoutState = {
  primaryButtonState: {
    show: true,
    text: "Next",
    onClickRoute: "/signup/height",
  },
  progressBarState: {
    show: true,
    progress: SIGNUP_PROGRESS_STEP * 3,
  },
};

export function PoliticsPage(): ReactElement {
  usePageLayout(pageLayout);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPoliticPreferencesState(["Unaligned"]));
  }, []);

  return (
    <MultiChoicePage
      title="I'm politically"
      options={[
        "Unaligned",
        "Libertarian Left",
        "Libertarian Right",
        "Authoritarian Left",
        "Authoritarian Right",
      ]}
      onChange={(val) => {
        dispatch(setPoliticPreferencesState([val]));
      }}
    />
  );
}

export default PoliticsPage;
