import "@/styles/globals.css";

import { Poppins } from "@next/font/google";
import splitbee from "@splitbee/web";
import type { AppProps } from "next/app";
import React from "react";

import { DefaultSeo } from "@/lib/seo";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    splitbee.init({
      scriptUrl: `/bee.js`,
      apiUrl: `/_hive`,
    });
  }, []);

  return (
    <>
      <DefaultSeo />
      <style jsx global>{`
        html {
          font-family: ${poppins.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
