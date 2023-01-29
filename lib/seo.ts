import type { DefaultSeoProps, NextSeoProps } from "next-seo";

export type MetaProps = NextSeoProps;

const title = `Kola`;
const description = `Do it with flair ✨`;

export const seo: DefaultSeoProps = {
  title: `Kola | Full Stack Engineer`,
  description,
  openGraph: {
    title,
    type: "website",
    url: `https://kxlaa.com`,
    site_name: title,
    images: [
      {
        url: "@/public/images/og-image.png",
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    handle: `@kxlaa_`,
    cardType: "summary_large_image",
  },
};
