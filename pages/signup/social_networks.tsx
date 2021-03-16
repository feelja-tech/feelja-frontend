import {
  faInstagram,
  faLinkedin,
  faSpotify,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconLockAccess } from "@tabler/icons";
import { useRouter } from "next/router";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { MainContentContainer } from "../../src/components/Containers";
import MainButton from "../../src/components/MainButton";
import { TitleDescription } from "../../src/components/TitleDescription";
import { useCurrentUserProfileQuery } from "../../src/graphql/generated";
import { SIGNUP_PROGRESS_STEP } from "../../src/helpers/constants";
import { usePageLayout } from "../../src/hooks/layout/usePageLayout";
import { useIframeDetection } from "../../src/hooks/useIframeDetection";
import { useSocialButtonUrl } from "../../src/hooks/useSocialButtonUrl";
import { setSecondaryButtonState } from "../../src/redux/slices/layoutSlice";
import { LayoutState } from "../../src/redux/slices/layoutSlice.types";

const pageLayout: LayoutState = {
  progressBarState: {
    show: true,
    progress: SIGNUP_PROGRESS_STEP * 9,
  },
};

const MAX_ACCOUNTS_N = 3;

const SocialButtonsContainer = styled(MainContentContainer)`
  flex: 1;
  justify-content: space-evenly;
  width: 70%;
  max-height: 260px;
  margin-top: 16px;
`;

export function SocialNetworksPage(): ReactElement {
  usePageLayout(pageLayout);

  const { url: instagramUrl } = useSocialButtonUrl("instagram");
  const { url: linkedinUrl } = useSocialButtonUrl("linkedin");
  const { url: spotifyUrl } = useSocialButtonUrl("spotify");
  const { url: youtubeUrl } = useSocialButtonUrl("youtube");

  const router = useRouter();

  const { data } = useCurrentUserProfileQuery({
    pollInterval: 3000,
  });

  const addedAccounts = data?.currentUser?.profile?.socialAccounts;

  const dispatch = useDispatch();

  useEffect(() => {
    if (addedAccounts?.length > 0 && addedAccounts?.length < MAX_ACCOUNTS_N)
      dispatch(
        setSecondaryButtonState({
          text: "Maybe later",
          show: true,
          onClickRoute: "/signup/name",
        })
      );
    else if (addedAccounts?.length === MAX_ACCOUNTS_N)
      router.push("/signup/name");
  }, [addedAccounts]);

  const isIframe = useIframeDetection();

  const onClick = useCallback(
    (url) => {
      if (isIframe) window.open(url);
      else router.push(url);
    },
    [isIframe]
  );

  return (
    <>
      <TitleDescription
        title={
          <>
            <IconLockAccess style={{ marginRight: "8px" }} />
            Social links
          </>
        }
        description="Link your social accounts to let Feelja get a better picture of your personality."
      />
      <SocialButtonsContainer>
        {/* {!addedAccounts?.includes("instagram") && (
          <MainButton
            onClick={() => {
              router.push(instagramUrl);
            }}
            style={{
              border: "none",
              background: "#ff546b",
            }}
          >
            <FontAwesomeIcon
              style={{ color: "white", marginRight: "8px" }}
              icon={faInstagram}
              size="1x"
            />
            Instagram
          </MainButton>
        )} */}
        {!addedAccounts?.includes("spotify") && (
          <MainButton
            onClick={() => {
              onClick(spotifyUrl);
            }}
            style={{
              border: "none",
              background: "#1DD05E",
            }}
          >
            <FontAwesomeIcon
              style={{ color: "white", marginRight: "8px" }}
              icon={faSpotify}
              size="1x"
            />
            Spotify
          </MainButton>
        )}
        {!addedAccounts?.includes("youtube") && (
          <MainButton
            onClick={() => {
              onClick(youtubeUrl);
            }}
            style={{
              border: "none",
              background: "#ff0000",
            }}
          >
            <FontAwesomeIcon
              style={{ color: "white", marginRight: "8px" }}
              icon={faYoutube}
              size="1x"
            />
            Youtube
          </MainButton>
        )}
        {!addedAccounts?.includes("linkedin") && (
          <MainButton
            onClick={() => {
              onClick(linkedinUrl);
            }}
            style={{
              border: "none",
              background: "#0a66c2",
            }}
          >
            <FontAwesomeIcon
              style={{ color: "white", marginRight: "8px" }}
              icon={faLinkedin}
              size="1x"
            />
            Linkedin
          </MainButton>
        )}
      </SocialButtonsContainer>
    </>
  );
}

export default SocialNetworksPage;
