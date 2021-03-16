import {
  faBadgeCheck,
  faQuestionCircle,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconAlarm, IconCurrentLocation } from "@tabler/icons";
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
import { useMeetingsQuery } from "../../../src/graphql/generated";
import { parseDate } from "../../../src/helpers/date";
import {
  createMeetingEventUrl,
  getGoogleMapsUrl,
} from "../../../src/helpers/ical";
import { colors } from "../../../src/helpers/themes";
import { usePageLayout } from "../../../src/hooks/layout/usePageLayout";
import {
  setPrimaryButtonState,
  setSecondaryButtonState,
} from "../../../src/redux/slices/layoutSlice";
import { LayoutState } from "../../../src/redux/slices/layoutSlice.types";
import ReactTooltip from "react-tooltip";

const pageLayout: LayoutState = {
  headerButtonState: {
    show: true,
  },
  backgroundState: {
    color: "whitesmoke",
  },
};

export function DateInfoPage(): ReactElement {
  usePageLayout(pageLayout);

  const { data } = useMeetingsQuery();

  const meeting = data?.currentUser.meetings[0];

  const dispatch = useDispatch();

  useEffect(() => {
    if (meeting) {
      dispatch(
        setPrimaryButtonState({
          show: true,
          text: "Save event",
          onClickRoute: createMeetingEventUrl(
            meeting.profiles?.[0]?.name as string,
            meeting.happensAt,
            meeting.location
          ),
        })
      );

      dispatch(
        setSecondaryButtonState({
          show: true,
          text: "Get directions",
          onClickRoute: getGoogleMapsUrl({
            lat: meeting.location.latitude,
            lon: meeting.location.longitude,
          }),
        })
      );
    }
  }, [meeting]);

  return (
    <LoadingProvider data={data}>
      <InfoCard
        image={meeting?.location?.image}
        title={
          <BaseContainer>
            <InfoCardTitle>Meeting</InfoCardTitle>
            <InfoCardTitle style={{ color: "#b3b3b3" }}>
              {meeting?.profiles?.[0]?.name}
            </InfoCardTitle>
          </BaseContainer>
        }
        subImage={meeting?.profiles?.[0]?.propicFileDownloadUrl}
        info
      >
        <InfoCardDataContainer>
          <IconAlarm
            style={{
              width: "auto",
              strokeWidth: "1.2",
              marginRight: "10px",
              color: colors.primary,
            }}
          />
          <Description>{parseDate(meeting?.happensAt)}</Description>
        </InfoCardDataContainer>
        <InfoCardDataContainer style={{ borderTop: "none" }}>
          <IconCurrentLocation
            style={{
              width: "auto",
              strokeWidth: "1.2",
              marginRight: "10px",
              color: colors.primary,
            }}
          />
          <Description>{meeting?.location?.name}</Description>
          <BaseContainer
            style={{
              alignItems: "center",
              flexDirection: "row",
              marginLeft: "8px",
            }}
            data-tip
          >
            <FontAwesomeIcon
              style={{ marginRight: "8px", color: "blue" }}
              icon={faBadgeCheck}
              size="lg"
            />
            <FontAwesomeIcon
              style={{ color: "lightgray" }}
              icon={faQuestionCircle}
            />
            <ReactTooltip effect="solid" place="top">
              <span>Covid-19 safe: this place allows distancing</span>
            </ReactTooltip>
          </BaseContainer>
        </InfoCardDataContainer>
      </InfoCard>
    </LoadingProvider>
  );
}

export default DateInfoPage;
