import moment from "moment";
import React, { ReactElement, useEffect, useState } from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import styled from "styled-components";

const MAX_DAY_RANGE = 14;
const MAX_TIMES = 3;
const DAY_IN_MS = 1000 * 60 * 60 * 24;

const TimePickerComponent = styled.input`
  width: 35px;
  height: 35px;
  text-decoration: none;
  position: absolute;
  border: none;
  background-color: transparent;
  color: transparent;
`;
interface TimePickerProps {
  onChange: (values: string[]) => void;
}

type Values = Record<string, string>;

function getLastAdded<T>(values: Array<T>): Array<T> {
  return values.slice(Math.max(values.length - MAX_TIMES, 0));
}

export function TimePicker(props: TimePickerProps): ReactElement {
  const { onChange } = props;

  const fromDate = new Date(Date.now());
  const toDate = new Date(Date.now() + DAY_IN_MS * MAX_DAY_RANGE);

  const [values, setValues] = useState<Values>({});

  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setCompleted(Object.keys(values).length === MAX_TIMES);
  }, [values]);

  useEffect(() => {
    if (completed) onChange(getLastAdded(Object.values(values)));
  }, [completed, values]);

  return (
    <>
      <DayPicker
        fromMonth={fromDate}
        toMonth={toDate}
        selectedDays={getLastAdded(Object.keys(values)).map(
          (val) => new Date(Date.parse(val))
        )}
        disabledDays={[
          {
            before: fromDate,
            after: toDate,
          },
        ]}
        renderDay={(day, modifiers) => {
          return (
            <>
              {!modifiers.disabled && (
                <TimePickerComponent
                  type="time"
                  // min="09:00"
                  onChange={(e) => {
                    if (e.target.valueAsNumber)
                      setValues((prev) => {
                        return {
                          ...prev,
                          [day.toString()]: moment(day)
                            .startOf("day")
                            .add(e.target.valueAsNumber, "milliseconds")
                            .toISOString(),
                        };
                      });
                  }}
                />
              )}
              {day.getDate()}
            </>
          );
        }}
      />
    </>
  );
}

export default TimePicker;
