import React, { ReactElement } from "react";
import styled from "styled-components";
import { LoadingProvider } from "../../../src/components/LoadingProvider";
import { ResponsiveImage } from "../../../src/components/ResponsiveImage";
import { TitleDescription } from "../../../src/components/TitleDescription";
import { useVideoCallsQuery } from "../../../src/graphql/generated";
import { genderToPronoun } from "../../../src/helpers/genderToPronoun";
import { usePageLayout } from "../../../src/hooks/layout/usePageLayout";
import { LayoutState } from "../../../src/redux/slices/layoutSlice.types";

const pageLayout: LayoutState = {
  primaryButtonState: {
    show: true,
    onClickRoute: "/main/time_picker",
    text: "Yes!",
  },
  secondaryButtonState: {
    show: true,
    onClickRoute: "/main/reject?eventType=video_call",
    text: "Well actually...",
  },
};

const ImageContainer = styled.div`
  width: 60%;
  display: block;
  filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.5));
`;

export function ReviewCallPage(): ReactElement {
  usePageLayout(pageLayout);

  const { loading, error, data } = useVideoCallsQuery();

  const videoCallProfile = data?.currentUser?.videoCalls?.[0]?.profiles?.[0];

  return (
    <LoadingProvider data={data}>
      <ImageContainer>
        <ResponsiveImage round src={videoCallProfile?.propicFileDownloadUrl} />
      </ImageContainer>
      <TitleDescription
        title={`Would you meet ${genderToPronoun(videoCallProfile?.gender)} ?`}
        description={`Your call is over!  We hope you had fun with ${videoCallProfile?.name}`}
      />
    </LoadingProvider>
  );
}

export default ReviewCallPage;
