import { useApolloClient } from "@apollo/client";
import "cropperjs/dist/cropper.css";
import { useRouter } from "next/router";
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Cropper from "react-cropper";
import { useDispatch } from "react-redux";
import { usePresignedUploadUrlsQuery } from "../../src/graphql/generated";
import { s3Upload } from "../../src/helpers/api";
import { SIGNUP_PROGRESS_STEP } from "../../src/helpers/constants";
import { usePageLayout } from "../../src/hooks/layout/usePageLayout";
import { useTimeoutAction } from "../../src/hooks/layout/useTimeoutAction";
import { useOnError } from "../../src/hooks/useOnError";
import {
  setPrimaryButtonState,
  setSecondaryButtonState,
} from "../../src/redux/slices/layoutSlice";
import { LayoutState } from "../../src/redux/slices/layoutSlice.types";

const pageLayout: LayoutState = {
  primaryButtonState: {
    show: true,
    text: "Done",
    onClickRoute: "/signup/interactive_audio",
  },
  secondaryButtonState: {
    show: true,
    text: "Cancel",
    onClickRoute: "/signup/select_picture",
  },
  progressBarState: {
    show: true,
    progress: SIGNUP_PROGRESS_STEP * 8,
  },
};

export function CropPicturePage(): ReactElement {
  usePageLayout(pageLayout);

  const router = useRouter();

  const { data } = usePresignedUploadUrlsQuery();

  const { imageUrl, action } = router.query as {
    imageUrl: string;
    action: string;
  };

  const onError = useOnError();

  const client = useApolloClient();

  const [cropped, setCropped] = useState(false);

  const cropperRef = useRef<HTMLImageElement>();

  const cropImage = useCallback(() => {
    if (cropped && data && cropperRef?.current) {
      const url = (cropperRef.current as any).cropper
        .getCroppedCanvas({
          maxHeight: 1920,
          maxWidth: 1920,
        })
        .toDataURL();

      fetch(url).then((res) => {
        res.blob().then((blob) => {
          s3Upload(
            data.currentUser.propicFileUploadUrl,
            blob,
            () => {
              window.URL.revokeObjectURL(imageUrl);

              client.cache.modify({
                fields: {
                  currentUser(_what, details) {
                    return details.DELETE;
                  },
                },
              });
            },
            onError
          );
        });
      });
    }
  }, [cropped, data, !cropperRef?.current]);

  useTimeoutAction(
    (crop) => {
      crop();
    },
    cropImage,
    5000
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (action === "change") {
      dispatch(
        setPrimaryButtonState({
          show: true,
          text: "Done",
          onClickRoute: "/",
        })
      );

      dispatch(
        setSecondaryButtonState({
          show: true,
          text: "Cancel",
          onClickRoute: "/signup/select_picture?action=change",
        })
      );
    }
  }, [action]);

  return (
    <Cropper
      src={imageUrl as string}
      // @ts-ignore
      initialAspectRatio={1}
      ratio
      viewMode={2}
      minCropBoxWidth={100}
      minCropBoxHeight={100}
      toggleDragModeOnDblclick={false}
      movable={false}
      ref={cropperRef}
      crop={() => {
        setCropped(true);
      }}
      checkOrientation={false}
      autoCrop
    />
  );
}

export default CropPicturePage;
