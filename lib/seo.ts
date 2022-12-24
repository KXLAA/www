import type { DefaultSeoProps, NextSeoProps } from "next-seo";

// import { createOgImage } from "@/lib/createOgImage";

export type MetaProps = NextSeoProps;

const title = `Kolade Afode`;
const description = `Welcome to my digital garden where I share what I'm learning about shipping great products, becoming a better developer and growing a career in tech.`;
const domain = `delba.dev`;
const twitter = `@delba_oliveira`;
const meta = `Frontend Engineer`;

export const seo: DefaultSeoProps = {
  title: title + " | " + meta,
  description,
  openGraph: {
    title,
    type: "website",
    url: `https://${domain}`,
    site_name: title,
    images: [
      //   {
      //     url: createOgImage({ title, meta }),
      //     width: 1600,
      //     height: 836,
      //     alt: title,
      //   },
    ],
  },
  twitter: {
    handle: twitter,
    cardType: "summary_large_image",
  },
};
