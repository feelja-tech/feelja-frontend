import moment from "moment";
import { useRouter } from "next/router";
import React, { ReactElement, ReactNode } from "react";
import styled from "styled-components";
import { MainContainer } from "../../../src/components/Containers";
import { Countdown } from "../../../src/components/Countdown";
import { ProfilesPreview } from "../../../src/components/ProfilePreview";
import { TitleDescription } from "../../../src/components/TitleDescription";
import { useMatchesQuery } from "../../../src/graphql/generated";
import { usePageLayout } from "../../../src/hooks/layout/usePageLayout";
import { LayoutState } from "../../../src/redux/slices/layoutSlice.types";

const SingleOverviewContainer = styled.div`
  width: 80%;
`;

const MultiOverviewContainer = styled(SingleOverviewContainer)`
  display: grid;
  grid-template: 1fr 1fr / 1fr 1fr;
`;

const pageLayout: LayoutState = {
  disabled: true,
};

function withSingle(children: ReactNode) {
  return (
    <>
      <TitleDescription
        title="Your match"
        description="Someone wants to meet you! Check them out!"
      />
      <SingleOverviewContainer>{children}</SingleOverviewContainer>
    </>
  );
}

function withMulti(children: ReactNode) {
  return (
    <>
      <TitleDescription
        title="Your matches"
        description={
          <>
            We found some awesome people you will surely love. Check them out!
          </>
        }
      />
      <MultiOverviewContainer>{children}</MultiOverviewContainer>
    </>
  );
}

export function MatchesOverviewPage(): ReactElement {
  usePageLayout(pageLayout);

  const { data } = useMatchesQuery();

  const router = useRouter();

  const match = data?.currentUser.matches[0];

  const multiplicity = match?.profiles.length > 1 ? "multi" : "single";

  const profiles = Array.from({
    ...(match?.profiles || []),
    length: multiplicity
      ? {
          single: 1,
          multi: 4,
        }[multiplicity as string]
      : 0,
  });

  return (
    <MainContainer
      style={{ padding: "50px 25px", justifyContent: "space-evenly" }}
    >
      {{
        single: withSingle,
        multi: withMulti,
      }[multiplicity as string](
        <ProfilesPreview
          profiles={profiles}
          onOpen={(profile) => {
            router.push(`/main/match/match_selector?profileId=${profile.id}`);
          }}
        />
      )}
      <Countdown
        until={moment(match?.unlockedAt).add(10, "minutes").toDate()}
        onFinish={() => {
          router.push("/main/too_bad");
        }}
        onClick={() => {
          router.push("/main/reject?eventType=match");
        }}
      />
    </MainContainer>
  );
}

export default MatchesOverviewPage;
