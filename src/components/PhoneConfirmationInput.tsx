import React, { ReactElement, useEffect, useState } from "react";
import ReactInputVerificationCode from "react-input-verification-code";

interface PhoneConfirmationInputProps {
  onValidCode: (code: string) => void;
}

const SECRET_LENGTH = 5;

export function PhoneConfirmationInput(
  props: PhoneConfirmationInputProps
): ReactElement {
  const { onValidCode } = props;

  const [value, setValue] = useState("");

  useEffect(() => {
    if (value.split("").filter((x) => x !== "-").length === SECRET_LENGTH) {
      onValidCode(value);
    }
  }, [value]);

  return (
    <ReactInputVerificationCode
      onChange={setValue}
      length={SECRET_LENGTH}
      placeholder="-"
    />
  );
}

export default PhoneConfirmationInput;
