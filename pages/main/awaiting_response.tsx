import React, { ReactElement, useEffect, useState } from "react";
import { MainContentContainer } from "../../src/components/Containers";
import { LoadingProvider } from "../../src/components/LoadingProvider";
import { PulsatingDot } from "../../src/components/PulsatingDot";
import { ResponsiveImage } from "../../src/components/ResponsiveImage";
import { TitleDescription } from "../../src/components/TitleDescription";
import { useOtherProfileQuery } from "../../src/graphql/generated";
import { genderToPronoun } from "../../src/helpers/genderToPronoun";
import { usePageLayout } from "../../src/hooks/layout/usePageLayout";
import { LayoutState } from "../../src/redux/slices/layoutSlice.types";

const pageLayout: LayoutState = {
  headerButtonState: {
    show: true,
  },
  secondaryButtonState: {
    show: true,
    text: "More information",
    onClickRoute: "/main/how_it_works/0",
  },
};

export function AwaitingResponsePage(): ReactElement {
  usePageLayout(pageLayout);

  const { data } = useOtherProfileQuery();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const currentUser = data?.currentUser;

    if (currentUser) {
      setProfile(
        currentUser?.meetings?.[0]?.profiles?.[0] ||
          currentUser?.videoCalls?.[0]?.profiles?.[0] ||
          currentUser?.matches?.[0]?.profiles?.[0]
      );
    }
  }, [data]);

  return (
    <LoadingProvider data={data}>
      <TitleDescription
        title={`Waiting for ${genderToPronoun(profile?.gender)}`}
        description={`We are waiting for ${profile?.name} to follow up the next step to take`}
      />
      <MainContentContainer>
        <PulsatingDot>
          <ResponsiveImage src={profile?.propicFileDownloadUrl} round />
        </PulsatingDot>
      </MainContentContainer>
    </LoadingProvider>
  );
}

export default AwaitingResponsePage;
