import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

const poppins = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  preload: true,
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kxlaa.com"),
  title: {
    default: "Kolade Afode",
    template: "%s | Kolade Afode",
  },
  description: `Do it with flair ✨`,
  openGraph: {
    title: "Kolade Afode",
    description: `Do it with flair ✨`,
    url: "https://kxlaa.com",
    siteName: "Kolade Afode",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://ucarecdn.com/2fecb5b1-ed81-47b7-917d-b5c70f3ed733/mainogimage.jpg",
        width: 1200,
        height: 600,
        alt: `Kola | Frontend Engineer`,
      },
    ],
  },
  robots: {},
  twitter: {
    title: "Kolade Afode",
    card: "summary_large_image",
  },
};
interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className="dark">
      <body className={poppins.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
