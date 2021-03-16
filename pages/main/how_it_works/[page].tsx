import {
  faBell,
  faLock,
  faMapMarkerAlt,
  faVideo,
} from "@fortawesome/pro-solid-svg-icons";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BigIcon } from "../../../src/components/BigIcon";
import SvgLogo from "../../../src/components/svg/Logo";
import { TitleDescription } from "../../../src/components/TitleDescription";
import { HIW_PROGRESS_STEP } from "../../../src/helpers/constants";
import { usePageLayout } from "../../../src/hooks/layout/usePageLayout";
import {
  setPrimaryButtonState,
  setProgressBarState,
} from "../../../src/redux/slices/layoutSlice";
import { LayoutState } from "../../../src/redux/slices/layoutSlice.types";

const howItWorksContents = [
  {
    icon: SvgLogo,
    title: "How it works",
    description:
      "Feelja will be your personal relationship assistant. She uses social psychology and personality science to find people similar to you.",
    //"Feelja is creating a world’s first platform of love dedicated to actual human connection. She’ll be your personal relationship assistant to guide you through the process.",
  },
  {
    icon: faLock,
    // IconFriends,
    title: "Verification",
    description:
      "All of our users are verified via our face recognition technology. It’s important we keep our community authentic.",
    //"Using behavioural science and artificial intelligence, she’ll help you find someone like yourself. Once your matches are ready, you’ll receive a text from her.",
  },
  {
    icon: faVideo,
    // IconShieldCheck,
    title: "Voice and video only",
    description:
      "When you’re ready, you’ll meet your matches in a short video call. You then get to decide if you want to meet them in person.",
    //"Friendship without honesty is like going scuba diving without an oxygen mask: it almost never works. We verify all of users via our proprietary technology.",
  },
  {
    icon: faMapMarkerAlt,
    // IconVideo,
    title: "Meeting spot",
    description:
      "Feelja arranges where you’ll meet. All of our locations are Covid-19 verified and public.",
    //"Once both parties are ready, they’ll have a 5-min video chat to get to know each other. They will then decide whether they want to meet in person or continue looking.",
  },
  {
    icon: faBell,
    //IconLiveView,
    title: "Rescheduling",
    description:
      "Life is busy. We understand things sometimes come up. If you cannot make it, please contact us.",
    // "Real connections come down to two things: great people and amazing places. Since you took care of the first, we’ll take care the second.  All of our meeting spots are public and verified by our team of experts.",
  },
];

const pageLayout: LayoutState = {};

export function HowItWorksPage(): ReactElement {
  usePageLayout(pageLayout);

  const router = useRouter();
  const dispatch = useDispatch();

  const [pageNumber, setPageNumber] = useState(0);

  const { page } = router.query;

  useEffect(() => {
    if (page) setPageNumber(parseInt(page.toString(), 10));
  }, [page]);

  useEffect(() => {
    dispatch(
      setProgressBarState({
        show: true,
        progress: HIW_PROGRESS_STEP * (1 + pageNumber),
      })
    );

    const nextPageNumber = pageNumber + 1;

    if (nextPageNumber === howItWorksContents.length)
      dispatch(
        setPrimaryButtonState({
          show: true,
          text: "Next",
          onClickRoute: "/",
        })
      );
    else {
      dispatch(
        setPrimaryButtonState({
          show: true,
          text: "Next",
          onClickRoute: `/main/how_it_works/${nextPageNumber}`,
        })
      );
    }
  }, [pageNumber]);

  return (
    <>
      <BigIcon as={howItWorksContents[pageNumber].icon} />
      <TitleDescription
        title={howItWorksContents[pageNumber].title}
        description={howItWorksContents[pageNumber].description}
      />
    </>
  );
}

export default HowItWorksPage;
