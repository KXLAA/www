import "@/styles/globals.css";

import { Poppins } from "@next/font/google";
import type { AppProps } from "next/app";

import { useAnalytics } from "@/lib/hooks/use-analytics";
import { DefaultSeo } from "@/lib/seo";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  preload: true,
  display: "swap",
});

function MyApp({ Component, pageProps }: AppProps) {
  useAnalytics();

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
