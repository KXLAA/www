import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";

import { seo } from "@/lib/seo";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...seo} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
