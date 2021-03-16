import React, { ReactElement, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ThemeContext } from "styled-components";
import { setPrimaryButtonState } from "../../../src/redux/slices/layoutSlice";
import { TitleDescription } from "../../../src/components/TitleDescription";
import { usePageLayout } from "../../../src/hooks/layout/usePageLayout";
import { LayoutState } from "../../../src/redux/slices/layoutSlice.types";

const pageLayout: LayoutState = {};

export function ReviewDatePage(): ReactElement {
  usePageLayout(pageLayout);

  const [rating, setRating] = useState(3.5);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setPrimaryButtonState({
        text: "Submit",
        show: true,
        onClickRoute: "InitialPageLayout",
      })
    );
  }, [rating]);

  const theme = useContext(ThemeContext);

  return (
    <>
      <TitleDescription
        title="Rate the date"
        description="How was the date, do you have any suggestions etc..."
      />
      {/* <StarRatings
        rating={rating}
        starRatedColor={theme.primary}
        changeRating={setRating}
        starDimension="35px"
        starSpacing="2px"
        numberOfStars={7}
      /> */}
    </>
  );
}

export default ReviewDatePage;
