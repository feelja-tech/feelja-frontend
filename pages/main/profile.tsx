import React, { ReactElement, useEffect } from "react";
import { useDispatch } from "react-redux";
import { LoadingProvider } from "../../src/components/LoadingProvider";
import { ProfileCard } from "../../src/components/MatchProfile";
import { useCurrentUserProfileQuery } from "../../src/graphql/generated";
import { usePageLayout } from "../../src/hooks/layout/usePageLayout";
import { setSecondaryButtonState } from "../../src/redux/slices/layoutSlice";
import { LayoutState } from "../../src/redux/slices/layoutSlice.types";

const pageLayout: LayoutState = {
  headerButtonState: {
    show: true,
  },
  primaryButtonState: {
    text: "Change picture",
    show: true,
    onClickRoute: "/signup/select_picture?action=change",
  },
  secondaryButtonState: {
    text: "Complete profile",
    show: true,
    onClickRoute: "/signup/youtube",
  },
  backgroundState: {
    color: "whitesmoke",
  },
};

const subject = encodeURIComponent("Profile deletion request #");
const body = encodeURIComponent(
  "Hi, I'd like to delete my profile for the follwoing reasons: "
);

export function ProfilePage(): ReactElement {
  usePageLayout(pageLayout);

  const { data } = useCurrentUserProfileQuery();

  const profile = data?.currentUser?.profile;

  const score = (data?.currentUser?.profile?.socialAccounts?.length + 1) / 4;

  const dispatch = useDispatch();

  useEffect(() => {
    const isComplete = profile?.socialAccounts?.length === 3;

    if (profile && !isComplete)
      dispatch(
        setSecondaryButtonState({
          text: "Complete profile",
          show: true,
          onClickRoute: "/signup/youtube",
        })
      );
    else
      dispatch(
        setSecondaryButtonState({
          text: "Delete profile",
          show: true,
          onClickRoute: `mailto:contact@feelja.com?subject=${subject}${data?.currentUser?.id}&body=${body}`,
        })
      );
  }, [profile]);

  return (
    <LoadingProvider data={data}>
      <ProfileCard profile={{ ...profile, score }} currentUser />
    </LoadingProvider>
  );
}

export default ProfilePage;
