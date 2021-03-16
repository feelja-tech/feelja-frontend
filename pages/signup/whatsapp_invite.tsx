import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import styled from "styled-components";
import {
  BaseContainer,
  MainContentContainer,
} from "../../src/components/Containers";
import { MainButton } from "../../src/components/MainButton";
import SvgLogo from "../../src/components/svg/Logo";
import { Footnote, LogoText } from "../../src/components/Typography";
import { invertedTheme } from "../../src/helpers/themes";
import { usePageLayout } from "../../src/hooks/layout/usePageLayout";
import { LayoutState } from "../../src/redux/slices/layoutSlice.types";

const pageLayout: LayoutState = {
  themeState: invertedTheme,
  disabled: true,
};

const ConsentLink = styled.a`
  color: white;
`;

const LogoContainer = styled(BaseContainer)`
  flex-direction: row;
`;

export function WhatsappInvite(): ReactElement {
  usePageLayout(pageLayout);

  const router = useRouter();

  return (
    <MainContentContainer
      style={{ width: "80%", height: "80%", justifyContent: "space-between" }}
    >
      <LogoContainer>
        <SvgLogo
          style={{
            height: "80px",
            filter: "drop-shadow(0px 0px 2px rgba(255, 255, 255, 0.7))",
          }}
          fill="white"
        />
        <LogoText>Feelja</LogoText>
      </LogoContainer>
      <BaseContainer>
        <Footnote>
          By signing up you agree to Feelja's{" "}
          <ConsentLink href="https://feelja.com/terms" target="blank">
            terms of service
          </ConsentLink>{" "}
          and{" "}
          <ConsentLink href="https://feelja.com/privacy" target="blank">
            privacy policy
          </ConsentLink>
          .
        </Footnote>
        <MainButton
          text="Sign in"
          style={{ marginTop: "10px", boxShadow: "none" }}
          onClick={() => {
            router.push("/signup/phone");
          }}
        />
      </BaseContainer>
    </MainContentContainer>
  );
}

export default WhatsappInvite;
