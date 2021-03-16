import { MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";
import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../src/redux/rootReducer";
import { Provider } from "react-redux";
import { MockedProvider } from "@apollo/client/testing";
import { mocks } from "../stories/mocks";
import { GlobalStyle } from "../src/components/GlobalStyle";
import { withNextRouter } from "storybook-addon-next-router";
import { withScreenshot } from "storycap";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  viewport: {
    viewports: {
      ...MINIMAL_VIEWPORTS,
      mediumPhone: {
        name: "Medium mobile",
        styles: {
          width: "360px",
          height: "640px",
        },
      },
    },
    defaultViewport: "mobile1",
  },
  chromatic: {
    viewports: [320, 768, 1280],
  },
  screenshot: {
    viewport: "Medium mobile",
    delay: 1000,
    waitAssets: true,
  },
};

export const decorators = [
  (Story, props) => {
    return (
      <MockedProvider mocks={mocks} addTypename>
        <Provider
          store={configureStore({
            reducer: rootReducer,
            preloadedState: { layout: props.parameters.initLayoutState },
          })}
        >
          <GlobalStyle />
          <Story initLayoutState={props.parameters.initLayoutState} />
        </Provider>
      </MockedProvider>
    );
  },
  withNextRouter({
    path: "/", // defaults to `/`
    asPath: "/", // defaults to `/`
    query: {}, // defaults to `{}`
    // push() {}, // defaults to using addon actions integration, can override any method in the router
    // prefetch: () => new Promise((resolve, reject) => {}),
  }),
  withScreenshot,
];
