// import firebase from "firebase/app";
import { useEffect, useState } from "react";
// import "firebase/messaging";
import { apiUrl } from "../helpers/environment";

const vapidKey =
  "BAzujOjJoi5iDR8IUtuUX_0xxvowfVE1Dw1ItonWnbGa8pr-PTOBgwlwHtTZbK0OsdeKFLrkk7dnruMK0oEQKVc";

const firebaseConfig = {
  apiKey: "AIzaSyCK4Pr-mY_GVHL8s8ZYMBgaHoutqCqWgZU",
  authDomain: "nudge-3d7f1.firebaseapp.com",
  databaseURL: "https://nudge-3d7f1.firebaseio.com",
  projectId: "nudge-3d7f1",
  storageBucket: "nudge-3d7f1.appspot.com",
  messagingSenderId: "1091329679626",
  appId: "1:1091329679626:web:4ea0a559ceab5bb41e1af3",
  measurementId: "G-S8NXXTPSL7",
};

// firebase.initializeApp(firebaseConfig);

function updateFcmToken(
  messaging: any, // firebase.messaging.Messaging,
  accessToken: string,
  url: string
) {
  navigator.serviceWorker
    .getRegistration()
    .then((serviceWorkerRegistration) => {
      messaging
        .getToken({
          vapidKey,
          serviceWorkerRegistration,
        })
        .then((currentToken) => {
          if (currentToken) {
            fetch(url, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ fcm_token: currentToken }),
            })
              .then(console.log)
              .catch(console.error);
          } else {
            console.error("No permissions");
            // Show permission UI.
          }
        })
        .catch((err) => {
          console.log("An error occurred while retrieving token. ", err);
        });
    })
    .catch(console.error);
}

export function useNotification(
  permission: boolean,
  accessToken: string,
  handleFcmNotification: (payload) => void
): void {
  useEffect(() => {
    if (permission && accessToken && handleFcmNotification) {
      const messaging = {} as any; // firebase.messaging();

      messaging.onMessage(handleFcmNotification);

      updateFcmToken(messaging, accessToken, `${apiUrl}/fcm_token`);
    }
  }, [permission, accessToken, handleFcmNotification]);
}

export function useNotificationPermission(): boolean {
  const [result, setResult] = useState(false);

  useEffect(() => {
    if (typeof window !== undefined)
      Notification.requestPermission()
        .then((permission) => {
          setResult(permission === "granted");
        })
        .catch(console.error);
  }, []);

  return result;
}
