import styled from "styled-components";
import { colors } from "../helpers/themes";

const SmallLabel = styled.div`
  width: 75%;
  height: 56px;
  margin: 7px 28px 7px;
  text-decoration: none;
  cursor: pointer;

  border-radius: 8px;

  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  background: ${colors.primary};

  &:focus {
    outline: none;
  }
`;

export default SmallLabel;
