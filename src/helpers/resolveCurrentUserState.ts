import moment from "moment";
import { CurrentUserQuery, CurrentUserState } from "../graphql/generated";

const VIDEO_CALL_DURATION_MINUTES = 10;

function resolveVideoCallEnded(
  currentUser: CurrentUserQuery["currentUser"]
): string {
  return currentUser.videoCalls[0]?.initiator
    ? "/main/video_call/review_call"
    : "/main/awaiting_response";
}

function resolveInVideoCall(
  currentUser: CurrentUserQuery["currentUser"]
): string {
  return moment().isAfter(
    moment(currentUser.videoCalls[0]?.happensAt).add(
      VIDEO_CALL_DURATION_MINUTES,
      "minutes"
    )
  )
    ? resolveVideoCallEnded(currentUser)
    : "/main/video_call/get_ready";
}

function resolveWaitingMeeting(
  currentUser: CurrentUserQuery["currentUser"]
): string {
  return currentUser.videoCalls[0]?.initiator
    ? "/main/awaiting_response"
    : "/main/video_call/review_call";
}

export function resolveCurrentUserState(
  currentUser: CurrentUserQuery["currentUser"]
): string {
  const { state } = currentUser;

  return {
    [CurrentUserState.Incomplete]: "/signup/consent",
    [CurrentUserState.WaitingMatch]: "/main/initial",
    [CurrentUserState.HasMatch]: "/main/match/unlock_matches",
    [CurrentUserState.InMatch]: "/main/match/matches_overview",
    [CurrentUserState.WaitingVideoCall]: "/main/awaiting_response",
    [CurrentUserState.HasVideoCall]: "/main/video_call/video_call_info",
    [CurrentUserState.InVideoCall]: resolveInVideoCall(currentUser),
    [CurrentUserState.WaitingMeeting]: resolveWaitingMeeting(currentUser),
    [CurrentUserState.WaitingMeetingPlan]: "/main/meeting/preparing_date",
    [CurrentUserState.HasMeeting]: "/main/meeting/date_info",
    [CurrentUserState.InMeeting]: "/main/meeting/date_map",
    [CurrentUserState.Banned]: "/main/banned",
    [CurrentUserState.Disabled]: "/main/disabled",
  }[state];
}

export default resolveCurrentUserState;
