import { IconMoodConfuzed } from "@tabler/icons";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import * as Sentry from "@sentry/react";
import { BigIcon } from "../src/components/BigIcon";
import { TitleDescription } from "../src/components/TitleDescription";
import { usePageLayout } from "../src/hooks/layout/usePageLayout";
import { LayoutState } from "../src/redux/slices/layoutSlice.types";
import { useDispatch } from "react-redux";
import { setPrimaryButtonState } from "../src/redux/slices/layoutSlice";

const pageLayout: LayoutState = {};

const defaultError =
  "Something went wrong, check your connection and try again. If the error persists shoot us a message";

export function ErrorPage(): ReactElement {
  usePageLayout(pageLayout);

  const router = useRouter();
  const { error = defaultError } = router.query;

  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof error === "string" && error !== defaultError)
      Sentry.captureException(new Error(error));
  }, [error]);

  useEffect(() => {
    dispatch(
      setPrimaryButtonState({
        show: true,
        onClickRoute: "/",
        text: "Retry",
      })
    );
  }, []);

  return (
    <>
      <BigIcon as={IconMoodConfuzed} />
      <TitleDescription
        title="Something went wrong"
        description={error.toString()}
      />
    </>
  );
}

export default ErrorPage;
