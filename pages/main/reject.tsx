import { IconAlertOctagon } from "@tabler/icons";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BigIcon } from "../../src/components/BigIcon";
import { TitleDescription } from "../../src/components/TitleDescription";
import { usePageLayout } from "../../src/hooks/layout/usePageLayout";
import {
  setPrimaryButtonState,
  setSecondaryButtonState,
} from "../../src/redux/slices/layoutSlice";
import { LayoutState } from "../../src/redux/slices/layoutSlice.types";

const pageLayout: LayoutState = {};

export function RejectPage(): ReactElement {
  usePageLayout(pageLayout);

  const router = useRouter();

  const { eventType } = router.query as { eventType: string };

  const dispatch = useDispatch();

  useEffect(() => {
    if (eventType) {
      dispatch(
        setPrimaryButtonState({
          show: true,
          text: "No, get me back",
          onClickRoute: {
            video_call: "/main/video_call/review_call",
            match: "/main/match/matches_overview",
          }[eventType],
        })
      );

      dispatch(
        setSecondaryButtonState({
          show: true,
          text: "Yes, I'm sure",
          onClickRoute: `/main/too_bad?cancelEvent=${eventType}`,
        })
      );
    }
  }, [eventType]);

  return (
    <>
      <BigIcon as={IconAlertOctagon} style={{ fill: "white" }} />
      <TitleDescription
        title="Are you sure?"
        description="Don't judge a book by its cover! If you proceed with cancelling you might get a cooldown on your next matches!"
      />
    </>
  );
}

export default RejectPage;
