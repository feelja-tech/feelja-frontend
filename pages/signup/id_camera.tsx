import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import Webcam from "react-webcam";
import { withGuidanceTransition } from "../../src/components/Animated";
import { FullScreenCamera } from "../../src/components/FullscreenCamera";
import { Title } from "../../src/components/Typography";
import { usePresignedUploadUrlsQuery } from "../../src/graphql/generated";
import { s3Upload } from "../../src/helpers/api";
import { invertedTheme } from "../../src/helpers/themes";
import { useMicroblink } from "../../src/hooks/useMicroblink";
import { useOnError } from "../../src/hooks/useOnError";
import { usePageLayout } from "../../src/hooks/layout/usePageLayout";
import { LayoutState } from "../../src/redux/slices/layoutSlice.types";

const pageLayout: LayoutState = {
  themeState: invertedTheme,
  disabled: true,
};

export function IdCameraPage(): ReactElement {
  usePageLayout(pageLayout);

  const router = useRouter();

  const webcamRef = React.useRef<Webcam & HTMLVideoElement>(null);

  const { data } = usePresignedUploadUrlsQuery();

  const [guidanceText, image] = useMicroblink(webcamRef);

  const onError = useOnError();

  useEffect(() => {
    if (image) {
      fetch(image).then((rawImage) =>
        rawImage.blob().then((blob) => {
          s3Upload(
            data.currentUser.idFileUploadUrl,
            blob,
            () => {
              router.push("/signup/pose_camera_explaination");
            },
            onError
          );
        })
      );
    }
  }, [image]);

  return (
    <>
      {withGuidanceTransition(
        <Title style={{ textShadow: "0 0 5px grey" }}>{guidanceText}</Title>,
        guidanceText
      )}
      <FullScreenCamera webcamRef={webcamRef} facingMode="environment" />
    </>
  );
}
export default IdCameraPage;
