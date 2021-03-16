import React, { ReactElement, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { IconDeviceMobile } from "@tabler/icons";
import { setPrimaryButtonState } from "../../src/redux/slices/layoutSlice";
import { PhoneNumberInput } from "../../src/components/PhoneNumberInput";
import { setPhoneNumberState } from "../../src/redux/slices/appSlice";
import { BigIcon } from "../../src/components/BigIcon";
import { TitleDescription } from "../../src/components/TitleDescription";
import { LayoutState } from "../../src/redux/slices/layoutSlice.types";
import { usePageLayout } from "../../src/hooks/layout/usePageLayout";

const pageLayout: LayoutState = {};

export function PhonePage(): ReactElement {
  usePageLayout(pageLayout);

  const [value, setValue] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPhoneNumberState(value));

    if (value) {
      dispatch(
        setPrimaryButtonState({
          text: "Next",
          show: true,
          onClickRoute: "/signup/phone_confirmation",
        })
      );
    } else {
      dispatch(
        setPrimaryButtonState({
          show: false,
        })
      );
    }
  }, [value]);

  return (
    <>
      <BigIcon as={IconDeviceMobile} style={{ transform: "rotate(-30deg)" }} />
      <TitleDescription
        title="Phone number"
        description="You will use it for logging into your account"
      />
      <PhoneNumberInput
        onValidPhone={(phone) => setValue(`+${phone}`)}
        onInvalidPhone={() => {
          setValue(null);
        }}
      />
    </>
  );
}
export default PhonePage;
