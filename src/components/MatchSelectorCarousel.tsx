import { IconArrowBackUp, IconStar, IconThumbUp } from "@tabler/icons";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import SwiperCore, { EffectCube } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { useConfetti } from "../hooks/useConfetti";
import { Countdown } from "./Countdown";
import { MatchProfile } from "./MatchProfile";

SwiperCore.use([EffectCube]);

const MatchInputsContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10% 5% 5% 5%;
  width: 100%;
  bottom: 0;
  max-height: 125px;
  height: 20vh;
  z-index: 1000;
  /* background: linear-gradient(
    rgba(1, 1, 1, 0) 0%,
    rgba(1, 1, 1, 0.2) 30%,
    rgba(1, 1, 1, 0.2) 70%,
    rgba(1, 1, 1, 0) 100%
  ); */
`;

interface MatchSelectorCarouselProps {
  goToProfileId: number;
  profiles: any[];
  onReject: () => void;
  onPick: (profileId: number) => void;
  timeout: Date;
}

export const MatchButton = styled.svg`
  background: white;
  color: ${(props) => props.theme.primary};

  border-radius: 50%;
  max-height: 17vh;
  max-width: 17vh;

  height: 100%;
  width: auto;
  padding: 16px;
  filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.5));
`;

export function MatchSelectorCarousel(
  props: MatchSelectorCarouselProps
): ReactElement {
  const { profiles, goToProfileId, onReject, onPick, timeout } = props;

  const [selectedProfileId, setSelectedProfileId] = useState<number>(
    goToProfileId
  );
  const [currentSlideId, setCurrentSlideId] = useState<number>(
    goToProfileId
      ? profiles.map((p) => p.id).indexOf(goToProfileId.toString())
      : 0
  );

  const [picked, setPicked] = useState(false);

  useConfetti(!picked);

  useEffect(() => {
    const id = profiles.map((p) => p.id)[currentSlideId];

    setSelectedProfileId(id);
  }, [currentSlideId, profiles]);

  const router = useRouter();

  return (
    <>
      <Swiper
        autoHeight
        onSlideChange={(swiper) => {
          setCurrentSlideId(swiper.activeIndex);
        }}
        initialSlide={currentSlideId}
        effect="cube"
        style={{
          overflowY: "scroll",
          width: "100%",
          height: "100%",
          padding: "8px",
          background:
            "radial-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.3))",
        }}
        cubeEffect={{
          shadow: false,
        }}
      >
        {profiles.map((profile) => {
          return (
            <SwiperSlide
              style={{
                height: "max-content",
              }}
            >
              <MatchProfile profile={profile} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <MatchInputsContainer>
        <MatchButton as={IconArrowBackUp} onClick={onReject} />
        <Countdown
          until={timeout}
          onFinish={() => {
            router.push("/main/too_bad");
          }}
          onClick={() => {
            router.push("/main/reject?eventType=match");
          }}
          style={{
            filter: "drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.5))",
          }}
        />
        <MatchButton
          as={IconThumbUp}
          onClick={() => {
            setPicked(true);
            onPick(selectedProfileId);
          }}
        />
      </MatchInputsContainer>
    </>
  );
}

export default MatchSelectorCarousel;
