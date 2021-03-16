import { useRouter } from "next/router";
import { ReactElement } from "react";
import { useCurrentRouteResolver } from "../hooks/useCurrentRouteResolver";

export function GlobalNetworkingProvider(props: {
  children: ReactElement;
}): ReactElement {
  const { children } = props;

  const router = useRouter();

  const disabled =
    router.pathname.includes("signup") || router.pathname.includes("too_bad");

  useCurrentRouteResolver(disabled);

  return children;
}

export default GlobalNetworkingProvider;
