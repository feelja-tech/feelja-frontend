import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  connect,
  createLocalVideoTrack,
  LocalAudioTrack,
  LocalParticipant,
  LocalTrackPublication,
  LocalVideoTrack,
  Participant,
  RemoteAudioTrack,
  RemoteParticipant,
  RemoteTrackPublication,
  RemoteVideoTrack,
  Room,
} from "twilio-video";
import { VideoCall } from "../graphql/generated";

const VIDEO_CONFIG = { height: 480, frameRate: 24, width: 640 };

type NonDataTrack =
  | LocalVideoTrack
  | RemoteVideoTrack
  | LocalAudioTrack
  | RemoteAudioTrack;

function trackPublished(
  publication: RemoteTrackPublication | LocalTrackPublication,
  currentVideoRef: HTMLVideoElement | null
) {
  // If the TrackPublication is already subscribed to, then attach the Track to the DOM.
  if (publication.track && currentVideoRef) {
    (publication.track as NonDataTrack).attach(currentVideoRef);
  }

  // Once the TrackPublication is subscribed to, attach the Track to the DOM.
  publication.on("subscribed", (track: NonDataTrack) => {
    if (currentVideoRef) track.attach(currentVideoRef);
  });

  // Once the TrackPublication is unsubscribed from, detach the Track from the DOM.
  publication.on("unsubscribed", (track: NonDataTrack) => {
    if (currentVideoRef) track.attach(currentVideoRef);
  });
}

function participantConnected(
  participant: RemoteParticipant | LocalParticipant,
  currentVideoRef: HTMLVideoElement | null,
  setConnected: Dispatch<SetStateAction<boolean>>
) {
  console.log("Participant connected", participant);

  setConnected(true);

  // Handle the TrackPublications already published by the Participant.
  participant.tracks.forEach(
    (publication: RemoteTrackPublication | LocalTrackPublication) => {
      trackPublished(publication, currentVideoRef);
    }
  );

  // Handle theTrackPublications that will be published by the Participant later.
  participant.on("trackPublished", (publication: RemoteTrackPublication) => {
    trackPublished(publication, currentVideoRef);
  });
}

function participantDisconnected(
  participant: Participant,
  currentVideoRef: HTMLVideoElement | null,
  setConnected: Dispatch<SetStateAction<boolean>>
): void {
  console.log("Participant disconnected", participant);

  setConnected(false);

  if (currentVideoRef) currentVideoRef.pause();
}

export function useVideoCall(
  currentLocalVideoRef: HTMLVideoElement | null,
  currentRemoteVideoRef: HTMLVideoElement | null,
  videoCallData?: VideoCall | null
): {
  onLeave: () => void;
  localConnected: boolean;
  remoteConnected: boolean;
} {
  const [room, setRoom] = useState<Room>();

  const [localConnected, setLocalConnected] = useState(false);
  const [remoteConnected, setRemoteConnected] = useState(false);

  const onLeave = useCallback(() => {
    if (room) room.disconnect();
  }, [room]);

  // Local connection
  useEffect(() => {
    if (room && !localConnected)
      participantConnected(
        room.localParticipant,
        currentLocalVideoRef,
        setLocalConnected
      );
  }, [room, currentLocalVideoRef, localConnected]);

  // Handle other participants
  useEffect(() => {
    if (room && !remoteConnected) {
      // Subscribe to the media published by RemoteParticipants already in the Room.
      room.participants.forEach((participant) => {
        participantConnected(
          participant,
          currentRemoteVideoRef,
          setRemoteConnected
        );
      });

      // Subscribe to the media published by RemoteParticipants joining the Room later.
      room.on("participantConnected", (participant) => {
        participantConnected(
          participant,
          currentRemoteVideoRef,
          setRemoteConnected
        );
      });

      // Handle a disconnected RemoteParticipant.
      room.on("participantDisconnected", (participant) => {
        participantDisconnected(
          participant,
          currentRemoteVideoRef,
          setRemoteConnected
        );
      });
    }
  }, [room, currentRemoteVideoRef, remoteConnected]);

  // Window events
  useEffect(() => {
    if (room && onLeave) {
      window.onbeforeunload = onLeave;
      window.onpagehide = onLeave;

      window.document.onvisibilitychange = () => {
        if (document.visibilityState === "hidden") {
          Array.from(room.localParticipant.videoTracks.values()).forEach(
            (publication) => {
              publication.track.stop();
              room.localParticipant.unpublishTrack(publication.track);
            }
          );
        } else {
          createLocalVideoTrack(VIDEO_CONFIG).then((localVideoTrack) => {
            room.localParticipant.publishTrack(localVideoTrack);
          });
        }
      };
    }
  }, [room, onLeave]);

  // Local disconnection
  useEffect(() => {
    if (room && localConnected) {
      room.once("disconnected", (_room: Room, error) => {
        if (error) console.error(error);
        else {
          // Clear the event handlers on document and window..
          window.onbeforeunload = null;
          window.onpagehide = null;
          document.onvisibilitychange = null;

          // Stop the LocalVideoTrack.
          Array.from(
            _room.localParticipant.videoTracks.values()
          ).forEach((publication) => publication.track.stop());

          // Handle the disconnected LocalParticipant.
          participantDisconnected(
            _room.localParticipant,
            currentLocalVideoRef,
            setLocalConnected
          );

          // Handle the disconnected RemoteParticipants.
          _room.participants.forEach((participant) => {
            participantDisconnected(
              participant,
              currentRemoteVideoRef,
              setRemoteConnected
            );
          });
        }
      });
    }
  }, [room, currentLocalVideoRef, currentRemoteVideoRef, localConnected]);

  useEffect(() => {
    if (!room)
      if (videoCallData?.accessToken) {
        connect(videoCallData.accessToken, {
          name: videoCallData.id,
          audio: true,
          maxAudioBitrate: 16000, // For music remove this line
          video: VIDEO_CONFIG,
        })
          .then(setRoom)
          .catch(console.error);
      }
  }, [videoCallData, room]);

  return { onLeave, localConnected, remoteConnected };
}

export default useVideoCall;
