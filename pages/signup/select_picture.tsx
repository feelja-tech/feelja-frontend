import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { TitleDescription } from "../../src/components/TitleDescription";
import { PictureUploader } from "../../src/components/UploadPicture";
import { SIGNUP_PROGRESS_STEP } from "../../src/helpers/constants";
import { usePageLayout } from "../../src/hooks/layout/usePageLayout";
import { LayoutState } from "../../src/redux/slices/layoutSlice.types";

const pageLayout: LayoutState = {
  progressBarState: {
    show: true,
    progress: SIGNUP_PROGRESS_STEP * 8,
  },
};

export function SelectPicturePage(): ReactElement {
  usePageLayout(pageLayout);

  const [image, setImage] = useState(null);

  const reader = new FileReader();

  const [imageUrl, setImageUrl] = useState(null);

  reader.onload = () => {
    setImage(reader.result);
  };

  const router = useRouter();

  const { action } = router.query;

  useEffect(() => {
    if (imageUrl)
      router.push(
        `/signup/crop_picture?imageUrl=${encodeURIComponent(
          imageUrl
        )}&action=${action}`
      );
  }, [imageUrl]);

  return (
    <>
      <TitleDescription
        title="Profile picture"
        description="Upload a picture of yourself where the face is clearly visible"
      />
      <PictureUploader
        src={image}
        onChange={(event) => {
          if (event.target.files.length > 0)
            setImageUrl(window.URL.createObjectURL(event.target.files[0]));
        }}
      />
    </>
  );
}
export default SelectPicturePage;
