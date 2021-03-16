import React, { PropsWithChildren, ReactElement, useContext } from "react";
import { ThemeContext } from "styled-components";
import SvgLoading from "./svg/SvgLoading";

export function LoadingProvider(
  props: PropsWithChildren<{ data: any }>
): ReactElement {
  const { data, children } = props;

  const theme = useContext(ThemeContext);

  return !data ? (
    <SvgLoading fill={theme.primary} style={{ transform: "scale(2)" }} />
  ) : (
    (children as ReactElement)
  );
}
