import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { MainContentContainer } from "../src/components/Containers";
import SvgLoading from "../src/components/svg/SvgLoading";
import { useCurrentUserQuery } from "../src/graphql/generated";
import { resolveCurrentUserState } from "../src/helpers/resolveCurrentUserState";

function IndexPage(): ReactElement {
  const { data } = useCurrentUserQuery();

  const router = useRouter();

  useEffect(() => {
    if (data?.currentUser?.state)
      router.push(resolveCurrentUserState(data?.currentUser));
  }, [data?.currentUser?.state]);

  return (
    <MainContentContainer>
      <SvgLoading style={{ transform: "scale(2)" }} />
    </MainContentContainer>
  );
}

export default IndexPage;
