import React, { ReactElement, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { BaseContainer } from "../../src/components/Containers";
import { ScrollingInput } from "../../src/components/ScrollingInput";
import { Title } from "../../src/components/Typography";
import { SIGNUP_PROGRESS_STEP } from "../../src/helpers/constants";
import { usePageLayout } from "../../src/hooks/layout/usePageLayout";
import { useTimeoutAction } from "../../src/hooks/layout/useTimeoutAction";
import { LayoutState } from "../../src/redux/slices/layoutSlice.types";
import { setEducationSubjectState } from "../../src/redux/slices/signupFormSlice";

// const levels = ["Undergrad", "Bachelor", "Master", "Doctor", "PostDoc"];
const subjects = [
  "Business",
  "Economics",
  "Life sciences",
  "Arts & humanities",
  "Engineering",
  "Physical sciences",
  "Social sciences",
  "Computer science",
  "Education",
  "Law",
  "Healthcare",
  "Psychology",
].sort();

const EducationContainer = styled(BaseContainer)`
  flex-direction: row;
  align-items: center;
`;

const pageLayout: LayoutState = {
  primaryButtonState: {
    text: "Next",
    show: true,
    onClickRoute: "/signup/job",
  },
  progressBarState: {
    show: true,
    progress: SIGNUP_PROGRESS_STEP * 5,
  },
};

export function EducationPage(): ReactElement {
  usePageLayout(pageLayout);

  const dispatch = useDispatch();

  const [educationSubject, setEducationSubject] = useState<string>();

  useTimeoutAction((val) => {
    dispatch(setEducationSubjectState(val));
  }, educationSubject);

  return (
    <>
      <Title>Education</Title>
      <EducationContainer>
        <ScrollingInput
          values={["Other", ...subjects]}
          onChange={(val) => {
            setEducationSubject(val);
          }}
        />
      </EducationContainer>
    </>
  );
}

export default EducationPage;
