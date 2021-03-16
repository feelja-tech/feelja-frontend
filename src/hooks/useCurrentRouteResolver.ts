import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  useCurrentUserLazyQuery,
  useCurrentUserStateSubscription,
} from "../graphql/generated";
import { resolveCurrentUserState } from "../helpers/resolveCurrentUserState";
import { useBrowserCompatibility } from "./useBrowserCompatibility";

export function useCurrentRouteResolver(disabled: boolean): void {
  const router = useRouter();

  const isCompatible = useBrowserCompatibility();

  const [currentUserState, setCurrentUserState] = useState<string>();

  const { data: subscriptionData } = useCurrentUserStateSubscription({
    skip: disabled,
  });

  // Subscribe to state updates
  useEffect(() => {
    if (subscriptionData?.currentUserState)
      setCurrentUserState(subscriptionData.currentUserState);
  }, [subscriptionData]);

  const [executeQuery, { data, called, refetch }] = useCurrentUserLazyQuery();

  // Only run query after userAgent check
  // useEffect(() => {
  //   if (isCompatible === false) router.push("/incompatible");
  //   else if (isCompatible === true && !disabled) executeQuery();
  // }, [isCompatible, disabled]);

  useEffect(() => {
    if (!disabled) executeQuery();
  }, [disabled]);

  // Refetch when subscription updates state
  useEffect(() => {
    if (called && refetch && !disabled && currentUserState) refetch();
  }, [called, refetch, currentUserState, disabled]);

  useEffect(() => {
    if (data?.currentUser?.state && !disabled)
      router.push(resolveCurrentUserState(data?.currentUser));
  }, [data?.currentUser?.state, disabled]);
}

export default useCurrentRouteResolver;
