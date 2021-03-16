import { TargetAndTransition } from "framer-motion/types/types";
import { MutableRefObject, useEffect, useState } from "react";

export function usePinAnimatedHeight(
  componentRef: MutableRefObject<any>,
  animation: any
): TargetAndTransition {
  const [height, setHeight] = useState(null);

  useEffect(() => {
    if (componentRef.current)
      setHeight(window.getComputedStyle(componentRef.current).height);
  }, [!componentRef.current]);

  return {
    ...animation,
    height,
  };
}

export default usePinAnimatedHeight;
