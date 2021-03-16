import React, { ReactElement, useState } from "react";
import { useDispatch } from "react-redux";
import { ScrollingInput } from "../../src/components/ScrollingInput";
import { Title } from "../../src/components/Typography";
import { SIGNUP_PROGRESS_STEP } from "../../src/helpers/constants";
import { usePageLayout } from "../../src/hooks/layout/usePageLayout";
import { useTimeoutAction } from "../../src/hooks/layout/useTimeoutAction";
import { LayoutState } from "../../src/redux/slices/layoutSlice.types";
import { setAgeState } from "../../src/redux/slices/signupFormSlice";

const maxAge = 100;
const minAge = 18;
const userAges = Array.from(new Array(maxAge - minAge), (x, i) =>
  (i + minAge).toString()
);

const pageLayout: LayoutState = {
  primaryButtonState: {
    text: "Next",
    show: true,
    onClickRoute: "/signup/religion",
  },
  progressBarState: {
    show: true,
    progress: SIGNUP_PROGRESS_STEP * 2,
  },
};

export function AgePage(): ReactElement {
  usePageLayout(pageLayout);
  const [value, setValue] = useState<number>(170);
  const dispatch = useDispatch();

  useTimeoutAction((val) => {
    dispatch(setAgeState(val));
  }, value);

  return (
    <>
      <Title>My age is</Title>
      <ScrollingInput
        values={userAges}
        scrollToIdx={7}
        onChange={(val) => {
          setValue(parseInt(val, 10));
        }}
      />
    </>
  );
}
export default AgePage;
