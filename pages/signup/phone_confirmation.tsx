import { IconMessageDots } from "@tabler/icons";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { BigIcon } from "../../src/components/BigIcon";
import { TitleDescription } from "../../src/components/TitleDescription";
import { apiPost } from "../../src/helpers/api";
import { useOnError } from "../../src/hooks/useOnError";
import { usePageLayout } from "../../src/hooks/layout/usePageLayout";
import { RootState } from "../../src/redux/rootReducer";
import { LayoutState } from "../../src/redux/slices/layoutSlice.types";

const pageLayout: LayoutState = {};

const PhoneConfirmationInput = dynamic(
  () => import("../../src/components/PhoneConfirmationInput"),
  {
    ssr: false,
  }
);

export function PhoneConfirmationPage(): ReactElement {
  usePageLayout(pageLayout);

  const dispatch = useDispatch();

  const [value, setValue] = useState(null);
  const { phoneNumber } = useSelector((state: RootState) => state.app);
  const [phoneSaved, setPhoneSaved] = useState(false);

  const onError = useOnError();

  const router = useRouter();

  // Create user
  useEffect(() => {
    if (phoneNumber)
      apiPost(
        "/login",
        {
          phone_number: phoneNumber,
        },
        () => setPhoneSaved(true),
        onError
      );
  }, [phoneNumber]);

  // Check confirmation code
  useEffect(() => {
    if (value && phoneSaved) {
      apiPost(
        "/login_2fa",
        {
          phone_number: phoneNumber,
          sms_code: value,
        },
        (res) => {
          if (res.data.success) {
            router.push("/");
          }
        },
        onError
      );
    }
  }, [value, phoneSaved]);

  return (
    <>
      <BigIcon as={IconMessageDots} />
      <TitleDescription
        title="SMS code"
        description="You should receive this one in seconds"
      />
      <PhoneConfirmationInput
        onValidCode={(code) => {
          setValue(code);
        }}
      />
    </>
  );
}

export default PhoneConfirmationPage;
