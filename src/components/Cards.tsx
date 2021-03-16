import Image, { ImageProps } from "next/image";
import React, { PropsWithChildren, ReactElement, ReactNode } from "react";
import styled, { CSSProperties } from "styled-components";
import { colors } from "../helpers/themes";
import SvgLoading from "./svg/SvgLoading";
import { Title } from "./Typography";

interface InfoCardProps {
  image: string;
  title: ReactNode;
  subImage?: string;
  style?: CSSProperties;
  info?: boolean;
  titleBadge?: ReactNode;
}

export const Card = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  border: 1px lightgray solid;
  border-radius: 8px;
  margin: 5px 0;
  padding: 0 15px;
  box-sizing: border-box;
  box-shadow: 0 3px 6px #e4d7d7;
  background: white;
`;

const InfoCardContainer = styled(Card)`
  margin: 0;
  padding: 0;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 100%;
  padding-bottom: 16px;
`;

const InfoCardImage = styled(Image)<ImageProps>`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
`;

const InfoCardSubImage = styled(Image)<ImageProps>`
  border-radius: 8px;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
`;

const InfoCardSubImageContainer = styled.div`
  position: absolute;
  width: 40%;
  z-index: 1;
  right: 5%;
  box-shadow: 0 0 10px grey;

  bottom: 30%;
  border: 1px solid white;
  border-radius: 8px;
`;

export const InfoCardDataContainer = styled.div`
  padding: 8px 0 0 0;
  margin: 0 5%;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  align-items: flex-end;
  justify-content: flex-start;

  border-top: 1px lightgray solid;
`;

export const InfoCardTitle = styled(Title)`
  text-align: left;
  color: ${colors.black};
`;

const InfoCardTitleContainer = styled.div`
  margin: 20px 20px 10px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  &:first-letter {
    text-transform: capitalize;
  }
`;

export function InfoCard(
  props: PropsWithChildren<InfoCardProps>
): ReactElement {
  const {
    image,
    children,
    title,
    subImage = null,
    style = {},
    info = false,
    titleBadge = null,
  } = props;

  return (
    <InfoCardContainer style={style}>
      {image ? (
        <InfoCardImage
          src={image}
          layout="responsive"
          height={500}
          width={500}
        />
      ) : (
        <SvgLoading fill={colors.primary} />
      )}
      <InfoCardTitleContainer>
        {title}
        {titleBadge}
        {subImage && (
          <InfoCardSubImageContainer>
            <InfoCardSubImage
              src={subImage}
              layout="responsive"
              height={500}
              width={500}
            />
          </InfoCardSubImageContainer>
        )}
      </InfoCardTitleContainer>

      {children}
    </InfoCardContainer>
  );
}
