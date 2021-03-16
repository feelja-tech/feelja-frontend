import styled from "styled-components";
import { colors } from "../helpers/themes";

export const BaseText = styled.p`
  font-style: normal;
  text-align: center;
  font-weight: normal;
  user-select: none;
  margin: 0;
  line-height: normal;
  white-space: normal;

  &:first-letter {
    text-transform: capitalize;
  }
`;

export const LogoText = styled(BaseText)`
  font-weight: 600;
  font-size: 48px;
  color: ${(props) => props.theme.primary};
  text-shadow: 0px 0px 6px rgba(255, 255, 255, 0.7);
  margin-top: 16px;
`;

export const Title = styled(BaseText)`
  font-weight: 600;
  font-size: 31px;
  color: ${(props) => props.theme.primary};
`;

interface DescriptionProps {
  big?: boolean;
  light?: boolean;
  lowercase?: boolean;
}

export const Description = styled(BaseText)<DescriptionProps>`
  font-size: ${(props) => (props.big ? "32px" : "16px")};
  color: ${(props) => (props.light ? "lightgrey" : colors.black)};
  font-weight: 400;

  &:first-letter {
    text-transform: ${(props) =>
      props.lowercase ? "lowercase" : "capitalize"};
  }
`;

export const ButtonText = styled(BaseText)<{ secondary?: boolean }>`
  font-size: 20px;
  font-weight: ${(props) => (props.secondary ? "300" : "400")};
  color: ${(props) =>
    props.secondary ? props.theme.primary : props.theme.secondary};
  margin-top: 4px;
`;

export const Footnote = styled(BaseText)`
  font-size: 13px;
  font-weight: normal;
  color: ${(props) => props.theme.primary};
  text-align: left;
`;
