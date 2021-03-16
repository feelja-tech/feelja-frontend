import React, { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "../helpers/themes";
import { BaseContainer } from "./Containers";

interface CountDownProps {
  until: Date;
  onFinish: () => void;
  fullSize?: boolean;
  onClick?: () => void;
  style?: any;
}

const MS_IN_A_DAY = 86400000;

function secondsLeft(until: Date, now: Date) {
  return (
    Math.floor(
      (until.getTime() - now.getTime()) / (MS_IN_A_DAY / 24 / 60 / 60)
    ) % 60
  )
    .toString()
    .padStart(2, "0");
}

function minutesLeft(until: Date, now: Date) {
  return (
    Math.floor((until.getTime() - now.getTime()) / (MS_IN_A_DAY / 24 / 60)) % 60
  )
    .toString()
    .padStart(2, "0");
}

function hoursLeft(until: Date, now: Date) {
  return (
    Math.floor((until.getTime() - now.getTime()) / (MS_IN_A_DAY / 24)) % 24
  )
    .toString()
    .padStart(2, "0");
}
function daysLeft(until: Date, now: Date) {
  return Math.floor((until.getTime() - now.getTime()) / MS_IN_A_DAY)
    .toString()
    .padStart(2, "0");
}

const CountdownContainer = styled(BaseContainer)`
  padding: 8px 12px 4px 12px;
  background: white;
  border-radius: 8px;
  color: ${colors.primary};
  filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.5));
  font-size: 16px;
  font-weight: 400;
`;

export function Countdown(props: CountDownProps): ReactElement {
  const { until, onFinish, onClick, fullSize = false, style = {} } = props;

  const [now, setNow] = useState<Date>(new Date(Date.now()));

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date(Date.now()));
    }, 1000);

    return () => {
      clearTimeout(interval);
    };
  }, [setNow]);

  useEffect(() => {
    if (until.getTime() <= now.getTime()) {
      onFinish();
    }
  }, [now, until]);

  return (
    <CountdownContainer
      onClick={onClick}
      style={{ ...style, maxWidth: "100px" }}
    >
      {fullSize && `${daysLeft(until, now)}:`}
      {fullSize && `${hoursLeft(until, now)}:`}
      {`${minutesLeft(until, now)}:`}
      {secondsLeft(until, now)}
    </CountdownContainer>
  );
}

export default Countdown;
