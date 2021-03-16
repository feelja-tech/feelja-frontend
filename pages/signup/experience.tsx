import React, { ReactElement } from "react";
import { useDispatch } from "react-redux";
import { MultiChoicePage } from "../../src/components/MultiChoicePage";
import { SIGNUP_PROGRESS_STEP } from "../../src/helpers/constants";
import { usePageLayout } from "../../src/hooks/layout/usePageLayout";
import { LayoutState } from "../../src/redux/slices/layoutSlice.types";
// import { setDatingPreferencesState } from "../../src/redux/slices/signupFormSlice";

const pageLayout: LayoutState = {
  primaryButtonState: {
    show: true,
    text: "Next",
    onClickRoute: "/signup/religion",
  },
  progressBarState: {
    show: true,
    progress: SIGNUP_PROGRESS_STEP * 2,
  },
};

export function ExperiencePage(): ReactElement {
  usePageLayout(pageLayout);

  const dispatch = useDispatch();

  return (
    <MultiChoicePage
      title="I'm looking for"
      options={["Friendships", "Relationships", "Both"]}
      onChange={(val) => {
        // dispatch(
        //   setDatingPreferencesState(
        //     val === "both" ? ["friendships", "relationships"] : [val]
        //   )
        // );
      }}
    />
  );
}

export default ExperiencePage;
