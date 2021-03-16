import { init } from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { useEffect } from "react";

export function useSentry(): void {
  useEffect(() => {
    if (typeof window !== "undefined")
      init({
        dsn:
          "https://58286fbf9f77485ca2d0dd4dce714b02@o517268.ingest.sentry.io/5624831",
        autoSessionTracking: true,
        integrations: [new Integrations.BrowserTracing()],
        tracesSampleRate: 1.0,
        enabled: process.env.NODE_ENV === "production",
      });
  }, [typeof window]);
}
