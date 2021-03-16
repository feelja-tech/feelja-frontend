import React, { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  ResponsiveImage,
  ResponsiveImageContainer,
} from "../../../src/components/ResponsiveImage";
import { TitleDescription } from "../../../src/components/TitleDescription";
import { Profile, useMatchesQuery } from "../../../src/graphql/generated";
import { usePageLayout } from "../../../src/hooks/layout/usePageLayout";
import { RootState } from "../../../src/redux/rootReducer";
import { LayoutState } from "../../../src/redux/slices/layoutSlice.types";

const pageLayout: LayoutState = {
  primaryButtonState: {
    show: true,
    onClickRoute: "/main/time_picker",
    text: "Next",
  },
};

export function ReviewMatchPage(): ReactElement {
  usePageLayout(pageLayout);

  const [pickedProfile, setPickedProfile] = useState<Profile>();

  const { chosenUserId } = useSelector((state: RootState) => state.app);

  const { data } = useMatchesQuery();

  const profiles = data?.currentUser.matches[0].profiles;

  useEffect(() => {
    if (chosenUserId && profiles)
      setPickedProfile(profiles.find((p) => p.id === chosenUserId));
  }, [chosenUserId, profiles]);

  return (
    <>
      <ResponsiveImageContainer
        style={{
          display: "block",
          width: "55%",
          padding: "8px 0",
        }}
      >
        {pickedProfile && (
          <ResponsiveImage round src={pickedProfile?.propicFileDownloadUrl} />
        )}
      </ResponsiveImageContainer>
      <TitleDescription
        title={`Set up a call with ${pickedProfile?.name}`}
        description="Pick up to 3 times when you can meet. Ideally as soon as possible!"
      />
    </>
  );
}

export default ReviewMatchPage;
