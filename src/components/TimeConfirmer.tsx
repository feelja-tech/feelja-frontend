import React, { ReactElement, useEffect, useState } from "react";
import { For } from "react-loops";
import { parseDate } from "../helpers/date";
import { MainButton } from "./MainButton";

interface TimeConfirmerProps {
  values: string[];
  onChange: (value: string) => void;
}

export function TimeConfirmer(props: TimeConfirmerProps): ReactElement {
  const { onChange, values } = props;

  const [value, setValue] = useState<string>();

  useEffect(() => {
    if (value) onChange(value);
  }, [value]);

  return (
    <For
      of={values}
      as={(v) => {
        return (
          <MainButton
            onClick={() => {
              setValue(v);
            }}
            style={{
              margin: "5px",
            }}
          >
            {parseDate(new Date(v))}
          </MainButton>
        );
      }}
    />
  );
}

export default TimeConfirmer;
