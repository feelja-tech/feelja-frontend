// import {
//   useState,
//   useEffect,
//   Dispatch,
//   SetStateAction,
//   useCallback,
// } from "react";
// import * as posenet from "@tensorflow-models/posenet";
// import Webcam from "react-webcam";
// import mergeImages from "merge-images";

// const REQUIRED_POSES = ["LOOK_STRAIGHT", "LOOK_RIGHT", "LOOK_LEFT"];
// const MARGIN = 50;

// function checkPose(
//   webcam: Webcam & HTMLVideoElement,
//   poseNet: posenet.PoseNet,
//   setCoords: Dispatch<SetStateAction<Record<string, number>>>
// ) {
//   if (webcam.video)
//     poseNet
//       .estimateSinglePose(webcam.video, {
//         flipHorizontal: true,
//       })
//       .then((pose: posenet.Pose) => {
//         const rEyeX = pose.keypoints.find(
//           (keypoint) => keypoint.part === "rightEye"
//         ).position.x;

//         const lEyeX = pose.keypoints.find(
//           (keypoint) => keypoint.part === "leftEye"
//         ).position.x;

//         const noseX = pose.keypoints.find(
//           (keypoint) => keypoint.part === "nose"
//         ).position.x;

//         setCoords({
//           noseX,
//           lEyeX,
//           rEyeX,
//         });
//       });
// }

// export function usePoseEstimation(
//   webcamRef: React.MutableRefObject<Webcam & HTMLVideoElement>
// ): [string, string] {
//   const [recordingInterval, setRecordingInterval] = useState<number>();
//   const [poseNet, setPoseNet] = useState<posenet.PoseNet>(null);

//   const [coords, setCoords] = useState<Record<string, number>>({});
//   const [finished, setFinished] = useState(false);

//   const [guidanceText, setGuidanceText] = useState("Get ready!");

//   const [images, setImages] = useState([]);
//   const [image, setImage] = useState<string>();

//   const [poses, setPoses] = useState<Record<string, boolean>>(
//     REQUIRED_POSES.reduce((acc, curr) => {
//       acc[curr] = false;
//       return acc;
//     }, {})
//   );

//   useEffect(() => {
//     if (finished) {
//       setGuidanceText("Done!");

//       const imgWidth = 720;
//       const imgHeight = 1280;

//       mergeImages(
//         images.map((img, idx) => ({ src: img, y: 0, x: idx * imgWidth })),
//         {
//           width: imgWidth * images.length,
//           height: imgHeight,
//         }
//       ).then(setImage);
//       clearInterval(recordingInterval);
//     }
//   }, [images, finished]);

//   const addScreenshot = useCallback(() => {
//     setImages((prev) => [
//       ...prev,
//       webcamRef.current.getScreenshot({
//         height: 1280,
//         width: 720,
//       }),
//     ]);
//   }, [webcamRef.current]);

//   useEffect(() => {
//     const { noseX, lEyeX, rEyeX } = coords;

//     if (Object.values(poses).reduce((acc, curr) => acc && curr)) {
//       setFinished(true);
//     } else if (!poses.LOOK_STRAIGHT) {
//       setGuidanceText("Look straight");
//       if (noseX > lEyeX && noseX < rEyeX) {
//         setPoses((prev) => ({ ...prev, LOOK_STRAIGHT: true }));
//         addScreenshot();
//       }
//     } else if (!poses.LOOK_RIGHT) {
//       setGuidanceText("Turn right");
//       if (noseX > lEyeX && noseX > rEyeX - MARGIN) {
//         setPoses((prev) => ({ ...prev, LOOK_RIGHT: true }));
//         addScreenshot();
//       }
//     } else if (!poses.LOOK_LEFT) {
//       setGuidanceText("Turn left");
//       if (noseX < lEyeX + MARGIN && noseX < rEyeX) {
//         setPoses((prev) => ({ ...prev, LOOK_LEFT: true }));
//         addScreenshot();
//       }
//     }
//   }, [poses, coords, setPoses, setFinished, webcamRef]);

//   useEffect(() => {
//     if (webcamRef.current) {
//       posenet
//         .load({
//           architecture: "MobileNetV1",
//           outputStride: 16,
//           inputResolution: { width: 640, height: 480 },
//           multiplier: 0.5,
//         })
//         .then((net) => {
//           console.log("Loaded PoseNet", net);
//           setPoseNet(net);
//         });
//     }
//   }, [setPoseNet, posenet, webcamRef]);

//   useEffect(() => {
//     if (
//       poseNet &&
//       !recordingInterval &&
//       !finished &&
//       webcamRef.current &&
//       setCoords
//     ) {
//       if (webcamRef.current.video)
//         webcamRef.current.video.addEventListener("loadeddata", () => {
//           setRecordingInterval(
//             setInterval(() => {
//               checkPose(webcamRef.current, poseNet, setCoords);
//             }, 2000)
//           );
//         });
//     }
//   }, [poseNet, recordingInterval, finished, webcamRef.current, setCoords]);

//   return [guidanceText, image];
// }

export function usePoseEstimation() {
  console.error("usePoseEstimation");
}

export default usePoseEstimation;
