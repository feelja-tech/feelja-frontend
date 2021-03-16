import React, { ReactElement, useEffect, useRef } from "react";
import styled from "styled-components";
import { BaseText, Description } from "./Typography";

const SmallContainer = styled.div<{ big: boolean }>`
  position: relative;
  height: 44px;
  border-top: 1px grey solid;
  border-bottom: 1px grey solid;
  margin-top: 100px;
  margin-bottom: 100px;
`;

const LargeContainer = styled.div<{ big: boolean }>`
  position: relative;
  height: 244px;
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  scrollbar-width: none;
  margin-top: -97px;

  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  z-index: 0;
  transform: translateZ(0);
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;

interface ScrollingInputProps {
  values: string[];
  scrollToIdx?: number;
  size?: string;
  onChange: (value: string) => void;
  label?: string;
}

function scrollToElement(e: Element) {
  e.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}

const InputText = styled(BaseText)<{ big?: boolean }>`
  font-size: 32px;
  padding: 16px 0;
  scroll-snap-align: center;
  opacity: 0.3;
  line-height: ${(props) => (props.big ? 0.5 : 1)};
  margin-left: 5px;
  margin-right: 5px;
  transition: ease-in-out 0.2s 0.3s;
  white-space: nowrap;
`;

function PadTop(): ReactElement {
  return (
    <>
      <InputText big style={{ color: "transparent" }}>
        -
      </InputText>
      <InputText big style={{ color: "transparent" }}>
        -
      </InputText>
    </>
  );
}

function PadBot() {
  return (
    <>
      <InputText big style={{ color: "transparent" }}>
        -
      </InputText>
      <InputText big style={{ color: "transparent" }}>
        -
      </InputText>
    </>
  );
}

export function ScrollingInput(props: ScrollingInputProps): ReactElement {
  const { values, scrollToIdx, size = "big", onChange, label } = props;
  const smallRef = useRef<HTMLDivElement>(null);
  const largeRef = useRef<HTMLDivElement>(null);

  // TODO: baybe add a timer otherwise header and footer jump around (wtf??)
  // useEffect(() => {
  //   if (largeRef.current)
  //     if (scrollToIdx)
  //       scrollToElement(largeRef.current.children[scrollToIdx + 2]);
  //     else scrollToElement(largeRef.current.children[2]);
  // }, [largeRef.current]);

  useEffect(() => {
    if (smallRef.current && largeRef.current) {
      const observer3 = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              (entry.target as HTMLDivElement).style.setProperty(
                "opacity",
                "1"
              );
              // (entry.target as HTMLDivElement).style.setProperty(
              //   "font-size",
              //   "32px"
              // );
              onChange(entry.target.innerHTML);
            } else {
              (entry.target as HTMLDivElement).style.setProperty(
                "opacity",
                "0.3"
              );
              // (entry.target as HTMLDivElement).style.setProperty(
              //   "font-size",
              //   "24px"
              // );
            }
          });
        },
        {
          threshold: 0.5,
          root: smallRef.current,
          rootMargin: "0px",
        }
      );

      largeRef.current.childNodes.forEach((child: Element) => {
        observer3.observe(child);
      });
    }
  }, [smallRef, largeRef]);

  return (
    <SmallContainer ref={smallRef} big={size === "big"}>
      <LargeContainer ref={largeRef} big={size === "big"}>
        <PadTop />
        {values.map((val) => {
          return (
            <InputText
              big={size === "big"}
              key={val}
              onClick={(event) => {
                scrollToElement(event.target as Element);
              }}
            >
              {val}
            </InputText>
          );
        })}
        <PadBot />
      </LargeContainer>
    </SmallContainer>
  );
}

export default ScrollingInput;
