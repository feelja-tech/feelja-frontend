import { AppProps } from "next/dist/next-server/lib/router/router";
import dynamic from "next/dynamic";
import Head from "next/head";
import React, { ReactElement } from "react";
import { Provider } from "react-redux";
import { CustomApolloProvider } from "../src/components/CustomApolloProvider";
import { GlobalNetworkingProvider } from "../src/components/GlobalNetworkingProvider";
import { GlobalStyle } from "../src/components/GlobalStyle";
import { Layout } from "../src/components/Layout";
import { useSentry } from "../src/hooks/useSentry";
import { store } from "../src/redux/store";

const AmplitudeLogger = dynamic(
  () => import("../src/components/AmplitudeLogger"),
  {
    ssr: false,
  }
);

const PWAPrompt = dynamic(() => import("react-ios-pwa-prompt"), { ssr: false });

export default function App({ Component, pageProps }: AppProps): ReactElement {
  useSentry();

  return (
    <>
      <Head>
        <title>Feelja</title>
        <meta
          name="viewport"
          content="
            minimum-scale=1, 
            initial-scale=1, 
            width=device-width, 
            shrink-to-fit=yes, 
            user-scalable=no, 
            viewport-fit=cover
          "
        />
      </Head>
      <Provider store={store}>
        <GlobalStyle />
        <PWAPrompt />
        {process.env.NODE_ENV === "production" && <AmplitudeLogger />}
        <CustomApolloProvider>
          <GlobalNetworkingProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </GlobalNetworkingProvider>
        </CustomApolloProvider>
      </Provider>
    </>
  );
}
