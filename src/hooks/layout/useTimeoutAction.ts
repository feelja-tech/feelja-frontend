import { useEffect, useState } from "react";

// Delays dispatch so we don't update for every keystroke
export function useTimeoutAction(
  action: (val: any) => void,
  value: any,
  milliseconds = 2000
): void {
  const [previousTimeout, setPreviousTimeout] = useState(null);

  useEffect(() => {
    if (previousTimeout) clearTimeout(previousTimeout);

    const timeout = setTimeout(() => {
      action(value);
    }, milliseconds);

    setPreviousTimeout(timeout);

    return () => {
      if (previousTimeout) clearTimeout(previousTimeout);
    };
  }, [value]);
}

export default useTimeoutAction;
