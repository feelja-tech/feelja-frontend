import { IconMoodSad } from "@tabler/icons";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import { BigIcon } from "../../src/components/BigIcon";
import { TitleDescription } from "../../src/components/TitleDescription";
import {
  useFinalizeMatchMutation,
  useFinalizeVideoCallMutation,
  useMatchesQuery,
  useVideoCallsQuery,
} from "../../src/graphql/generated";
import { usePageLayout } from "../../src/hooks/layout/usePageLayout";
import { LayoutState } from "../../src/redux/slices/layoutSlice.types";

const subject = encodeURIComponent("User experience feedback");
const body = encodeURIComponent(
  "Hi, I'm suggesting the following improvements to the user experience:"
);

const pageLayout: LayoutState = {
  primaryButtonState: {
    show: true,
    text: "Send feedback",
    onClickRoute: `mailto:contact@feelja.com?subject=${subject}&body=${body}`,
  },
  secondaryButtonState: {
    show: true,
    text: "Maybe next time",
    onClickRoute: "/main/initial",
  },
};

export function TooBadPage(): ReactElement {
  usePageLayout(pageLayout);

  const router = useRouter();

  const { cancelEvent } = router.query as { cancelEvent: string };

  const [finalizeMatchMutation] = useFinalizeMatchMutation();
  const [finalizeVideoCallMutation] = useFinalizeVideoCallMutation();

  const { data: videoCallData } = useVideoCallsQuery();
  const { data: matchData } = useMatchesQuery();

  const eventId =
    videoCallData?.currentUser?.videoCalls?.[0]?.id ||
    matchData?.currentUser?.matches?.[0]?.id;

  useEffect(() => {
    if (eventId) {
      if (cancelEvent === "video_call") {
        finalizeVideoCallMutation({
          variables: {
            videoCallId: eventId,
            chosenUserId: null,
            availabilities: [],
          },
        });
      }
      if (cancelEvent === "match") {
        finalizeMatchMutation({
          variables: {
            matchId: eventId,
            chosenUserId: null,
            availabilities: [],
          },
        });
      }
    }
  }, [cancelEvent, eventId]);

  return (
    <>
      <BigIcon as={IconMoodSad} style={{ fill: "white" }} />
      <TitleDescription
        title="Too bad"
        description="We're sad this didn't work out. But don't worry, it's on us! Shoot us a message and let us know how we can improve."
      />
    </>
  );
}

export default TooBadPage;
