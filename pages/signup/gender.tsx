import React, { ReactElement } from "react";
import { useDispatch } from "react-redux";
import { MultiChoicePage } from "../../src/components/MultiChoicePage";
import { SIGNUP_PROGRESS_STEP } from "../../src/helpers/constants";
import { usePageLayout } from "../../src/hooks/layout/usePageLayout";
import { LayoutState } from "../../src/redux/slices/layoutSlice.types";

const pageLayout: LayoutState = {
  primaryButtonState: {
    text: "Next",
    show: true,
    onClickRoute: "/signup/experience",
  },
  progressBarState: {
    show: true,
    progress: SIGNUP_PROGRESS_STEP * 1,
  },
};

export function GenderPage(): ReactElement {
  usePageLayout(pageLayout);

  const dispatch = useDispatch();

  return (
    <MultiChoicePage
      title="I wanna meet"
      options={["Men", "Women", "Both"]}
      onChange={(val) => {
        // dispatch(
        //   setGenderPreferencesState(val === "both" ? ["men", "women"] : [val])
        // );
      }}
    />
  );
}

export default GenderPage;
