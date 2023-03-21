import Head from "next/head";
import type { DefaultSeoProps, NextSeoProps } from "next-seo";
import { DefaultSeo as DefaultNextSeo, NextSeo } from "next-seo";

export type SeoProps = NextSeoProps & {
  ogImage?: string;
};

export function Seo(props: SeoProps) {
  const { ogImage, ...meta } = props;
  return (
    <>
      <NextSeo {...meta} />
      <Head>
        <meta name="twitter:image" content={ogImage} />
      </Head>
    </>
  );
}

export function DefaultSeo() {
  const seo: DefaultSeoProps = {
    title: `Kola | Frontend Engineer`,
    description: `Do it with flair ✨`,
    openGraph: {
      title: `Kola | Frontend Engineer`,
      type: "website",
      url: `https://kxlaa.com`,
      images: [
        {
          url: "https://ucarecdn.com/2fecb5b1-ed81-47b7-917d-b5c70f3ed733/mainogimage.jpg",
          width: 1200,
          height: 600,
          alt: `Kola | Frontend Engineer`,
        },
      ],
    },
    twitter: {
      handle: `@kxlaa_`,
      site: `@kxlaa_`,
      cardType: "summary_large_image",
    },
  };

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
        <meta
          name="twitter:image"
          content="https://ucarecdn.com/2fecb5b1-ed81-47b7-917d-b5c70f3ed733/mainogimage.jpg"
        />
      </Head>

      <DefaultNextSeo {...seo} />
    </>
  );
}
