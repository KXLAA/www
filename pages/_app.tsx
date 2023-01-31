import "@/styles/globals.css";

import { Poppins } from "@next/font/google";
import type { AppProps } from "next/app";
import Head from "next/head";
import { DefaultSeo } from "next-seo";

import { seo } from "@/lib/seo";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
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
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#101010" />
        <meta name="msapplication-TileColor" content="#101010" />
        <meta name="theme-color" content="#ffffff" />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://kxlaa.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kola | Full Stack Engineer" />
        <meta property="og:description" content="Do it with flair ✨" />
        <meta property="og:image" content="/images/og-image.png" />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="https://kxlaa.com/" />
        <meta property="twitter:url" content="https://kxlaa.com/" />
        <meta name="twitter:title" content="Kola | Full Stack Engineer" />
        <meta name="twitter:description" content="Do it with flair ✨" />
        <meta name="twitter:image" content="/images/og-image.png" />
      </Head>

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
