import React, { ReactElement, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { TextInput } from "../../src/components/TextInput";
import { TitleDescription } from "../../src/components/TitleDescription";
import { SIGNUP_PROGRESS_STEP } from "../../src/helpers/constants";
import { useFaceApiPreload } from "../../src/hooks/useFaceApiPreload";
import { usePageLayout } from "../../src/hooks/layout/usePageLayout";
import { useTimeoutAction } from "../../src/hooks/layout/useTimeoutAction";
import { setPrimaryButtonState } from "../../src/redux/slices/layoutSlice";
import { LayoutState } from "../../src/redux/slices/layoutSlice.types";
import { setNameState } from "../../src/redux/slices/signupFormSlice";

const pageLayout: LayoutState = {
  progressBarState: {
    show: true,
    progress: SIGNUP_PROGRESS_STEP * 1,
  },
};

export function NamePage(): ReactElement {
  usePageLayout(pageLayout);
  const inputRef = useRef<HTMLInputElement>();

  const [value, setValue] = useState<string>();
  const dispatch = useDispatch();

  useTimeoutAction((val) => {
    dispatch(setNameState(val));
  }, value);

  useEffect(() => {
    if (value?.length > 0) {
      dispatch(
        setPrimaryButtonState({
          text: "Next",
          show: true,
          onClickRoute: "/signup/age",
        })
      );
    } else {
      dispatch(setPrimaryButtonState({ show: false }));
    }
  }, [value?.length]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  useFaceApiPreload();

  return (
    <>
      <TitleDescription
        title="What's your name?"
        description="You can also use a nickname or what Starbucks baristas write on your Latte"
      />
      <TextInput
        placeholder="Your first name"
        onChange={(event) => {
          setValue(event.target.value);
        }}
        ref={inputRef}
      />
    </>
  );
}

export default NamePage;
