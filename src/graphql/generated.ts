import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `DateTime` scalar type represents a date and time in the UTC
   * timezone. The DateTime appears in a JSON response as an ISO8601 formatted
   * string, including UTC timezone ("Z"). The parsed date and time string will
   * be converted to UTC if there is an offset.
   */
  DateTime: any;
  /**
   * The `Decimal` scalar type represents signed double-precision fractional
   * values parsed by the `Decimal` library.  The Decimal appears in a JSON
   * response as a string to preserve precision.
   */
  Decimal: any;
  /**
   * The `Json` scalar type represents arbitrary json string data, represented as UTF-8
   * character sequences. The Json type is most often used to represent a free-form
   * human-readable json string.
   */
  Json: any;
};

export type CurrentUser = {
  __typename?: "CurrentUser";
  faceFileUploadUrl?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  idFileUploadUrl?: Maybe<Scalars["String"]>;
  matches: Array<Maybe<Match>>;
  meetings: Array<Maybe<Meeting>>;
  profile?: Maybe<Profile>;
  propicFileUploadUrl?: Maybe<Scalars["String"]>;
  state: CurrentUserState;
  videoCalls: Array<Maybe<VideoCall>>;
};

export enum CurrentUserState {
  Banned = "BANNED",
  Disabled = "DISABLED",
  HasMatch = "HAS_MATCH",
  HasMeeting = "HAS_MEETING",
  HasVideoCall = "HAS_VIDEO_CALL",
  InMatch = "IN_MATCH",
  InMeeting = "IN_MEETING",
  InVideoCall = "IN_VIDEO_CALL",
  Incomplete = "INCOMPLETE",
  WaitingMatch = "WAITING_MATCH",
  WaitingMeeting = "WAITING_MEETING",
  WaitingMeetingPlan = "WAITING_MEETING_PLAN",
  WaitingVideoCall = "WAITING_VIDEO_CALL",
}

export type Match = {
  __typename?: "Match";
  availabilities?: Maybe<Array<Maybe<Scalars["DateTime"]>>>;
  id?: Maybe<Scalars["ID"]>;
  initiator?: Maybe<Scalars["Boolean"]>;
  profiles?: Maybe<Array<Maybe<Profile>>>;
  unlockedAt?: Maybe<Scalars["DateTime"]>;
};

export type Meeting = {
  __typename?: "Meeting";
  happensAt?: Maybe<Scalars["DateTime"]>;
  id?: Maybe<Scalars["ID"]>;
  location?: Maybe<Scalars["Json"]>;
  profiles?: Maybe<Array<Maybe<Profile>>>;
};

export type RootMutationType = {
  __typename?: "RootMutationType";
  /** Exclude user from getting more matches */
  disableUser?: Maybe<CurrentUser>;
  /** Accept or reject a match. Set chosen_user_id to nil to reject */
  finalizeMatch?: Maybe<Match>;
  /** Accept or reject a video_call. Set chosen_user_id to nil to reject */
  finalizeVideoCall?: Maybe<VideoCall>;
  /** Unlock matches, start timer */
  unlockMatch?: Maybe<Match>;
  /** Update current user profile */
  updateCurrentProfile?: Maybe<Profile>;
};

export type RootMutationTypeFinalizeMatchArgs = {
  availabilities: Array<Maybe<Scalars["DateTime"]>>;
  chosenUserId?: Maybe<Scalars["ID"]>;
  matchId: Scalars["ID"];
};

export type RootMutationTypeFinalizeVideoCallArgs = {
  availabilities: Array<Maybe<Scalars["DateTime"]>>;
  chosenUserId?: Maybe<Scalars["ID"]>;
  videoCallId: Scalars["ID"];
};

export type RootMutationTypeUnlockMatchArgs = {
  matchId: Scalars["ID"];
};

export type RootMutationTypeUpdateCurrentProfileArgs = {
  age: Scalars["Int"];
  height: Scalars["Int"];
  location?: Maybe<Scalars["Json"]>;
  name: Scalars["String"];
  politicPreferences: Array<Maybe<Scalars["String"]>>;
  religiousPreferences: Array<Maybe<Scalars["String"]>>;
};

export type Profile = {
  __typename?: "Profile";
  age?: Maybe<Scalars["Int"]>;
  datingPreferences?: Maybe<Array<Maybe<Scalars["String"]>>>;
  description?: Maybe<Scalars["Json"]>;
  educationLevel?: Maybe<Scalars["String"]>;
  educationSubject?: Maybe<Scalars["String"]>;
  employment?: Maybe<Scalars["String"]>;
  gender?: Maybe<Scalars["String"]>;
  genderPreferences?: Maybe<Array<Maybe<Scalars["String"]>>>;
  height?: Maybe<Scalars["Int"]>;
  id?: Maybe<Scalars["ID"]>;
  location?: Maybe<Scalars["Json"]>;
  name?: Maybe<Scalars["String"]>;
  politicPreferences?: Maybe<Array<Maybe<Scalars["String"]>>>;
  propicFileDownloadUrl?: Maybe<Scalars["String"]>;
  religiousPreferences?: Maybe<Array<Maybe<Scalars["String"]>>>;
  score?: Maybe<Scalars["Decimal"]>;
  socialAccounts?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type RootQueryType = {
  __typename?: "RootQueryType";
  /** Get logged in user */
  currentUser: CurrentUser;
};

export type RootSubscriptionType = {
  __typename?: "RootSubscriptionType";
  /** Subscribe to user.state updates */
  currentUserState?: Maybe<CurrentUserState>;
};

export type VideoCall = {
  __typename?: "VideoCall";
  accessToken?: Maybe<Scalars["String"]>;
  availabilities?: Maybe<Array<Maybe<Scalars["DateTime"]>>>;
  happensAt?: Maybe<Scalars["DateTime"]>;
  id?: Maybe<Scalars["ID"]>;
  initiator?: Maybe<Scalars["Boolean"]>;
  profiles?: Maybe<Array<Maybe<Profile>>>;
};

export type CompleteProfileFragment = { __typename?: "Profile" } & Pick<
  Profile,
  | "id"
  | "age"
  | "description"
  | "educationSubject"
  | "employment"
  | "height"
  | "politicPreferences"
  | "name"
  | "propicFileDownloadUrl"
  | "religiousPreferences"
  | "datingPreferences"
  | "gender"
  | "socialAccounts"
  | "score"
>;

export type DisableUserMutationVariables = Exact<{ [key: string]: never }>;

export type DisableUserMutation = { __typename?: "RootMutationType" } & {
  disableUser?: Maybe<{ __typename?: "CurrentUser" } & Pick<CurrentUser, "id">>;
};

export type FinalizeMatchMutationVariables = Exact<{
  matchId: Scalars["ID"];
  chosenUserId?: Maybe<Scalars["ID"]>;
  availabilities:
    | Array<Maybe<Scalars["DateTime"]>>
    | Maybe<Scalars["DateTime"]>;
}>;

export type FinalizeMatchMutation = { __typename?: "RootMutationType" } & {
  finalizeMatch?: Maybe<{ __typename?: "Match" } & Pick<Match, "id">>;
};

export type FinalizeVideoCallMutationVariables = Exact<{
  videoCallId: Scalars["ID"];
  chosenUserId?: Maybe<Scalars["ID"]>;
  availabilities:
    | Array<Maybe<Scalars["DateTime"]>>
    | Maybe<Scalars["DateTime"]>;
}>;

export type FinalizeVideoCallMutation = { __typename?: "RootMutationType" } & {
  finalizeVideoCall?: Maybe<
    { __typename?: "VideoCall" } & Pick<VideoCall, "id">
  >;
};

export type UnlockMatchMutationVariables = Exact<{
  matchId: Scalars["ID"];
}>;

export type UnlockMatchMutation = { __typename?: "RootMutationType" } & {
  unlockMatch?: Maybe<
    { __typename?: "Match" } & Pick<Match, "id" | "unlockedAt">
  >;
};

export type UpdateProfileMutationVariables = Exact<{
  height: Scalars["Int"];
  name: Scalars["String"];
  politicPreferences:
    | Array<Maybe<Scalars["String"]>>
    | Maybe<Scalars["String"]>;
  religiousPreferences:
    | Array<Maybe<Scalars["String"]>>
    | Maybe<Scalars["String"]>;
  age: Scalars["Int"];
  location?: Maybe<Scalars["Json"]>;
}>;

export type UpdateProfileMutation = { __typename?: "RootMutationType" } & {
  updateCurrentProfile?: Maybe<
    { __typename?: "Profile" } & Pick<
      Profile,
      | "id"
      | "height"
      | "politicPreferences"
      | "religiousPreferences"
      | "name"
      | "age"
      | "location"
    >
  >;
};

export type AvailabilitiesQueryVariables = Exact<{ [key: string]: never }>;

export type AvailabilitiesQuery = { __typename?: "RootQueryType" } & {
  currentUser: { __typename?: "CurrentUser" } & Pick<
    CurrentUser,
    "id" | "state"
  > & {
      matches: Array<
        Maybe<{ __typename?: "Match" } & Pick<Match, "id" | "availabilities">>
      >;
      videoCalls: Array<
        Maybe<
          { __typename?: "VideoCall" } & Pick<
            VideoCall,
            "id" | "availabilities"
          > & {
              profiles?: Maybe<
                Array<Maybe<{ __typename?: "Profile" } & Pick<Profile, "id">>>
              >;
            }
        >
      >;
    };
};

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentUserQuery = { __typename?: "RootQueryType" } & {
  currentUser: { __typename?: "CurrentUser" } & Pick<
    CurrentUser,
    "id" | "state"
  > & {
      profile?: Maybe<
        { __typename?: "Profile" } & Pick<Profile, "propicFileDownloadUrl">
      >;
      videoCalls: Array<
        Maybe<
          { __typename?: "VideoCall" } & Pick<
            VideoCall,
            "initiator" | "happensAt" | "availabilities"
          >
        >
      >;
      meetings: Array<
        Maybe<{ __typename?: "Meeting" } & Pick<Meeting, "happensAt">>
      >;
    };
};

export type CurrentUserProfileQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentUserProfileQuery = { __typename?: "RootQueryType" } & {
  currentUser: { __typename?: "CurrentUser" } & Pick<CurrentUser, "id"> & {
      profile?: Maybe<{ __typename?: "Profile" } & CompleteProfileFragment>;
    };
};

export type MatchesQueryVariables = Exact<{ [key: string]: never }>;

export type MatchesQuery = { __typename?: "RootQueryType" } & {
  currentUser: { __typename?: "CurrentUser" } & Pick<CurrentUser, "id"> & {
      matches: Array<
        Maybe<
          { __typename?: "Match" } & Pick<
            Match,
            "id" | "unlockedAt" | "availabilities"
          > & {
              profiles?: Maybe<
                Array<
                  Maybe<{ __typename?: "Profile" } & CompleteProfileFragment>
                >
              >;
            }
        >
      >;
    };
};

export type MeetingsQueryVariables = Exact<{ [key: string]: never }>;

export type MeetingsQuery = { __typename?: "RootQueryType" } & {
  currentUser: { __typename?: "CurrentUser" } & Pick<CurrentUser, "id"> & {
      meetings: Array<
        Maybe<
          { __typename?: "Meeting" } & Pick<
            Meeting,
            "id" | "happensAt" | "location"
          > & {
              profiles?: Maybe<
                Array<
                  Maybe<{ __typename?: "Profile" } & CompleteProfileFragment>
                >
              >;
            }
        >
      >;
    };
};

export type OtherProfileQueryVariables = Exact<{ [key: string]: never }>;

export type OtherProfileQuery = { __typename?: "RootQueryType" } & {
  currentUser: { __typename?: "CurrentUser" } & Pick<CurrentUser, "id"> & {
      matches: Array<
        Maybe<
          { __typename?: "Match" } & Pick<Match, "id"> & {
              profiles?: Maybe<
                Array<
                  Maybe<{ __typename?: "Profile" } & CompleteProfileFragment>
                >
              >;
            }
        >
      >;
      videoCalls: Array<
        Maybe<
          { __typename?: "VideoCall" } & Pick<VideoCall, "id"> & {
              profiles?: Maybe<
                Array<
                  Maybe<{ __typename?: "Profile" } & CompleteProfileFragment>
                >
              >;
            }
        >
      >;
      meetings: Array<
        Maybe<
          { __typename?: "Meeting" } & Pick<Meeting, "id"> & {
              profiles?: Maybe<
                Array<
                  Maybe<{ __typename?: "Profile" } & CompleteProfileFragment>
                >
              >;
            }
        >
      >;
    };
};

export type PresignedUploadUrlsQueryVariables = Exact<{ [key: string]: never }>;

export type PresignedUploadUrlsQuery = { __typename?: "RootQueryType" } & {
  currentUser: { __typename?: "CurrentUser" } & Pick<
    CurrentUser,
    "id" | "faceFileUploadUrl" | "idFileUploadUrl" | "propicFileUploadUrl"
  >;
};

export type VideoCallsQueryVariables = Exact<{ [key: string]: never }>;

export type VideoCallsQuery = { __typename?: "RootQueryType" } & {
  currentUser: { __typename?: "CurrentUser" } & Pick<CurrentUser, "id"> & {
      profile?: Maybe<
        { __typename?: "Profile" } & Pick<Profile, "propicFileDownloadUrl">
      >;
      videoCalls: Array<
        Maybe<
          { __typename?: "VideoCall" } & Pick<
            VideoCall,
            "id" | "happensAt" | "availabilities" | "accessToken" | "initiator"
          > & {
              profiles?: Maybe<
                Array<
                  Maybe<{ __typename?: "Profile" } & CompleteProfileFragment>
                >
              >;
            }
        >
      >;
    };
};

export type CurrentUserStateSubscriptionVariables = Exact<{
  [key: string]: never;
}>;

export type CurrentUserStateSubscription = {
  __typename?: "RootSubscriptionType";
} & Pick<RootSubscriptionType, "currentUserState">;

export const CompleteProfileFragmentDoc = gql`
  fragment CompleteProfile on Profile {
    id
    age
    description
    educationSubject
    employment
    height
    politicPreferences
    name
    propicFileDownloadUrl
    religiousPreferences
    datingPreferences
    gender
    socialAccounts
    score
  }
`;
export const DisableUserDocument = gql`
  mutation disableUser {
    disableUser {
      id
    }
  }
`;
export type DisableUserMutationFn = Apollo.MutationFunction<
  DisableUserMutation,
  DisableUserMutationVariables
>;

/**
 * __useDisableUserMutation__
 *
 * To run a mutation, you first call `useDisableUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDisableUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [disableUserMutation, { data, loading, error }] = useDisableUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useDisableUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DisableUserMutation,
    DisableUserMutationVariables
  >
) {
  return Apollo.useMutation<DisableUserMutation, DisableUserMutationVariables>(
    DisableUserDocument,
    baseOptions
  );
}
export type DisableUserMutationHookResult = ReturnType<
  typeof useDisableUserMutation
>;
export type DisableUserMutationResult = Apollo.MutationResult<DisableUserMutation>;
export type DisableUserMutationOptions = Apollo.BaseMutationOptions<
  DisableUserMutation,
  DisableUserMutationVariables
>;
export const FinalizeMatchDocument = gql`
  mutation finalizeMatch(
    $matchId: ID!
    $chosenUserId: ID
    $availabilities: [DateTime]!
  ) {
    finalizeMatch(
      chosenUserId: $chosenUserId
      matchId: $matchId
      availabilities: $availabilities
    ) {
      id
    }
  }
`;
export type FinalizeMatchMutationFn = Apollo.MutationFunction<
  FinalizeMatchMutation,
  FinalizeMatchMutationVariables
>;

/**
 * __useFinalizeMatchMutation__
 *
 * To run a mutation, you first call `useFinalizeMatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFinalizeMatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [finalizeMatchMutation, { data, loading, error }] = useFinalizeMatchMutation({
 *   variables: {
 *      matchId: // value for 'matchId'
 *      chosenUserId: // value for 'chosenUserId'
 *      availabilities: // value for 'availabilities'
 *   },
 * });
 */
export function useFinalizeMatchMutation(
  baseOptions?: Apollo.MutationHookOptions<
    FinalizeMatchMutation,
    FinalizeMatchMutationVariables
  >
) {
  return Apollo.useMutation<
    FinalizeMatchMutation,
    FinalizeMatchMutationVariables
  >(FinalizeMatchDocument, baseOptions);
}
export type FinalizeMatchMutationHookResult = ReturnType<
  typeof useFinalizeMatchMutation
>;
export type FinalizeMatchMutationResult = Apollo.MutationResult<FinalizeMatchMutation>;
export type FinalizeMatchMutationOptions = Apollo.BaseMutationOptions<
  FinalizeMatchMutation,
  FinalizeMatchMutationVariables
>;
export const FinalizeVideoCallDocument = gql`
  mutation finalizeVideoCall(
    $videoCallId: ID!
    $chosenUserId: ID
    $availabilities: [DateTime]!
  ) {
    finalizeVideoCall(
      chosenUserId: $chosenUserId
      videoCallId: $videoCallId
      availabilities: $availabilities
    ) {
      id
    }
  }
`;
export type FinalizeVideoCallMutationFn = Apollo.MutationFunction<
  FinalizeVideoCallMutation,
  FinalizeVideoCallMutationVariables
>;

/**
 * __useFinalizeVideoCallMutation__
 *
 * To run a mutation, you first call `useFinalizeVideoCallMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFinalizeVideoCallMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [finalizeVideoCallMutation, { data, loading, error }] = useFinalizeVideoCallMutation({
 *   variables: {
 *      videoCallId: // value for 'videoCallId'
 *      chosenUserId: // value for 'chosenUserId'
 *      availabilities: // value for 'availabilities'
 *   },
 * });
 */
export function useFinalizeVideoCallMutation(
  baseOptions?: Apollo.MutationHookOptions<
    FinalizeVideoCallMutation,
    FinalizeVideoCallMutationVariables
  >
) {
  return Apollo.useMutation<
    FinalizeVideoCallMutation,
    FinalizeVideoCallMutationVariables
  >(FinalizeVideoCallDocument, baseOptions);
}
export type FinalizeVideoCallMutationHookResult = ReturnType<
  typeof useFinalizeVideoCallMutation
>;
export type FinalizeVideoCallMutationResult = Apollo.MutationResult<FinalizeVideoCallMutation>;
export type FinalizeVideoCallMutationOptions = Apollo.BaseMutationOptions<
  FinalizeVideoCallMutation,
  FinalizeVideoCallMutationVariables
>;
export const UnlockMatchDocument = gql`
  mutation unlockMatch($matchId: ID!) {
    unlockMatch(matchId: $matchId) {
      id
      unlockedAt
    }
  }
`;
export type UnlockMatchMutationFn = Apollo.MutationFunction<
  UnlockMatchMutation,
  UnlockMatchMutationVariables
>;

/**
 * __useUnlockMatchMutation__
 *
 * To run a mutation, you first call `useUnlockMatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnlockMatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unlockMatchMutation, { data, loading, error }] = useUnlockMatchMutation({
 *   variables: {
 *      matchId: // value for 'matchId'
 *   },
 * });
 */
export function useUnlockMatchMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UnlockMatchMutation,
    UnlockMatchMutationVariables
  >
) {
  return Apollo.useMutation<UnlockMatchMutation, UnlockMatchMutationVariables>(
    UnlockMatchDocument,
    baseOptions
  );
}
export type UnlockMatchMutationHookResult = ReturnType<
  typeof useUnlockMatchMutation
>;
export type UnlockMatchMutationResult = Apollo.MutationResult<UnlockMatchMutation>;
export type UnlockMatchMutationOptions = Apollo.BaseMutationOptions<
  UnlockMatchMutation,
  UnlockMatchMutationVariables
>;
export const UpdateProfileDocument = gql`
  mutation updateProfile(
    $height: Int!
    $name: String!
    $politicPreferences: [String]!
    $religiousPreferences: [String]!
    $age: Int!
    $location: Json
  ) {
    updateCurrentProfile(
      height: $height
      politicPreferences: $politicPreferences
      religiousPreferences: $religiousPreferences
      name: $name
      age: $age
      location: $location
    ) {
      id
      height
      politicPreferences
      religiousPreferences
      name
      age
      location
    }
  }
`;
export type UpdateProfileMutationFn = Apollo.MutationFunction<
  UpdateProfileMutation,
  UpdateProfileMutationVariables
>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      height: // value for 'height'
 *      name: // value for 'name'
 *      politicPreferences: // value for 'politicPreferences'
 *      religiousPreferences: // value for 'religiousPreferences'
 *      age: // value for 'age'
 *      location: // value for 'location'
 *   },
 * });
 */
export function useUpdateProfileMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateProfileMutation,
    UpdateProfileMutationVariables
  >
) {
  return Apollo.useMutation<
    UpdateProfileMutation,
    UpdateProfileMutationVariables
  >(UpdateProfileDocument, baseOptions);
}
export type UpdateProfileMutationHookResult = ReturnType<
  typeof useUpdateProfileMutation
>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<
  UpdateProfileMutation,
  UpdateProfileMutationVariables
>;
export const AvailabilitiesDocument = gql`
  query availabilities {
    currentUser {
      id
      state
      matches {
        id
        availabilities
      }
      videoCalls {
        id
        availabilities
        profiles {
          id
        }
      }
    }
  }
`;

/**
 * __useAvailabilitiesQuery__
 *
 * To run a query within a React component, call `useAvailabilitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAvailabilitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAvailabilitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAvailabilitiesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    AvailabilitiesQuery,
    AvailabilitiesQueryVariables
  >
) {
  return Apollo.useQuery<AvailabilitiesQuery, AvailabilitiesQueryVariables>(
    AvailabilitiesDocument,
    baseOptions
  );
}
export function useAvailabilitiesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AvailabilitiesQuery,
    AvailabilitiesQueryVariables
  >
) {
  return Apollo.useLazyQuery<AvailabilitiesQuery, AvailabilitiesQueryVariables>(
    AvailabilitiesDocument,
    baseOptions
  );
}
export type AvailabilitiesQueryHookResult = ReturnType<
  typeof useAvailabilitiesQuery
>;
export type AvailabilitiesLazyQueryHookResult = ReturnType<
  typeof useAvailabilitiesLazyQuery
>;
export type AvailabilitiesQueryResult = Apollo.QueryResult<
  AvailabilitiesQuery,
  AvailabilitiesQueryVariables
>;
export const CurrentUserDocument = gql`
  query currentUser {
    currentUser {
      id
      state
      profile {
        propicFileDownloadUrl
      }
      videoCalls {
        initiator
        happensAt
        availabilities
      }
      meetings {
        happensAt
      }
    }
  }
`;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(
  baseOptions?: Apollo.QueryHookOptions<
    CurrentUserQuery,
    CurrentUserQueryVariables
  >
) {
  return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(
    CurrentUserDocument,
    baseOptions
  );
}
export function useCurrentUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CurrentUserQuery,
    CurrentUserQueryVariables
  >
) {
  return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(
    CurrentUserDocument,
    baseOptions
  );
}
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<
  typeof useCurrentUserLazyQuery
>;
export type CurrentUserQueryResult = Apollo.QueryResult<
  CurrentUserQuery,
  CurrentUserQueryVariables
>;
export const CurrentUserProfileDocument = gql`
  query currentUserProfile {
    currentUser {
      id
      profile {
        ...CompleteProfile
      }
    }
  }
  ${CompleteProfileFragmentDoc}
`;

/**
 * __useCurrentUserProfileQuery__
 *
 * To run a query within a React component, call `useCurrentUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserProfileQuery(
  baseOptions?: Apollo.QueryHookOptions<
    CurrentUserProfileQuery,
    CurrentUserProfileQueryVariables
  >
) {
  return Apollo.useQuery<
    CurrentUserProfileQuery,
    CurrentUserProfileQueryVariables
  >(CurrentUserProfileDocument, baseOptions);
}
export function useCurrentUserProfileLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CurrentUserProfileQuery,
    CurrentUserProfileQueryVariables
  >
) {
  return Apollo.useLazyQuery<
    CurrentUserProfileQuery,
    CurrentUserProfileQueryVariables
  >(CurrentUserProfileDocument, baseOptions);
}
export type CurrentUserProfileQueryHookResult = ReturnType<
  typeof useCurrentUserProfileQuery
>;
export type CurrentUserProfileLazyQueryHookResult = ReturnType<
  typeof useCurrentUserProfileLazyQuery
>;
export type CurrentUserProfileQueryResult = Apollo.QueryResult<
  CurrentUserProfileQuery,
  CurrentUserProfileQueryVariables
>;
export const MatchesDocument = gql`
  query matches {
    currentUser {
      id
      matches {
        id
        unlockedAt
        availabilities
        profiles {
          ...CompleteProfile
        }
      }
    }
  }
  ${CompleteProfileFragmentDoc}
`;

/**
 * __useMatchesQuery__
 *
 * To run a query within a React component, call `useMatchesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMatchesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMatchesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMatchesQuery(
  baseOptions?: Apollo.QueryHookOptions<MatchesQuery, MatchesQueryVariables>
) {
  return Apollo.useQuery<MatchesQuery, MatchesQueryVariables>(
    MatchesDocument,
    baseOptions
  );
}
export function useMatchesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MatchesQuery, MatchesQueryVariables>
) {
  return Apollo.useLazyQuery<MatchesQuery, MatchesQueryVariables>(
    MatchesDocument,
    baseOptions
  );
}
export type MatchesQueryHookResult = ReturnType<typeof useMatchesQuery>;
export type MatchesLazyQueryHookResult = ReturnType<typeof useMatchesLazyQuery>;
export type MatchesQueryResult = Apollo.QueryResult<
  MatchesQuery,
  MatchesQueryVariables
>;
export const MeetingsDocument = gql`
  query meetings {
    currentUser {
      id
      meetings {
        id
        happensAt
        location
        profiles {
          ...CompleteProfile
        }
      }
    }
  }
  ${CompleteProfileFragmentDoc}
`;

/**
 * __useMeetingsQuery__
 *
 * To run a query within a React component, call `useMeetingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeetingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeetingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeetingsQuery(
  baseOptions?: Apollo.QueryHookOptions<MeetingsQuery, MeetingsQueryVariables>
) {
  return Apollo.useQuery<MeetingsQuery, MeetingsQueryVariables>(
    MeetingsDocument,
    baseOptions
  );
}
export function useMeetingsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MeetingsQuery,
    MeetingsQueryVariables
  >
) {
  return Apollo.useLazyQuery<MeetingsQuery, MeetingsQueryVariables>(
    MeetingsDocument,
    baseOptions
  );
}
export type MeetingsQueryHookResult = ReturnType<typeof useMeetingsQuery>;
export type MeetingsLazyQueryHookResult = ReturnType<
  typeof useMeetingsLazyQuery
>;
export type MeetingsQueryResult = Apollo.QueryResult<
  MeetingsQuery,
  MeetingsQueryVariables
>;
export const OtherProfileDocument = gql`
  query otherProfile {
    currentUser {
      id
      matches {
        id
        profiles {
          ...CompleteProfile
        }
      }
      videoCalls {
        id
        profiles {
          ...CompleteProfile
        }
      }
      meetings {
        id
        profiles {
          ...CompleteProfile
        }
      }
    }
  }
  ${CompleteProfileFragmentDoc}
`;

/**
 * __useOtherProfileQuery__
 *
 * To run a query within a React component, call `useOtherProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useOtherProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOtherProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useOtherProfileQuery(
  baseOptions?: Apollo.QueryHookOptions<
    OtherProfileQuery,
    OtherProfileQueryVariables
  >
) {
  return Apollo.useQuery<OtherProfileQuery, OtherProfileQueryVariables>(
    OtherProfileDocument,
    baseOptions
  );
}
export function useOtherProfileLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    OtherProfileQuery,
    OtherProfileQueryVariables
  >
) {
  return Apollo.useLazyQuery<OtherProfileQuery, OtherProfileQueryVariables>(
    OtherProfileDocument,
    baseOptions
  );
}
export type OtherProfileQueryHookResult = ReturnType<
  typeof useOtherProfileQuery
>;
export type OtherProfileLazyQueryHookResult = ReturnType<
  typeof useOtherProfileLazyQuery
>;
export type OtherProfileQueryResult = Apollo.QueryResult<
  OtherProfileQuery,
  OtherProfileQueryVariables
>;
export const PresignedUploadUrlsDocument = gql`
  query presignedUploadUrls {
    currentUser {
      id
      faceFileUploadUrl
      idFileUploadUrl
      propicFileUploadUrl
    }
  }
`;

/**
 * __usePresignedUploadUrlsQuery__
 *
 * To run a query within a React component, call `usePresignedUploadUrlsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePresignedUploadUrlsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePresignedUploadUrlsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePresignedUploadUrlsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    PresignedUploadUrlsQuery,
    PresignedUploadUrlsQueryVariables
  >
) {
  return Apollo.useQuery<
    PresignedUploadUrlsQuery,
    PresignedUploadUrlsQueryVariables
  >(PresignedUploadUrlsDocument, baseOptions);
}
export function usePresignedUploadUrlsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PresignedUploadUrlsQuery,
    PresignedUploadUrlsQueryVariables
  >
) {
  return Apollo.useLazyQuery<
    PresignedUploadUrlsQuery,
    PresignedUploadUrlsQueryVariables
  >(PresignedUploadUrlsDocument, baseOptions);
}
export type PresignedUploadUrlsQueryHookResult = ReturnType<
  typeof usePresignedUploadUrlsQuery
>;
export type PresignedUploadUrlsLazyQueryHookResult = ReturnType<
  typeof usePresignedUploadUrlsLazyQuery
>;
export type PresignedUploadUrlsQueryResult = Apollo.QueryResult<
  PresignedUploadUrlsQuery,
  PresignedUploadUrlsQueryVariables
>;
export const VideoCallsDocument = gql`
  query videoCalls {
    currentUser {
      id
      profile {
        propicFileDownloadUrl
      }
      videoCalls {
        id
        happensAt
        availabilities
        accessToken
        initiator
        profiles {
          ...CompleteProfile
        }
      }
    }
  }
  ${CompleteProfileFragmentDoc}
`;

/**
 * __useVideoCallsQuery__
 *
 * To run a query within a React component, call `useVideoCallsQuery` and pass it any options that fit your needs.
 * When your component renders, `useVideoCallsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVideoCallsQuery({
 *   variables: {
 *   },
 * });
 */
export function useVideoCallsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    VideoCallsQuery,
    VideoCallsQueryVariables
  >
) {
  return Apollo.useQuery<VideoCallsQuery, VideoCallsQueryVariables>(
    VideoCallsDocument,
    baseOptions
  );
}
export function useVideoCallsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    VideoCallsQuery,
    VideoCallsQueryVariables
  >
) {
  return Apollo.useLazyQuery<VideoCallsQuery, VideoCallsQueryVariables>(
    VideoCallsDocument,
    baseOptions
  );
}
export type VideoCallsQueryHookResult = ReturnType<typeof useVideoCallsQuery>;
export type VideoCallsLazyQueryHookResult = ReturnType<
  typeof useVideoCallsLazyQuery
>;
export type VideoCallsQueryResult = Apollo.QueryResult<
  VideoCallsQuery,
  VideoCallsQueryVariables
>;
export const CurrentUserStateDocument = gql`
  subscription currentUserState {
    currentUserState
  }
`;

/**
 * __useCurrentUserStateSubscription__
 *
 * To run a query within a React component, call `useCurrentUserStateSubscription` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserStateSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserStateSubscription({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserStateSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    CurrentUserStateSubscription,
    CurrentUserStateSubscriptionVariables
  >
) {
  return Apollo.useSubscription<
    CurrentUserStateSubscription,
    CurrentUserStateSubscriptionVariables
  >(CurrentUserStateDocument, baseOptions);
}
export type CurrentUserStateSubscriptionHookResult = ReturnType<
  typeof useCurrentUserStateSubscription
>;
export type CurrentUserStateSubscriptionResult = Apollo.SubscriptionResult<CurrentUserStateSubscription>;
