import React, { ReactElement } from "react";
import { useDispatch } from "react-redux";
import { MultiChoicePage } from "../../src/components/MultiChoicePage";
import { SIGNUP_PROGRESS_STEP } from "../../src/helpers/constants";
import { usePageLayout } from "../../src/hooks/layout/usePageLayout";
import { LayoutState } from "../../src/redux/slices/layoutSlice.types";
import { setReligiousPrefence } from "../../src/redux/slices/signupFormSlice";

const pageLayout: LayoutState = {
  primaryButtonState: {
    show: true,
    text: "Next",
    onClickRoute: "/signup/politics",
  },
  progressBarState: {
    show: true,
    progress: SIGNUP_PROGRESS_STEP * 2,
  },
};

export function ReligionPage(): ReactElement {
  usePageLayout(pageLayout);

  const dispatch = useDispatch();

  return (
    <MultiChoicePage
      title="My religion is"
      options={[
        "None",
        "Christianity",
        "Islam",
        "Hinduism",
        "Buddhism",
        "Judaism",
        "Other",
      ]}
      onChange={(val) => {
        dispatch(setReligiousPrefence(val));
      }}
    />
  );
}

export default ReligionPage;
