import React, { ReactElement, useEffect } from "react";
import styled from "styled-components";
import { LoadingProvider } from "../../../src/components/LoadingProvider";
import { ResponsiveImage } from "../../../src/components/ResponsiveImage";
import { TitleDescription } from "../../../src/components/TitleDescription";
import { useVideoCallsQuery } from "../../../src/graphql/generated";
import { usePageLayout } from "../../../src/hooks/layout/usePageLayout";
import { LayoutState } from "../../../src/redux/slices/layoutSlice.types";

const pageLayout: LayoutState = {
  primaryButtonState: {
    show: true,
    onClickRoute: "/main/video_call/video_call",
    text: "Start",
  },
};

const ImageContainer = styled.div`
  width: 60%;
  display: block;

  filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.5));

  box-shadow: 0 0 10px white;
  border-radius: 100%;
`;

const ImagesContainer = styled.div`
  width: 85%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export function GetReadyPage(): ReactElement {
  usePageLayout(pageLayout);

  const { data } = useVideoCallsQuery();

  return (
    <LoadingProvider data={data}>
      <ImagesContainer>
        <ImageContainer>
          <ResponsiveImage
            round
            src={data?.currentUser.profile.propicFileDownloadUrl}
          />
        </ImageContainer>
        <ImageContainer style={{ marginLeft: "-15%" }}>
          <ResponsiveImage
            round
            src={
              data?.currentUser.videoCalls[0].profiles[0].propicFileDownloadUrl
            }
          />
        </ImageContainer>
      </ImagesContainer>
      <TitleDescription
        title="Get ready!"
        description="Your video call is on! You can start as soon as you're ready."
      />
    </LoadingProvider>
  );
}

export default GetReadyPage;
