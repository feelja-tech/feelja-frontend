import { createGlobalStyle } from "styled-components";
import { colors } from "../helpers/themes";

function getFontUrl(font: string): string {
  return process.env.NEXT_PUBLIC_STATIC_MEDIA_BASE_URL + "/fonts/" + font;
}

export const GlobalStyle = createGlobalStyle`

  @font-face {
    font-family: "Helvetica Neue";
    src: url(${getFontUrl("HelveticaNeueLTCom-UltLt.ttf")}) format("truetype");
    font-weight: 100;
  }

  @font-face {
    font-family: "Helvetica Neue";
    src: url(${getFontUrl("HelveticaNeueLTCom-Th.ttf")}) format("truetype");
    font-weight: 200;
  }

  @font-face {
    font-family: "Helvetica Neue";
    src: url(${getFontUrl("HelveticaNeueLTCom-Lt.ttf")}) format("truetype");
    font-weight: 300;
  }

  @font-face {
    font-family: "Helvetica Neue";
    src: url(${getFontUrl("HelveticaNeueLTCom-Roman.ttf")}) format("truetype");
    font-weight: 400;
  }

  @font-face {
    font-family: "Helvetica Neue";
    src: url(${getFontUrl("HelveticaNeueLTCom-Md.ttf")}) format("truetype");
    font-weight: 500;
  }

  @font-face {
    font-family: "Helvetica Neue";
    src: url(${getFontUrl("HelveticaNeueLTCom-Bd.ttf")}) format("truetype");
    font-weight: 600;
  }

  @font-face {
    font-family: "Helvetica Neue";
    src: url(${getFontUrl("HelveticaNeueLTCom-Hv.ttf")}) format("truetype");
    font-weight: 800;
  }

  @font-face {
    font-family: "Helvetica Neue";
    src: url(${getFontUrl("HelveticaNeueLTCom-Blk.ttf")}) format("truetype");
    font-weight: 900;
  }

  body {
    overflow: hidden;
    min-height: fill-available;
  }

  html {
    overflow: hidden;
    height: fill-available;
  }

  html, body {
    text-rendering: geometricPrecision;
  }

  * { 
    font-family:  "Helvetica Neue" !important;
    box-sizing: border-box; 
    min-width: 0; 
    min-height: 0; 
    scrollbar-width: none;

    -webkit-appearance: none;

    &:focus {
      outline: none;
    }

    &::-webkit-scrollbar { 
      display: none; 
    }

    .mapboxgl-map {
      border-radius: 8px;
    }
  }

  .ReactInputVerificationCode__container, .ReactInputVerificationCode__container > * {
    --ReactInputVerificationCode-itemWidth: min(50px, 13vw);
    --ReactInputVerificationCode-itemHeight: 60px;
    --ReactInputVerificationCode-itemSpacing: 3px;
  }

  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside){
    background-color: ${colors.primary} !important;
  }
`;

export default GlobalStyle;
