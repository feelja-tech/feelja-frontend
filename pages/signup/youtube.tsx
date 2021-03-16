import { IconBrandYoutube, IconLockAccess } from "@tabler/icons";
import React, { ReactElement, useEffect } from "react";
import { useDispatch } from "react-redux";
import BigIcon from "../../src/components/BigIcon";
import { SocialButton } from "../../src/components/SocialButton";
import { TitleDescription } from "../../src/components/TitleDescription";
import { SIGNUP_PROGRESS_STEP } from "../../src/helpers/constants";
import { usePageLayout } from "../../src/hooks/layout/usePageLayout";
import { useSocialButtonUrl } from "../../src/hooks/useSocialButtonUrl";
import {
  setSecondaryButtonState,
  setPrimaryButtonState,
} from "../../src/redux/slices/layoutSlice";
import { LayoutState } from "../../src/redux/slices/layoutSlice.types";

const pageLayout: LayoutState = {
  progressBarState: {
    show: true,
    progress: SIGNUP_PROGRESS_STEP * 10,
  },
};

export function YoutubePage(): ReactElement {
  usePageLayout(pageLayout);

  const { url, nextStep } = useSocialButtonUrl("youtube");

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
        color: "#ff0000",
      })
    );
  }, [url, nextStep]);

  return (
    <>
      <BigIcon as={IconBrandYoutube} />
      <TitleDescription
        title={
          <>
            <IconLockAccess style={{ marginRight: "8px" }} />
            Personality
          </>
        }
        description="Connect your Youtube account let Feelja get a better picture of your personality"
      />
    </>
  );
}

export default YoutubePage;
