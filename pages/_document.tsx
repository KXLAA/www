import { getSandpackCssText } from "@codesandbox/sandpack-react";
import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en" className="scroll-smooth">
        <Head>
          <style
            dangerouslySetInnerHTML={{ __html: getSandpackCssText() }}
            id="sandpack"
            key="sandpack-css"
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
