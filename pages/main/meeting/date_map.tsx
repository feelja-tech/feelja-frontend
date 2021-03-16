import "mapbox-gl/dist/mapbox-gl.css";
import React, { ReactElement, useEffect, useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { InteractiveMapProps } from "react-map-gl/src/components/interactive-map";
import { useDispatch } from "react-redux";
import { LoadingProvider } from "../../../src/components/LoadingProvider";
import SvgMarker from "../../../src/components/svg/Marker";
import { TitleDescription } from "../../../src/components/TitleDescription";
import { useMeetingsQuery } from "../../../src/graphql/generated";
import { parseDate } from "../../../src/helpers/date";
import { getGoogleMapsUrl } from "../../../src/helpers/ical";
import { colors } from "../../../src/helpers/themes";
import { usePageLayout } from "../../../src/hooks/layout/usePageLayout";
import { setSecondaryButtonState } from "../../../src/redux/slices/layoutSlice";
import { LayoutState } from "../../../src/redux/slices/layoutSlice.types";

const mapboxApiAccessToken = process.env.NEXT_PUBLIC_MAPBOX_LICENSE;

const pageLayout: LayoutState = {
  headerButtonState: {
    show: true,
  },
};

export function DateMapPage(): ReactElement {
  usePageLayout(pageLayout);

  const dispatch = useDispatch();

  const { data } = useMeetingsQuery();

  const meeting = data?.currentUser.meetings[0];

  const [viewport, setViewPort] = useState<InteractiveMapProps>();

  useEffect(() => {
    if (meeting) {
      setViewPort({
        width: "100%",
        height: "100%",
        zoom: 13,
        pitch: 60,
        bearing: -60,
        latitude: meeting?.location.latitude,
        longitude: meeting?.location.longitude,
      });

      dispatch(
        setSecondaryButtonState({
          show: true,
          text: "Get directions",
          onClickRoute: getGoogleMapsUrl({
            lat: meeting?.location.latitude,
            lon: meeting?.location.longitude,
          }),
        })
      );
    }
  }, [meeting]);

  return (
    <LoadingProvider data={data}>
      <TitleDescription
        title="Meet Karen"
        description={`You're meeting ${meeting?.profiles?.[0]?.name} at ${
          meeting?.location.name
        } on ${parseDate(meeting?.happensAt)}. Make sure to be on time!`}
      />
      {viewport && meeting && (
        <ReactMapGL
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...viewport}
          width="90%"
          height="80%"
          style={{
            marginTop: "50px",
          }}
          onViewportChange={(v) => {
            setViewPort(v);
          }}
          mapboxApiAccessToken={mapboxApiAccessToken}
        >
          <Marker
            latitude={meeting?.location.latitude}
            longitude={meeting?.location.longitude}
            offsetLeft={-13.5}
            offsetTop={-18}
          >
            <SvgMarker style={{ height: "45px", fill: colors.primary }} />
          </Marker>
        </ReactMapGL>
      )}
    </LoadingProvider>
  );
}

export default DateMapPage;
