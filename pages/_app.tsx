import "@/styles/globals.css";

import { Anybody, Inter, Lato, Open_Sans, Poppins } from "@next/font/google";
import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";

import { seo } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"] });
const anybody = Anybody({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${poppins.style.fontFamily};
        }
      `}</style>
      <DefaultSeo {...seo} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
