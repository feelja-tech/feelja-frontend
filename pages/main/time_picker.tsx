import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  MainContainer,
  MainContentContainer,
} from "../../src/components/Containers";
import { TimeConfirmer } from "../../src/components/TimeConfirmer";
import { TimePicker } from "../../src/components/TimePicker";
import { TitleDescription } from "../../src/components/TitleDescription";
import {
  useAvailabilitiesQuery,
  useFinalizeMatchMutation,
  useFinalizeVideoCallMutation,
} from "../../src/graphql/generated";
import { usePageLayout } from "../../src/hooks/layout/usePageLayout";
import { RootState } from "../../src/redux/rootReducer";
import { LayoutState } from "../../src/redux/slices/layoutSlice.types";

const pageLayout: LayoutState = {
  disabled: true,
};

export function TimePickerPage(): ReactElement {
  usePageLayout(pageLayout);
  const router = useRouter();

  const [pickedTime, setPickedTime] = useState<string>();
  const [availabilities, setAvailabilities] = useState<string[]>();

  const [
    finalizeMatchMutation,
    finalizeMatchMutationResult,
  ] = useFinalizeMatchMutation();
  const [
    finalizeVideoCallMutation,
    finalizeVideoCallMutationResult,
  ] = useFinalizeVideoCallMutation();

  const called =
    finalizeMatchMutationResult?.called ||
    finalizeVideoCallMutationResult?.called;

  const { chosenUserId } = useSelector((state: RootState) => state.app);

  const { data } = useAvailabilitiesQuery();

  const eventType =
    data?.currentUser?.videoCalls && data?.currentUser?.videoCalls?.length > 0
      ? "video_call"
      : "match";

  const eventId =
    data?.currentUser?.matches?.[0]?.id ||
    data?.currentUser?.videoCalls?.[0]?.id;

  useEffect(() => {
    if (eventType && (availabilities || pickedTime) && eventId && !called) {
      (({
        match: () =>
          finalizeMatchMutation({
            variables: {
              matchId: eventId,
              chosenUserId,
              availabilities: availabilities || [pickedTime],
            },
          }),
        video_call: () =>
          finalizeVideoCallMutation({
            variables: {
              videoCallId: eventId,
              chosenUserId:
                data?.currentUser?.videoCalls?.[0]?.profiles?.[0].id,
              availabilities: availabilities || [pickedTime],
            },
          }),
      }[eventType]() as Promise<any>).then(() => {
        if (pickedTime || availabilities)
          router.push("/main/awaiting_response");
      }));
    }
  }, [pickedTime, availabilities, eventType, eventId, called]);

  const otherAvailabilities = (
    data?.currentUser?.matches?.[0] || data?.currentUser?.videoCalls?.[0]
  )?.availabilities;

  return (
    <MainContainer>
      {otherAvailabilities ? (
        <>
          <TitleDescription
            title="Pick a time"
            description="Your date is free to see you at one of these times, pick one!"
          />
          <MainContentContainer style={{ width: "70%" }}>
            <TimeConfirmer
              values={otherAvailabilities}
              onChange={setPickedTime}
            />
          </MainContentContainer>
        </>
      ) : (
        <>
          <TitleDescription
            title="Availability"
            description="Pick 3 days and times when you're free to see your match"
          />
          <MainContentContainer>
            <TimePicker
              onChange={(values) => {
                setAvailabilities(values);
              }}
            />
          </MainContentContainer>
        </>
      )}
    </MainContainer>
  );
}

export default TimePickerPage;
