import React, { ReactElement, useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { parsePhoneNumber, CountryCode } from "libphonenumber-js";

function isPhoneValid(number: string, country: CountryCode) {
  try {
    return parsePhoneNumber(`+${number}`, country).isValid();
  } catch (e) {
    return false;
  }
}

interface PhoneNumberInputProps {
  onValidPhone: (phone: string) => void;
  onInvalidPhone: () => void;
}

export function PhoneNumberInput(props: PhoneNumberInputProps): ReactElement {
  const { onValidPhone, onInvalidPhone } = props;

  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (isValid) onValidPhone(value);
    else onInvalidPhone();
  }, [isValid, value]);

  return (
    <PhoneInput
      country="us"
      regions={["north-america", "europe"]}
      value={value}
      inputStyle={{
        width: "100%",
      }}
      onChange={(phone) => setValue(phone)}
      containerStyle={{ width: "80%" }}
      specialLabel=""
      isValid={(val, { iso2 }: { iso2: string }) => {
        const res = isPhoneValid(val, iso2?.toUpperCase() as CountryCode);
        setIsValid(res);
        return res;
      }}
    />
  );
}

export default PhoneNumberInput;
