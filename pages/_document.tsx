import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import React from "react";
import { colors } from "../src/helpers/themes";

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <meta name="application-name" content="Feelja" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="Feelja" />
          <meta name="description" content="Find someone who gets you" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />

          {/* realfavicongenerator.net */}

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#fd5e5e" />
          <meta name="apple-mobile-web-app-title" content="Feelja" />
          <meta name="application-name" content="Feelja" />
          <meta name="msapplication-TileColor" content="#b91d47" />
          <meta name="theme-color" content="#ffffff" />

          <link rel="shortcut icon" href="/favicon.ico" />

          {/* google fonts */}

          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
