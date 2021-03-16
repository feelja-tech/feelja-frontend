import { useState, useEffect } from "react";

export function useIframeDetection(): boolean {
  const [isIframe, setIsIframe] = useState(false);

  useEffect(() => {
    if (typeof window !== undefined) {
      setIsIframe(window !== window.parent);
    }
  }, [typeof window]);

  return isIframe;
}
