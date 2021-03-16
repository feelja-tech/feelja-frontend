import { faBadgeCheck } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconAntennaBars1,
  IconAntennaBars2,
  IconAntennaBars3,
  IconAntennaBars4,
  IconAntennaBars5,
  IconBrandLinkedin,
  IconBrandSpotify,
  IconBrandYoutube,
  IconBuildingChurch,
  IconCheckbox,
  IconRuler,
  IconShieldCheck,
  TablerIconProps,
} from "@tabler/icons";
import React, {
  CSSProperties,
  FC,
  PropsWithChildren,
  ReactElement,
} from "react";
import { For } from "react-loops";
import styled, { keyframes } from "styled-components";
import { Profile } from "../graphql/generated";
import {
  resolvePersonalityTrait,
  resolveSocialNetwork,
} from "../helpers/resolveFontawesomeIcon";
import { colors } from "../helpers/themes";
import { Card, InfoCard, InfoCardDataContainer, InfoCardTitle } from "./Cards";
import { BaseContainer } from "./Containers";
import { Description, Title } from "./Typography";
import "intersection-observer";
import IsVisible from "react-is-visible";

interface CardDescriptionContainerProps {
  social?: boolean;
  reveal?: boolean;
}

const revealAnimation = keyframes`
  0%{
    opacity: 1;
  }
  100%{
    opacity: 0;
  }
`;

const CardDescriptionContainer = styled.div<CardDescriptionContainerProps>`
  flex: 0.5;
  position: relative;

  &::before {
    position: absolute;
    content: "🔒";
    font-size: 32px;
    color: ${(props) => (props.social ? "white" : colors.primary)};
    backdrop-filter: blur(10px);
    height: 100%;
    width: 100%;
    animation: ${(props) => (props.reveal ? revealAnimation : "none")} 3000ms
      ease-in-out;

    animation-fill-mode: forwards;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
`;

const MatchProfileContainer = styled.div`
  overflow-x: hidden;
  width: 100%;
  min-height: 100%;
  padding-bottom: min(20vh, 150px);
`;

const TextEntryContainer = styled.div`
  padding: 10px 3px;
  border-top: 1px lightgray solid;
  flex: 1 1 auto;
  margin-top: -1px;
  height: min-content;
  align-items: flex-end;
  justify-content: center;
  display: flex;
`;

const TextEntryIcon = styled.div`
  color: ${(props) => props.theme.primary};
  margin-right: 5px;
  flex: 0 0 auto;
  stroke-width: 1.3;
`;

function TextEntry(
  props: PropsWithChildren<{ icon: FC<TablerIconProps>; style?: CSSProperties }>
): ReactElement {
  const { icon, children, style } = props;

  return (
    <TextEntryContainer style={style}>
      <TextEntryIcon as={icon} />
      <Description>{children}</Description>
    </TextEntryContainer>
  );
}

const ProfileBadge = styled.div<{ active?: boolean }>`
  filter: opacity(${(props) => (props.active ? 1 : 0.3)});
  stroke-width: 1.3;
`;

const PercentageBadgeContainer = styled(BaseContainer)`
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1;
  align-items: end;

  align-items: center;
  justify-content: center;
`;

const ICON_STEP = 0.2;

function PercentageBadge(props: { percentage: number }): ReactElement {
  const { percentage } = props;

  const index = Math.ceil(percentage / ICON_STEP);

  const IconAntennaBars = {
    1: IconAntennaBars1,
    2: IconAntennaBars2,
    3: IconAntennaBars3,
    4: IconAntennaBars4,
    5: IconAntennaBars5,
  }[index];

  return (
    <PercentageBadgeContainer>
      <IconAntennaBars style={{ color: colors.primary }}> </IconAntennaBars>
      <Description style={{ marginTop: "6px" }}>Score</Description>
    </PercentageBadgeContainer>
  );
}

export function ProfileCard(props: {
  profile: Profile;
  currentUser?: boolean;
}): ReactElement {
  const { profile, currentUser = false } = props;

  return (
    <InfoCard
      style={{
        paddingBottom: currentUser ? "16px" : "0px",
      }}
      image={profile?.propicFileDownloadUrl}
      title={
        <>
          <InfoCardTitle>{profile?.name}</InfoCardTitle>
          <InfoCardTitle
            style={{
              fontSize: "24px",
              marginLeft: "8px",
              color: "#b5b5b5",
            }}
          >
            {profile?.age}
          </InfoCardTitle>
        </>
      }
      titleBadge={
        <div style={{ flex: 1 }}>
          <PercentageBadgeContainer>
            <FontAwesomeIcon
              icon={faBadgeCheck}
              size="1x"
              color="blue"
              style={{ marginRight: "4px" }}
            />
            <Description style={{ marginTop: "6px" }}>Verified</Description>
          </PercentageBadgeContainer>
          <PercentageBadge percentage={profile?.score} />
        </div>
      }
    >
      {currentUser && (
        <InfoCardDataContainer
          style={{
            justifyContent: "space-around",
          }}
        >
          <ProfileBadge as={IconShieldCheck} style={{ color: "blue" }} active />
          <ProfileBadge
            as={IconBrandYoutube}
            style={{ color: "red" }}
            active={profile?.socialAccounts?.indexOf("youtube") > -1}
          />
          <ProfileBadge
            as={IconBrandSpotify}
            style={{ color: "green" }}
            active={profile?.socialAccounts?.indexOf("spotify") > -1}
          />
          <ProfileBadge
            as={IconBrandLinkedin}
            style={{ color: "blue" }}
            active={profile?.socialAccounts?.indexOf("linkedin") > -1}
          />
        </InfoCardDataContainer>
      )}
    </InfoCard>
  );
}

export function MatchProfile(props: { profile: Profile }): ReactElement {
  const { profile } = props;

  return (
    <MatchProfileContainer>
      <ProfileCard profile={profile} />
      <Card>
        <TextEntry icon={IconRuler}>{`${profile?.height} cm`}</TextEntry>
        <TextEntry icon={IconCheckbox}>{profile?.politicPreferences}</TextEntry>
        <TextEntry icon={IconBuildingChurch}>
          {profile?.religiousPreferences}
        </TextEntry>
      </Card>
      {profile?.description && (
        <For
          of={profile?.description}
          as={(entry, { index }) => (
            <Card
              style={{
                padding: "16px",
                alignItems: "center",
                flexDirection: index % 2 === 0 ? "row" : "row-reverse",
                backgroundColor:
                  (entry.type === "social" &&
                    resolveSocialNetwork(entry.name).color) ||
                  "white",
              }}
            >
              {entry.type === "social" ? (
                <>
                  <FontAwesomeIcon
                    icon={resolveSocialNetwork(entry.name).icon}
                    size="4x"
                    color={"white"}
                    style={{
                      flex: 0.5,
                      margin: "0 16px",
                    }}
                  />
                  <IsVisible once>
                    {(isVisible) => (
                      <CardDescriptionContainer social reveal={isVisible}>
                        <For
                          of={entry.description}
                          as={(e) => {
                            return (
                              <Description
                                style={{ textAlign: "center", color: "white" }}
                                lowercase={entry.name === "instagram"}
                              >
                                {e}
                              </Description>
                            );
                          }}
                        />
                      </CardDescriptionContainer>
                    )}
                  </IsVisible>
                </>
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={resolvePersonalityTrait(entry.name)}
                    size="5x"
                    color={colors.primary}
                    opacity={0.5}
                    style={{
                      flex: 0.3,
                      margin: "0 16px",
                    }}
                  />
                  <IsVisible once>
                    {(isVisible) => (
                      <CardDescriptionContainer
                        reveal={isVisible}
                        style={{
                          flex: 0.7,
                        }}
                      >
                        <Title>{entry.name}</Title>
                        <Description>{entry.description}</Description>
                      </CardDescriptionContainer>
                    )}
                  </IsVisible>
                </>
              )}
            </Card>
          )}
        />
      )}
    </MatchProfileContainer>
  );
}

export default MatchProfile;
