import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BigIcon } from "../../src/components/BigIcon";
import Mushroom from "../../src/components/svg/Mushroom";
import { TitleDescription } from "../../src/components/TitleDescription";
import { Description } from "../../src/components/Typography";
import { useUpdateProfileMutation } from "../../src/graphql/generated";
import { SIGNUP_PROGRESS_STEP } from "../../src/helpers/constants";
import { colors } from "../../src/helpers/themes";
import { usePageLayout } from "../../src/hooks/layout/usePageLayout";
import { RootState } from "../../src/redux/rootReducer";
import { setPrimaryButtonState } from "../../src/redux/slices/layoutSlice";
import { LayoutState } from "../../src/redux/slices/layoutSlice.types";

const pageLayout: LayoutState = {
  progressBarState: {
    show: true,
    progress: SIGNUP_PROGRESS_STEP * 9,
  },
};

export function SocialExplainationPage(): ReactElement {
  usePageLayout(pageLayout);

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(
        setPrimaryButtonState({
          text: "Sounds good",
          show: true,
          onClickRoute: "/signup/youtube",
        })
      );
    }, 800);
  }, []);

  const signupForm = useSelector((state: RootState) => state.signupForm);

  const [updateProfile] = useUpdateProfileMutation();

  useEffect(() => {
    if (signupForm) {
      updateProfile({
        variables: {
          ...signupForm,
          location: signupForm.location
            ? JSON.stringify(signupForm.location)
            : null,
        },
      });
    }
  }, [signupForm]);

  return (
    <>
      <BigIcon as={Mushroom} style={{ fill: colors.primary }} />
      <TitleDescription
        title="Level up!"
        description="Profiles with linked social media accounts can get up to 4x more and 60% better matches"
      >
        <Description
          style={{ margin: "10px auto", textAlign: "left", fontWeight: 600 }}
        >
          All data will be anonymized and invibile to other users!
        </Description>
      </TitleDescription>
    </>
  );
}
export default SocialExplainationPage;
