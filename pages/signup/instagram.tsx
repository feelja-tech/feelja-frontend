import { IconBrandInstagram } from "@tabler/icons";
import React, { ReactElement, useEffect } from "react";
import { useDispatch } from "react-redux";
import BigIcon from "../../src/components/BigIcon";
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
    progress: SIGNUP_PROGRESS_STEP * 10,
  },
};

export function InstagramPage(): ReactElement {
  usePageLayout(pageLayout);

  const { url, nextStep } = useSocialButtonUrl("instagram");

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
        color: "#ff546b",
      })
    );
  }, [url, nextStep]);

  return (
    <>
      <BigIcon as={IconBrandInstagram} />
      <TitleDescription
        title="Personality check"
        description="Connect your Instagram account to let Feelja get a better picture of your personality"
      />
    </>
  );
}

export default InstagramPage;
