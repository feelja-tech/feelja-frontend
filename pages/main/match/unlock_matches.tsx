import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import styled from "styled-components";
import { MainContentContainer } from "../../../src/components/Containers";
import { PulsatingDot } from "../../../src/components/PulsatingDot";
import { Description } from "../../../src/components/Typography";
import {
  useMatchesQuery,
  useUnlockMatchMutation,
} from "../../../src/graphql/generated";
import { usePageLayout } from "../../../src/hooks/layout/usePageLayout";
import { LayoutState } from "../../../src/redux/slices/layoutSlice.types";

const UnlockMatchesDescription = styled(Description)`
  color: ${(props) => props.theme.primary};
`;

const pageLayout: LayoutState = {};

export function UnlockMatchesPage(): ReactElement {
  usePageLayout(pageLayout);

  const router = useRouter();

  const { data } = useMatchesQuery();

  const [unlockMatch] = useUnlockMatchMutation();

  return (
    <MainContentContainer
      onClick={() => {
        unlockMatch({
          variables: {
            matchId: data?.currentUser?.matches?.[0]?.id,
          },
        }).then(() => {
          router.push("/main/match/matches_overview");
        });
      }}
    >
      <PulsatingDot />
      <UnlockMatchesDescription>Tap to begin</UnlockMatchesDescription>
    </MainContentContainer>
  );
}

export default UnlockMatchesPage;
