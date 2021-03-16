import { IconLockAccess, IconMap } from "@tabler/icons";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BigIcon } from "../../src/components/BigIcon";
import { TitleDescription } from "../../src/components/TitleDescription";
import { SIGNUP_PROGRESS_STEP } from "../../src/helpers/constants";
import { usePageLayout } from "../../src/hooks/layout/usePageLayout";
import { LayoutState } from "../../src/redux/slices/layoutSlice.types";
import { setLocationState } from "../../src/redux/slices/signupFormSlice";

const pageLayout: LayoutState = {
  progressBarState: {
    show: true,
    progress: SIGNUP_PROGRESS_STEP * 5,
  },
};

export function LocationPage(): ReactElement {
  usePageLayout(pageLayout);

  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch(
          setLocationState({
            accuracy: position.coords.accuracy,
            altitude: position.coords.altitude,
            altitudeAccuracy: position.coords.altitudeAccuracy,
            heading: position.coords.heading,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            speed: position.coords.speed,
          })
        );

        router.push("/signup/pose_camera_explaination");
      },
      () => {
        router.push("/signup/pose_camera_explaination");
      }
    );
  }, []);

  return (
    <>
      <BigIcon as={IconMap} />
      <TitleDescription
        title={
          <>
            <IconLockAccess style={{ marginRight: "8px" }} />
            Location
          </>
        }
        description="Enable geolocation to meet people nearby"
      />
    </>
  );
}

export default LocationPage;
