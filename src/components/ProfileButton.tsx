import React, { ReactElement, useState } from "react";
import User from "./svg/User";
import User3 from "./svg/User3";

interface ProfileButtonProps {
  onClick: () => void;
}

export function ProfileButton(props: ProfileButtonProps): ReactElement {
  const { onClick } = props;

  const [clicked, setClicked] = useState(false);

  return clicked ? (
    <User3
      style={{ flexGrow: 1 }}
      onClick={() => {
        setClicked((prev) => !prev);
        onClick();
      }}
    />
  ) : (
    <User
      style={{ flexGrow: 1 }}
      onClick={() => {
        setClicked((prev) => !prev);
        onClick();
      }}
    />
  );
}

export default ProfileButton;
