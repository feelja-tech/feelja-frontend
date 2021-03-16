import React, { ReactElement, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNotificationPermission } from "../hooks/useNotifications";
import { RootState } from "../redux/rootReducer";

export function Notifications(): ReactElement {
  const dispatch = useDispatch();
  const permission = useNotificationPermission();

  // const { appUser } = useSelector((state: RootState) => state.app);

  // // For foreground
  // const handleNotification = useCallback((payload) => {
  //   console.log("MESSAGED", payload);

  //   if (payload.data.type === "MATCHED")
  //     dispatch(
  //       setMatchInfoState({
  //         userMatchId: payload.data.user_match_id,
  //       })
  //     );

  //   if (payload.data.type === "DATE_SET")
  //     dispatch(
  //       setMatchInfoState({
  //         matchId: payload.data.match_id,
  //       })
  //     );
  // }, []);

  // useEffect(() => {
  //   if (permission && navigator.serviceWorker?.controller)
  //     navigator.serviceWorker.controller.postMessage({
  //       type: "CONNECT_WS",
  //       jwt: appUser.accessToken,
  //     });
  // }, [permission, navigator.serviceWorker?.controller]);

  // useEffect(() => {
  //   navigator.serviceWorker.addEventListener("message", handleNotification);

  //   return () => {
  //     navigator.serviceWorker.removeEventListener(
  //       "message",
  //       handleNotification
  //     );
  //   };
  // }, [handleNotification]);

  return <></>;
}

export default Notifications;
