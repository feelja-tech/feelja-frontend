import { IconFingerprint } from "@tabler/icons";
import React, { ReactElement, useState } from "react";
import { useDispatch } from "react-redux";
import BigIcon from "../../src/components/BigIcon";
import { ScrollingInput } from "../../src/components/ScrollingInput";
import { Title } from "../../src/components/Typography";
import { SIGNUP_PROGRESS_STEP } from "../../src/helpers/constants";
import { usePageLayout } from "../../src/hooks/layout/usePageLayout";
import { useTimeoutAction } from "../../src/hooks/layout/useTimeoutAction";
import { LayoutState } from "../../src/redux/slices/layoutSlice.types";
import { setHeightState } from "../../src/redux/slices/signupFormSlice";

const maxHeight = 210;
const minHeight = 140;
const userHeights = Array.from(new Array(maxHeight - minHeight), (x, i) =>
  (i + minHeight).toString()
);

const pageLayout: LayoutState = {
  primaryButtonState: {
    text: "Next",
    show: true,
    onClickRoute: "/signup/location",
  },
  progressBarState: {
    show: true,
    progress: SIGNUP_PROGRESS_STEP * 4,
  },
};

export function HeightPage(): ReactElement {
  usePageLayout(pageLayout);
  const [value, setValue] = useState<number>(170);
  const dispatch = useDispatch();

  useTimeoutAction((val) => {
    dispatch(setHeightState(val));
  }, value);

  return (
    <>
      <Title>My height is</Title>
      <ScrollingInput
        values={userHeights}
        scrollToIdx={Math.floor(userHeights.length / 2) - 10}
        onChange={(val) => {
          setValue(parseInt(val, 10));
        }}
        label="cm"
      />
    </>
  );
}
export default HeightPage;
