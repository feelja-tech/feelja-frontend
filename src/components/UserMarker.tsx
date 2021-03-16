import React, { ComponentProps, ReactElement } from "react";
import styled from "styled-components";

const UserMarkerContainer = styled.div`
  position: relative;
`;

const UserImage = styled.img`
  border-radius: 50%;
  height: 65px;
  width: 65px;
  box-shadow: 0 0 0 2px ${(props) => props.theme.primary};
  padding: 4px;
`;

export function UserMarker(props: ComponentProps<"img">): ReactElement {
  const { src } = props;

  return (
    <UserMarkerContainer>
      <UserImage src={src} alt={src} />
    </UserMarkerContainer>
  );
}

export default UserMarker;
