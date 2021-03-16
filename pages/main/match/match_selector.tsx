import moment from "moment";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { useDispatch } from "react-redux";
import { MatchSelectorCarousel } from "../../../src/components/MatchSelectorCarousel";
import { useMatchesQuery } from "../../../src/graphql/generated";
import { usePageLayout } from "../../../src/hooks/layout/usePageLayout";
import { setChosenUserIdState } from "../../../src/redux/slices/appSlice";
import { LayoutState } from "../../../src/redux/slices/layoutSlice.types";

const pageLayout: LayoutState = {
  disabled: true,
};

export function MatchSelectorPage(): ReactElement {
  usePageLayout(pageLayout);

  const { data } = useMatchesQuery();

  const router = useRouter();

  const { profileId: goToProfileId } = router.query as { profileId: string };

  const dispatch = useDispatch();

  const match = data?.currentUser?.matches?.[0];

  return (
    <MatchSelectorCarousel
      profiles={match?.profiles || []}
      goToProfileId={parseInt(goToProfileId, 10)}
      onPick={(profileId) => {
        dispatch(setChosenUserIdState(profileId.toString()));

        router.push(`/main/match/review_match`);
      }}
      onReject={() => {
        router.back();
      }}
      timeout={moment(match?.unlockedAt).add(10, "minutes").toDate()}
    />
  );
}

export default MatchSelectorPage;
