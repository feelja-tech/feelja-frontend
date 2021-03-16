import {
  CurrentUserProfileDocument,
  CurrentUserQuery,
  MatchesDocument,
  MatchesQuery,
  MeetingsDocument,
  MeetingsQuery,
  OtherProfileDocument,
  OtherProfileQuery,
  PresignedUploadUrlsDocument,
  Profile,
  VideoCallsDocument,
  VideoCallsQuery,
} from "../src/graphql/generated";
import { girl } from "./images/girl";
import { guy } from "./images/guy";
import { place } from "./images/place";
import { girl1 } from "./images/girl1";

const traits = [
  {
    name: "curious",
    type: "personality",
    description: "Has a deep perspective on everything in life",
  },
  {
    name: "adventurous",
    type: "personality",
    description: "Loves to take on new challenges with uncertain outcome",
  },
  {
    name: "instagram",
    type: "social",
    description: ["#styleinspo", "#puppylove", "#clubmate"],
  },
  {
    name: "spotify",
    type: "social",
    description: ["Garage rock", "Techno", "Instrumental"],
  },
  {
    name: "helpful",
    type: "personality",
    description: "Likes to help without asking anything in return ",
  },
  {
    name: "linkedin",
    type: "social",
    description: ["Works in IT", "STEM major"],
  },
];

const fakeGuy1: Profile = {
  __typename: "Profile",
  id: "3",
  age: 31,
  description: traits,
  educationLevel: "PhD",
  educationSubject: "Chemistry",
  employment: "Old guy",
  height: 183,
  politicPreferences: ["Liberal"],
  name: "Guy",
  propicFileDownloadUrl: guy,
  religiousPreferences: ["Christian"],
  datingPreferences: ["Relationships"],
  gender: "male",
  score: 1,
  socialAccounts: [],
};

const fakeGuy2: Profile = {
  __typename: "Profile",
  id: "2",
  age: 25,
  description: traits,
  educationLevel: "PhD",
  educationSubject: "Chemistry",
  employment: "Old guy",
  height: 183,
  politicPreferences: ["Liberal"],
  name: "Alexandra",
  propicFileDownloadUrl: girl1,
  religiousPreferences: ["Jewish"],
  datingPreferences: ["Relationships"],
  gender: "female",
  score: 1,
  socialAccounts: ["spotify", "youtube", "linkedin"],
};

const fakeGirl1: Profile = {
  __typename: "Profile",
  id: "1",
  age: 23,
  description: traits,
  educationLevel: "PhD",
  educationSubject: "Gender studies",
  employment: "Bum",
  height: 178,
  politicPreferences: ["Apolitical"],
  name: "Jasmin",
  propicFileDownloadUrl: girl,
  religiousPreferences: ["Jewish"],
  datingPreferences: ["Relationships"],
  gender: "female",
  score: 1,
  socialAccounts: ["linkedin"],
};

export const mocks = [
  {
    request: {
      query: CurrentUserProfileDocument,
    },
    result: {
      data: {
        currentUser: {
          id: "1",
          state: "WAITING_MATCH",
          profile: fakeGuy1,
          videoCalls: [],
          meetings: [],
        },
      } as CurrentUserQuery,
    },
  },
  {
    request: {
      query: MatchesDocument,
    },
    result: {
      data: {
        currentUser: {
          id: "1",
          matches: [
            {
              id: "1",
              unlockedAt: new Date(Date.now()),
              availabilities: null,
              profiles: [fakeGuy2, fakeGuy1, fakeGirl1],
            },
          ],
        },
      } as MatchesQuery,
    },
  },
  {
    request: {
      query: PresignedUploadUrlsDocument,
    },
    result: {
      data: {
        currentUser: {
          id: "1",
          faceFileUploadUrl: "",
          idFileUploadUrl: "",
          propicFileUploadUrl: "",
        },
      },
    },
  },
  {
    request: {
      query: VideoCallsDocument,
    },
    result: {
      data: {
        currentUser: {
          id: "1",
          profile: {
            propicFileDownloadUrl: fakeGuy1.propicFileDownloadUrl,
          },
          videoCalls: [
            {
              id: "1",
              // Get one at https://www.twilio.com/console/video/project/testing-tools
              accessToken:
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzAzMDc3MTQ2MmUwMDBlNzBlYjk0ZWJiNTRhNDI5MjBmLTE2MTMxMjY5NjciLCJpc3MiOiJTSzAzMDc3MTQ2MmUwMDBlNzBlYjk0ZWJiNTRhNDI5MjBmIiwic3ViIjoiQUM0ZDI1MzgzNjk5YzRkYTM0YjQ2NjRiNzgyNDE5NDk2YiIsImV4cCI6MTYxMzEzMDU2NywiZ3JhbnRzIjp7ImlkZW50aXR5IjoiMSIsInZpZGVvIjp7InJvb20iOiIxIn19fQ.xWJxEu_wOft-7nMsNQtwxSyWva--LJTyXvwzgsrRuaE",
              profiles: [fakeGirl1],
              happensAt: new Date(Date.now()),
              availabilities: [],
              initiator: true,
            },
          ],
        },
      } as VideoCallsQuery,
    },
  },
  {
    request: {
      query: MeetingsDocument,
    },
    result: {
      data: {
        currentUser: {
          id: "1",
          meetings: [
            {
              id: "1",
              location: {
                name: "East Side Gallery",
                latitude: 52.5054009,
                longitude: 13.4319826,
                image: place,
              },
              happensAt: new Date(Date.now()),
              profiles: [fakeGirl1],
            },
          ],
        },
      } as MeetingsQuery,
    },
  },
  {
    request: {
      query: OtherProfileDocument,
    },
    result: {
      data: {
        currentUser: {
          id: "1",
          matches: [],
          meetings: [],
          videoCalls: [
            {
              id: "1",
              profiles: [fakeGirl1],
            },
          ],
        },
      } as OtherProfileQuery,
    },
  },
];

export default mocks;
