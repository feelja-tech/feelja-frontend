import * as Bowser from "bowser";
import { useEffect, useState } from "react";

export function useBrowserCompatibility(): boolean {
  const [isCompatible, setIsCompatible] = useState(null);

  useEffect(() => {
    if (typeof window !== undefined) {
      const parsedUA = Bowser.parse(window.navigator.userAgent);

      const isIos = parsedUA.os.name === "iOS";

      const isSafari = parsedUA.browser.name.includes("Safari");

      const isMobile = parsedUA.platform.type !== "desktop";

      setIsCompatible(isMobile && (isIos ? isSafari : true));
    }
  }, [typeof window]);

  return isCompatible;
}

export default useBrowserCompatibility;
