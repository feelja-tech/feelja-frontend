import { IconPhoneX } from "@tabler/icons";
import moment from "moment";
import { useRouter } from "next/router";
import React, { ReactElement, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { FullScreenContainer } from "../../../src/components/Containers";
import { Countdown } from "../../../src/components/Countdown";
import { MatchButton } from "../../../src/components/MatchSelectorCarousel";
import SvgLoading from "../../../src/components/svg/SvgLoading";
import { Description } from "../../../src/components/Typography";
import { useVideoCallsQuery } from "../../../src/graphql/generated";
import { usePageLayout } from "../../../src/hooks/layout/usePageLayout";
import { useVideoCall } from "../../../src/hooks/useVideoCall";
import { LayoutState } from "../../../src/redux/slices/layoutSlice.types";

const SmallVideo = styled.video`
  height: 100%;
  max-width: 40%;
  object-fit: cover;
  bottom: 0;
  left: 0;
  //box-shadow: 0 0 5px #e4d7d7;
  filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.5));
  border-radius: 15px;
  flex: 1 0 auto;
  margin-right: 20%;
  transition: all ease-in-out 300ms;
`;

const BigVideo = styled.video`
  position: absolute;
  z-index: 1;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const BottomContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 8px;
  bottom: 0;
  z-index: 2;
  justify-content: space-between;
`;

const EndCallButton = styled.svg`
  background: white;
  color: ${(props) => props.theme.primary};

  border-radius: 50%;

  padding: 16px;
  filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.5));

  height: 56px;
  width: auto;
  margin: 8px;
`;

const pageLayout: LayoutState = {
  disabled: true,
};

export function VideoCallPage(): ReactElement {
  usePageLayout(pageLayout);

  const router = useRouter();

  const { data } = useVideoCallsQuery();

  const until = moment(data?.currentUser?.videoCalls[0]?.happensAt).add(
    10,
    "minutes"
  );

  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);

  const { onLeave, remoteConnected, localConnected } = useVideoCall(
    localVideoRef?.current,
    remoteVideoRef?.current,
    data?.currentUser?.videoCalls?.[0]
  );

  useEffect(() => {
    return onLeave;
  }, [onLeave]);

  const onFinish = useCallback(() => {
    if (data?.currentUser?.videoCalls?.[0]?.initiator)
      router.push("/main/video_call/review_call");
    else router.push("/main/awaiting_response");
  }, [data]);

  return (
    <FullScreenContainer style={{ flexDirection: "column" }}>
      <Countdown
        until={until.toDate()}
        style={{
          position: "absolute",
          top: "8px",
        }}
        onFinish={onFinish}
      />
      {!remoteConnected && (
        <>
          <SvgLoading style={{ transform: "scale(2)" }} />
          <Description style={{ marginTop: "50px", color: "white" }}>
            Waiting for
            {` ${data?.currentUser?.videoCalls?.[0]?.profiles?.[0]?.name}`}
          </Description>
        </>
      )}
      <BigVideo ref={remoteVideoRef} autoPlay />
      <BottomContainer>
        <SmallVideo
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          style={{ opacity: localConnected ? "1" : "0" }}
        />
        <EndCallButton as={IconPhoneX} onClick={onFinish} />
      </BottomContainer>
    </FullScreenContainer>
  );
}

export default VideoCallPage;
