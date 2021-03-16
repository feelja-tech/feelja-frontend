import { DetectionStatus } from "@microblink/blinkid-in-browser-sdk";

export function parseMicroblinkStatus(
  status: DetectionStatus
): {
  guidanceText: string;
  success: boolean;
} {
  const guidanceText = {
    0: "Frame your ID",
    1: "Done!",
    2: "Move closer",
    3: "Done!",
    4: "Keep it in frame",
    5: "Keep the camera flat",
    6: "Move further",
    7: "Center the ID",
  }[status];

  const success = [1, 3].includes(status);

  return {
    guidanceText,
    success,
  };
}

export default parseMicroblinkStatus;
