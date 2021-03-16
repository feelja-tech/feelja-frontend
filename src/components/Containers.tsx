import styled from "styled-components";
import { colors } from "../helpers/themes";

// Every container is flex and horizontally aligns his content
export const BaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: visible;
`;

// 1st level
export const PageContainer = styled(BaseContainer)`
  height: 100%;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
`;

// 2nd level
export const HeaderContainer = styled(BaseContainer)`
  margin-bottom: 5%;
  align-items: center;
  pointer-events: all;
  flex-direction: row;
  max-height: 10vh;
  flex: 1;
`;

export const MainContainer = styled(BaseContainer)`
  align-items: center;
  padding: 0 16px;
  height: 100%;
  width: stretch;
  flex: 1;
  justify-content: space-evenly;
`;

export const ButtonsContainer = styled(BaseContainer)`
  margin-top: 5%;
  margin-bottom: 10%;
  align-items: center;
  pointer-events: all;
  min-height: 18vh;
  max-height: 18vh;
  padding: 0 28px;
  justify-content: center;
`;

// 3rd level

export const MainContentContainer = styled(BaseContainer)`
  align-items: center;
  // flex: 1;
  width: 100%;
`;

export const FullScreenContainer = styled.div`
  position: absolute;
  z-index: -1;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  justify-content: center;
  display: flex;
  height: 100%;
  align-items: center;
  top: 0;

  background: ${colors.primary};
`;
