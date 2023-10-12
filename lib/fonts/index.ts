import localFont from "next/font/local";

export const generalSans = localFont({
  preload: true,
  display: "swap",
  src: [
    {
      path: "./GeneralSans-Bold.woff2",
      style: "normal",
      weight: "700",
    },
    {
      path: "./GeneralSans-Semibold.woff2",
      style: "normal",
      weight: "600",
    },
    {
      path: "./GeneralSans-Medium.woff2",
      style: "normal",
      weight: "500",
    },
    {
      path: "./GeneralSans-Regular.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "./GeneralSans-Light.woff2",
      style: "normal",
      weight: "300",
    },
    {
      path: "./GeneralSans-Extralight.woff2",
      style: "normal",
      weight: "200",
    },
  ],
  variable: "--font-general-sans",
});

export const helios = localFont({
  preload: true,
  display: "swap",
  src: [
    {
      path: "./HeliosExt.woff2",
      weight: "400",
    },
    {
      path: "./HeliosExt-Bold.woff2",
      weight: "700",
    },
  ],
  variable: "--font-helios",
});
