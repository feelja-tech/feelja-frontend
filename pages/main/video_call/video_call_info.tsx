import { IconCalendar, IconCalendarEvent } from "@tabler/icons";
import React, { ReactElement, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  InfoCard,
  InfoCardDataContainer,
  InfoCardTitle,
} from "../../../src/components/Cards";
import { BaseContainer } from "../../../src/components/Containers";
import { LoadingProvider } from "../../../src/components/LoadingProvider";
import { Description } from "../../../src/components/Typography";
import { useVideoCallsQuery } from "../../../src/graphql/generated";
import { parseDate } from "../../../src/helpers/date";
import { createVideoCallEventUrl } from "../../../src/helpers/ical";
import { colors } from "../../../src/helpers/themes";
import { usePageLayout } from "../../../src/hooks/layout/usePageLayout";
import { setPrimaryButtonState } from "../../../src/redux/slices/layoutSlice";
import { LayoutState } from "../../../src/redux/slices/layoutSlice.types";

const pageLayout: LayoutState = {
  headerButtonState: {
    show: true,
  },
  secondaryButtonState: {
    text: "More information",
    show: true,
    onClickRoute: "/main/how_it_works/0",
  },
  backgroundState: {
    color: "whitesmoke",
  },
};

export function VideoCallInfoPage(): ReactElement {
  usePageLayout(pageLayout);

  const { data } = useVideoCallsQuery();

  const videoCall = data?.currentUser.videoCalls[0];

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(
        setPrimaryButtonState({
          show: true,
          text: "Save event",
          onClickRoute: createVideoCallEventUrl(
            videoCall?.profiles[0].name,
            videoCall?.happensAt
          ),
        })
      );
    }
  }, [data]);

  return (
    <LoadingProvider data={data}>
      <InfoCard
        image={videoCall?.profiles[0].propicFileDownloadUrl}
        title={
          <BaseContainer style={{ flexDirection: "row" }}>
            <InfoCardTitle>Calling</InfoCardTitle>
            <InfoCardTitle style={{ color: "#b3b3b3", marginLeft: "8px" }}>
              {videoCall?.profiles?.[0]?.name}
            </InfoCardTitle>
          </BaseContainer>
        }
        info
      >
        <InfoCardDataContainer>
          <IconCalendarEvent
            style={{
              width: "auto",
              strokeWidth: "1.2",
              marginRight: "10px",
              color: colors.primary,
            }}
          />
          <Description>{parseDate(videoCall?.happensAt)}</Description>
        </InfoCardDataContainer>
      </InfoCard>
    </LoadingProvider>
  );
}

export default VideoCallInfoPage;
