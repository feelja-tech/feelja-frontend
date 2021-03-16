import React, { ReactElement, useEffect, useState } from "react";
import { ScrollingInput } from "./ScrollingInput";
import { Title } from "./Typography";

interface MultiChoiceProps {
  title: string;
  options: string[];
  onChange: (value: string) => void;
}

export function MultiChoicePage(props: MultiChoiceProps): ReactElement {
  const { options, title, onChange } = props;

  const initValue = options[0];

  const [value, setValue] = useState<string>(initValue);

  useEffect(() => {
    if (value) onChange(value.toLowerCase());
  }, [value]);

  return (
    <>
      <Title>{title}</Title>
      <ScrollingInput
        values={options}
        onChange={(val) => {
          setValue(val);
        }}
        scrollToIdx={1}
      />
    </>
  );
}

export default MultiChoicePage;
