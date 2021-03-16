import { gql } from "@apollo/client";

export const profileFragment = gql`
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
  }
`;

export default profileFragment;
