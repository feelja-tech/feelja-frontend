import { useEffect } from "react";
// import { Plugins } from "@capacitor/core";

export function useCordovaIosRtc(): void {
  useEffect(() => {
    // document.addEventListener("deviceready", () => {
    //   Plugins.Device.getInfo().then((info) => {
    //     if (info.operatingSystem === "ios") {
    //       (window as any).cordova.plugins.iosrtc.registerGlobals();
    //       const adapterVersion = "latest";
    //       const script = document.createElement("script");
    //       script.type = "text/javascript";
    //       script.src = `https://webrtc.github.io/adapter/adapter-${adapterVersion}.js`;
    //       script.async = false;
    //       document.getElementsByTagName("head")[0].appendChild(script);
    //     }
    //   });
    // });
  }, []);
}
