import React, { ReactElement, useEffect } from "react";

import amplitude from "amplitude-js";

export function AmplitudeLogger(): ReactElement {
  useEffect(() => {
    amplitude.getInstance().init("8878848b7fecd81ceef4fc75c745332b");
  }, []);

  useEffect(() => {
    const pathname = window?.location?.pathname;

    if (pathname) {
      amplitude.getInstance().logEvent(pathname);
    }
  }, [window?.location?.href]);

  return <></>;
}

export default AmplitudeLogger;
