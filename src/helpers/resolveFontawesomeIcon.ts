import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faInstagram,
  faLinkedin,
  faSpotify,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faHandsHelping,
  faTelescope,
  faAxeBattle,
} from "@fortawesome/pro-duotone-svg-icons";

export function resolvePersonalityTrait(traitName: string): IconDefinition {
  return {
    helpful: faHandsHelping,
    curious: faTelescope,
    adventurous: faAxeBattle,
  }[traitName];
}

export function resolveSocialNetwork(
  traitName: string
): { icon: IconDefinition; color: string } {
  return {
    instagram: { icon: faInstagram, color: "#ff546b" },
    linkedin: { icon: faLinkedin, color: "#0a66c2" },
    spotify: { icon: faSpotify, color: "#1DD05E" },
    youtube: { icon: faYoutube, color: "#ff0000" },
  }[traitName];
}
