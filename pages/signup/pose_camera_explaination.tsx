import { IconFaceId, IconFingerprint, IconLockAccess } from "@tabler/icons";
import React, { ReactElement } from "react";
import { BigIcon } from "../../src/components/BigIcon";
import { TitleDescription } from "../../src/components/TitleDescription";
import { SIGNUP_PROGRESS_STEP } from "../../src/helpers/constants";
import { usePageLayout } from "../../src/hooks/layout/usePageLayout";
import { LayoutState } from "../../src/redux/slices/layoutSlice.types";

const pageLayout: LayoutState = {
  primaryButtonState: {
    text: "Begin",
    show: true,
    onClickRoute: "/signup/pose_camera",
  },
  secondaryButtonState: {
    text: "Do it later",
    show: process.env.NODE_ENV === "development",
    onClickRoute: "/signup/select_picture",
  },
  progressBarState: {
    show: true,
    progress: SIGNUP_PROGRESS_STEP * 7,
  },
};

export function PoseCameraExplainationPage(): ReactElement {
  usePageLayout(pageLayout);

  return (
    <>
      <BigIcon as={IconFingerprint} style={{ fill: "none" }} />
      <TitleDescription
        title={
          <>
            <IconLockAccess style={{ marginRight: "8px" }} />
            Verification
          </>
        }
        description="Safety first! Follow the instructions on the next screen to verify you're a real user."
      />
    </>
  );
}

export default PoseCameraExplainationPage;
