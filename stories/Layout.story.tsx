import React, { PropsWithChildren, ReactElement } from "react";
import { Layout } from "../src/components/Layout";

export function LayoutStory(props: PropsWithChildren<any>): ReactElement {
  const { children } = props;
  return <Layout>{children}</Layout>;
}

export default LayoutStory;
