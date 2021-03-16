import React, {
  PropsWithChildren,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { useCookie } from "react-use";

import styled from "styled-components";
import { apiUrl } from "../helpers/environment";
import { ButtonText } from "./Typography";

const SocialButtonComponent = styled.button<{ color: string }>`
  width: 80%;
  height: 58px;
  margin: 7px 28px 7px;
  text-decoration: none;
  cursor: pointer;

  border-radius: 8px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  border: 2px ${(props) => props.color} solid;
  background: ${(props) => props.color};

  display: flex;
  justify-content: center;
  align-items: center;
`;

interface SocialButtonProps {
  endpoint: string;
  clientId: string;
  current: string;
  permissions: string;
  nextStep: string;
  color: string;
}

export function SocialButton(
  props: PropsWithChildren<SocialButtonProps>
): ReactElement {
  const {
    color,
    children,
    endpoint,
    clientId,
    current,
    permissions,
    nextStep,
  } = props;

  const redirectUri = `${apiUrl}/oauth/${current}`;

  const [state, setState] = useState({
    jwt: null,
    next_step: nextStep,
    iframe: false,
  });

  const [jwt] = useCookie("feelja_user");

  useEffect(() => {
    if (jwt)
      setState((prev) => {
        return { ...prev, jwt };
      });
  }, [jwt]);

  useEffect(() => {
    if (typeof window !== undefined) {
      const isIframe = window !== window.parent;

      setState((prev) => {
        return { ...prev, iframe: isIframe };
      });
    }
  }, [typeof window]);

  const url = `https://${endpoint}?client_id=${encodeURIComponent(
    clientId
  )}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(
    permissions
  )}&response_type=code&state=${encodeURIComponent(
    JSON.stringify(state)
  )}&access_type=offline`;

  return (
    state && (
      <SocialButtonComponent
        color={color}
        onClick={() => {
          if (state.iframe) window.open(url);
          else window.location.href = url;
        }}
      >
        {children}
        <ButtonText style={{ marginRight: "10px" }}>Connect</ButtonText>
      </SocialButtonComponent>
    )
  );
}

export default SocialButton;
