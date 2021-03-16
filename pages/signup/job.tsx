import React, { ReactElement, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { TextInput } from "../../src/components/TextInput";
import { TitleDescription } from "../../src/components/TitleDescription";
import { SIGNUP_PROGRESS_STEP } from "../../src/helpers/constants";
import { usePageLayout } from "../../src/hooks/layout/usePageLayout";
import { useTimeoutAction } from "../../src/hooks/layout/useTimeoutAction";
import {
  setPrimaryButtonState,
  setSecondaryButtonState,
} from "../../src/redux/slices/layoutSlice";
import { LayoutState } from "../../src/redux/slices/layoutSlice.types";
import { setEmploymentState } from "../../src/redux/slices/signupFormSlice";

const pageLayout: LayoutState = {
  secondaryButtonState: {
    text: "I'm unemployed",
    show: true,
    onClickRoute: "/signup/location",
  },
  progressBarState: {
    show: true,
    progress: SIGNUP_PROGRESS_STEP * 6,
  },
};

export function JobPage(): ReactElement {
  usePageLayout(pageLayout);
  const inputRef = useRef<HTMLInputElement>();

  const [value, setValue] = useState<string>();
  const dispatch = useDispatch();

  useTimeoutAction((val) => {
    dispatch(setEmploymentState(val));
  }, value);

  useEffect(() => {
    if (value?.length > 0) {
      dispatch(
        setSecondaryButtonState({
          show: false,
        })
      );

      dispatch(
        setPrimaryButtonState({
          text: "Next",
          show: true,
          onClickRoute: "/signup/location",
        })
      );
    } else {
      dispatch(
        setPrimaryButtonState({
          show: false,
        })
      );

      dispatch(
        setSecondaryButtonState({
          text: "I'm a student",
          show: true,
          onClickRoute: "/signup/location",
        })
      );
    }
  }, [value?.length]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return (
    <>
      <TitleDescription
        title="Employment"
        description="Are you employed? What is your current job title?"
      />
      <TextInput
        placeholder="Your job title"
        onChange={(event) => {
          setValue(event.target.value);
        }}
        ref={inputRef}
      />
    </>
  );
}

export default JobPage;
