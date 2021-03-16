import {
  IconCircleCheck,
  IconFingerprint,
  IconLockAccess,
} from "@tabler/icons";
import React, { ReactElement } from "react";
import { BigIcon } from "../../src/components/BigIcon";
import { BaseContainer } from "../../src/components/Containers";
import { TitleDescription } from "../../src/components/TitleDescription";
import { Description } from "../../src/components/Typography";
import { SIGNUP_PROGRESS_STEP } from "../../src/helpers/constants";
import { colors } from "../../src/helpers/themes";
import { usePageLayout } from "../../src/hooks/layout/usePageLayout";
import { LayoutState } from "../../src/redux/slices/layoutSlice.types";

const pageLayout: LayoutState = {
  primaryButtonState: {
    text: "Begin",
    show: true,
    onClickRoute: "/signup/id_camera",
  },
  secondaryButtonState: {
    show: process.env.NODE_ENV === "development",
    text: "Do it later",
    onClickRoute: "/signup/pose_camera_explaination",
  },
  progressBarState: {
    show: true,
    progress: SIGNUP_PROGRESS_STEP * 6,
  },
};

function VerifiedByBadge(): ReactElement {
  return (
    <BaseContainer style={{ flexDirection: "row", alignItems: "flex-end" }}>
      <IconCircleCheck style={{ color: colors.primary }} />
      <Description style={{ marginLeft: "5px" }}>
        Verified via Microblink™
      </Description>
    </BaseContainer>
  );
}

export function IdCameraExplainationPage(): ReactElement {
  usePageLayout(pageLayout);
  return (
    <>
      <BigIcon as={IconFingerprint} style={{ fill: "none" }} />
      <TitleDescription
        title={
          <>
            <IconLockAccess style={{ marginRight: "8px" }} />
            ID check
          </>
        }
        description="Safety first! Bring over a valid identity document to proceed with the signup process."
      />
      <VerifiedByBadge />
    </>
  );
}
export default IdCameraExplainationPage;
