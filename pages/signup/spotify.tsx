import { IconBrandSpotify, IconLockAccess } from "@tabler/icons";
import React, { ReactElement, useEffect } from "react";
import { useDispatch } from "react-redux";
import BigIcon from "../../src/components/BigIcon";
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
    progress: SIGNUP_PROGRESS_STEP * 11,
  },
};

export function SpotifyPage(): ReactElement {
  usePageLayout(pageLayout);

  const { url, nextStep } = useSocialButtonUrl("spotify");

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
        color: "#1DD05E",
      })
    );
  }, [url, nextStep]);

  return (
    <>
      <BigIcon as={IconBrandSpotify} />
      <TitleDescription
        title={
          <>
            <IconLockAccess style={{ marginRight: "8px" }} />
            Musical taste
          </>
        }
        description="Link your Spotify account to let Feelja know your music taste"
      />
    </>
  );
}

export default SpotifyPage;
