import "@/styles/globals.css";

import { Anybody, Inter } from "@next/font/google";
import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";

import { seo } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"] });
const anybody = Anybody({ subsets: ["latin"] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <DefaultSeo {...seo} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
