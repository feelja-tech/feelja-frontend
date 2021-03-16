import { useState, useEffect } from "react";
import { useCookie } from "react-use";
import { apiUrl } from "../helpers/environment";
import { useIframeDetection } from "./useIframeDetection";

type SocialType = "instagram" | "linkedin" | "spotify" | "youtube";

const config = {
  youtube: {
    nextStep: "/signup/spotify",
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT,
    permissions: "https://www.googleapis.com/auth/youtube.readonly",
    oauthEndpoint: "accounts.google.com/o/oauth2/v2/auth",
  },
  spotify: {
    nextStep: "/signup/linkedin",
    clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT,
    permissions:
      "user-top-read user-read-recently-played user-read-email user-library-read playlist-read-private playlist-read-collaborative",
    oauthEndpoint: "accounts.spotify.com/authorize",
  },
  instagram: {
    nextStep: "/signup/spotify",
    clientId: process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT,
    permissions: "user_profile,user_media",
    oauthEndpoint: "api.instagram.com/oauth/authorize",
  },
  linkedin: {
    nextStep: "/signup/interactive_audio",
    clientId: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT,
    permissions: "r_liteprofile,r_emailaddress",
    oauthEndpoint: "linkedin.com/oauth/v2/authorization",
  },
};

export function useSocialButtonUrl(
  socialType: SocialType
): { nextStep: string; url: string } {
  const redirectUri = `${apiUrl}/oauth/${socialType}`;

  const { nextStep, clientId, permissions, oauthEndpoint } = config[socialType];

  const [state, setState] = useState({
    jwt: null,
    iframe: false,
  });

  const isIframe = useIframeDetection();

  useEffect(() => {
    if (isIframe)
      setState((prev) => {
        return { ...prev, iframe: isIframe };
      });
  }, [isIframe]);

  const [jwt] = useCookie("feelja_user");

  useEffect(() => {
    if (jwt)
      setState((prev) => {
        return { ...prev, jwt };
      });
  }, [jwt]);

  const url = `https://${oauthEndpoint}?client_id=${encodeURIComponent(
    clientId
  )}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(
    permissions
  )}&response_type=code&state=${encodeURIComponent(
    JSON.stringify(state)
  )}&access_type=offline`;

  return {
    url: url,
    nextStep: nextStep,
  };
}
