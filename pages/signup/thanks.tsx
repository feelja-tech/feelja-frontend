import { IconRocket } from "@tabler/icons";
import React, { ReactElement } from "react";
import { BigIcon } from "../../src/components/BigIcon";
import { TitleDescription } from "../../src/components/TitleDescription";
import { useConfetti } from "../../src/hooks/useConfetti";
import { usePageLayout } from "../../src/hooks/layout/usePageLayout";
import { LayoutState } from "../../src/redux/slices/layoutSlice.types";

// function camelToSnakeCase(str: string): string {
//   return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
// }

const pageLayout: LayoutState = {
  primaryButtonState: {
    show: true,
    text: "Next",
    onClickRoute: "/main/initial",
  },
  progressBarState: {
    show: true,
    progress: 100,
  },
};

export function ThanksPage(): ReactElement {
  usePageLayout(pageLayout);

  useConfetti();

  return (
    <>
      <BigIcon as={IconRocket} />
      <TitleDescription
        title="Thanks for being awesome!"
        description="Thank you for using Feelja and becoming a part of the online human revolution."
      />
    </>
  );
}

export default ThanksPage;
