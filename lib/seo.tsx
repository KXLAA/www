import Head from "next/head";
import type { DefaultSeoProps, NextSeoProps } from "next-seo";
import { NextSeo } from "next-seo";

export type MetaProps = NextSeoProps;

export const seo: DefaultSeoProps = {
  title: `Kola | Full Stack Engineer`,
  description: `Do it with flair ✨`,
  openGraph: {
    title: `Kola | Full Stack Engineer`,
    type: "website",
    url: `https://kxlaa.com`,
    images: [
      {
        url: "https://ucarecdn.com/2fecb5b1-ed81-47b7-917d-b5c70f3ed733/mainogimage.jpg",
        width: 1200,
        height: 600,
        alt: `Kola | Full Stack Engineer`,
      },
    ],
  },
  twitter: {
    handle: `@kxlaa_`,
    site: `@kxlaa_`,
    cardType: "summary_large_image",
  },
};

export type SeoProps = MetaProps & {
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
