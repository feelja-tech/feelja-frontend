import { IconBrandLinkedin, IconLockAccess } from "@tabler/icons";
import React, { ReactElement, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BigIcon } from "../../src/components/BigIcon";
import { SocialButton } from "../../src/components/SocialButton";
import { TitleDescription } from "../../src/components/TitleDescription";
import { SIGNUP_PROGRESS_STEP } from "../../src/helpers/constants";
import { usePageLayout } from "../../src/hooks/layout/usePageLayout";
import { useSocialButtonUrl } from "../../src/hooks/useSocialButtonUrl";
import {
  setPrimaryButtonState,
  setSecondaryButtonState,
} from "../../src/redux/slices/layoutSlice";
import { LayoutState } from "../../src/redux/slices/layoutSlice.types";

const pageLayout: LayoutState = {
  progressBarState: {
    show: true,
    progress: SIGNUP_PROGRESS_STEP * 12,
  },
};

export function LinkedinPage(): ReactElement {
  usePageLayout(pageLayout);

  const { url, nextStep } = useSocialButtonUrl("linkedin");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setSecondaryButtonState({
        show: true,
        text: "Maybe later",
        onClickRoute: nextStep,
      })
    );

    dispatch(
      setPrimaryButtonState({
        show: true,
        onClickRoute: url,
        text: "Connect",
        color: "#0a66c2",
      })
    );
  }, [url, nextStep]);

  return (
    <>
      <BigIcon as={IconBrandLinkedin} />
      <TitleDescription
        title={
          <>
            <IconLockAccess style={{ marginRight: "8px" }} />
            Employment
          </>
        }
        description="Connect your Linkedin account to match with people that are as busy as you are"
      />
    </>
  );
}

export default LinkedinPage;
