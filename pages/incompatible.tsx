import { IconExternalLink } from "@tabler/icons";
import React, { ReactElement, useState } from "react";
import { BigIcon } from "../src/components/BigIcon";
import { MainContainer } from "../src/components/Containers";
import { MainButton } from "../src/components/MainButton";
import { TitleDescription } from "../src/components/TitleDescription";
import { usePageLayout } from "../src/hooks/layout/usePageLayout";
import { LayoutState } from "../src/redux/slices/layoutSlice.types";

const pageLayout: LayoutState = {
  disabled: true,
};

export function IncompatiblePage(): ReactElement {
  usePageLayout(pageLayout);

  const [copied, setCopied] = useState(false);

  return (
    <MainContainer
      style={{
        maxWidth: "100%",
        maxHeight: "100%",
      }}
    >
      <BigIcon as={IconExternalLink} />
      <TitleDescription
        title={"Switch to Safari"}
        description={
          "Because of Apple's restrictions on 3rd party browsers, you cannot use our app in Chrome or Firefox."
        }
      />
      {copied ? (
        <MainButton text="Copied!" secondary />
      ) : (
        <MainButton
          text="Copy link to clipboard"
          onClick={() => {
            navigator.clipboard.writeText("https://app.feelja.com").then(() => {
              setCopied(true);
            });
          }}
        />
      )}
    </MainContainer>
  );
}

export default IncompatiblePage;
