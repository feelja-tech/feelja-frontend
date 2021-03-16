import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { withGuidanceTransition } from "../../src/components/Animated";
import { LoadingProvider } from "../../src/components/LoadingProvider";
import { Title } from "../../src/components/Typography";
import { usePresignedUploadUrlsQuery } from "../../src/graphql/generated";
import { s3Upload } from "../../src/helpers/api";
import { invertedTheme } from "../../src/helpers/themes";
import { usePageLayout } from "../../src/hooks/layout/usePageLayout";
import { useFaceApiPreload } from "../../src/hooks/useFaceApiPreload";
import { useOnError } from "../../src/hooks/useOnError";
import { RootState } from "../../src/redux/rootReducer";
import { LayoutState } from "../../src/redux/slices/layoutSlice.types";

const PoseCamera = dynamic(() => import("../../src/components/PoseCamera"), {
  ssr: false,
});

const pageLayout: LayoutState = {
  themeState: invertedTheme,
  disabled: true,
};

export function PoseCameraPage(): ReactElement {
  usePageLayout(pageLayout);

  const [recordedBlob, setRecordedBlob] = useState<Blob>();
  const [guidanceText, setGuidanceText] = useState("Get ready");

  const router = useRouter();

  const { data } = usePresignedUploadUrlsQuery();

  const onError = useOnError();

  useEffect(() => {
    if (recordedBlob) {
      s3Upload(
        data.currentUser.faceFileUploadUrl,
        recordedBlob,
        () => {
          router.push("/signup/select_picture");
        },
        onError
      );
    }
  }, [recordedBlob]);

  const { faceApiLoaded } = useSelector((state: RootState) => state.app);

  useFaceApiPreload();

  return (
    <LoadingProvider data={faceApiLoaded}>
      {withGuidanceTransition(
        <Title style={{ textShadow: "0 0 5px grey" }}>{guidanceText}</Title>,
        guidanceText
      )}
      <PoseCamera
        onGuidanceTextChange={(text) => {
          setGuidanceText(text);
        }}
        onFinished={(blob) => {
          setRecordedBlob(blob);
        }}
      />
    </LoadingProvider>
  );
}

export default PoseCameraPage;
