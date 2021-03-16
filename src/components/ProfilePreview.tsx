import React, { ReactElement } from "react";
import { For } from "react-loops";
import styled, { keyframes } from "styled-components";
import { Profile } from "../graphql/generated";
import { BaseContainer } from "./Containers";
import { ResponsiveImage } from "./ResponsiveImage";

interface ProfilePreviewProps {
  profile: Profile;
  onOpen: (profile: Profile) => void;
  shine?: boolean;
}

const shineAnimation = keyframes`
  50% {box-shadow: 0 0 30px #ffcc00;}
`;

const ProfilePreviewContainer = styled(BaseContainer)<{ shine?: boolean }>`
  margin: 5px;
  filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.161));
  box-shadow: 0 0 0 1px #e4d7d7;
  border-radius: 8px;

  animation: ${(props) => (props.shine ? shineAnimation : "none")} 5s infinite;
`;

export function ProfilePreview(props: ProfilePreviewProps): ReactElement {
  const { profile, onOpen, shine } = props;

  return (
    <ProfilePreviewContainer shine={shine}>
      {profile ? (
        <ResponsiveImage
          src={profile.propicFileDownloadUrl}
          onClick={() => {
            onOpen(profile);
          }}
        />
      ) : (
        <ResponsiveImage src="/avatar.jpg" />
      )}
    </ProfilePreviewContainer>
  );
}

interface ProfilesPreviewProps {
  profiles: Profile[];
  onOpen: (profile: Profile) => void;
}

export function ProfilesPreview(props: ProfilesPreviewProps): ReactElement {
  const { profiles, onOpen } = props;

  return (
    <For
      of={profiles.sort((a, b) => a.score - b.score)}
      as={(profile, { index }) => {
        return (
          <ProfilePreview
            profile={profile}
            onOpen={onOpen}
            shine={index === 0}
          />
        );
      }}
    />
  );
}

export default ProfilesPreview;
