import ical from "ical-generator";
import moment from "moment";

export function createVideoCallEventUrl(
  profileName: string,
  callingTime: Date
): string {
  return ical({
    domain: "app.feelja.com",
    events: [
      {
        attendees: [
          {
            email: "contact@feelja.com",
            name: profileName,
          },
        ],
        alarms: [
          { type: "display", trigger: 600 },
          { type: "audio", trigger: 300 },
        ],
        status: "CONFIRMED",
        busystatus: "BUSY",
        location: "https://app.feelja.com",
        url: "https://app.feelja.com",
        start: callingTime,
        end: moment(callingTime).add(10, "minutes"),
        summary: `Video call with ${profileName}`,
        organizer: "Feelja <contact@feelja.com>",
        description: `You'll be having a quick chat with ${profileName}. Make sure you'll be on time!`,
      },
    ],
  }).toURL();
}

export function getGoogleMapsUrl(geo: { lat: number; lon: number }): string {
  const { lat, lon } = geo;

  return `http://maps.google.com/maps?daddr=${lat},${lon}`;
}

export function createMeetingEventUrl(
  profileName: string,
  meetingTime: Date,
  location: any
): string {
  return ical({
    domain: "app.feelja.com",
    events: [
      {
        attendees: [
          {
            email: "contact@feelja.com",
            name: profileName,
          },
        ],
        alarms: [
          { type: "display", trigger: 600 },
          { type: "audio", trigger: 300 },
        ],
        status: "CONFIRMED",
        busystatus: "BUSY",
        geo: {
          lat: location.latitude,
          lon: location.longitude,
        },
        location: getGoogleMapsUrl({
          lat: location.latitude,
          lon: location.longitude,
        }),

        url: "https://app.feelja.com",
        start: meetingTime,
        end: moment(meetingTime).add(1, "hours"),
        summary: `Meeting with ${profileName}`,
        organizer: "Feelja <contact@feelja.com>",
        description: `You're meeting ${profileName} at ${location.name}. Make sure you'll be on time!`,
      },
    ],
  }).toURL();
}
