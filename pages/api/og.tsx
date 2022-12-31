/* eslint-disable import/no-anonymous-default-export */
import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

///http://localhost:3000/api/og?title=test%20title&description=hello%20world,

export default function (req: NextRequest) {
  try {
    // 1: get the searchParams from the request URL
    const { searchParams } = new URL(req.url);

    // 2: Check if title or description are in the params
    const hasTitle = searchParams.has("title");
    const hasDate = searchParams.has("date");

    // 3: If so, take the passed value. If not, assign a default
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "Some title";

    const date = hasDate ? searchParams.get("date")?.slice(0, 100) : "July 30";

    return new ImageResponse(
      (
        // Modified based on https://tailwindui.com/components/marketing/sections/cta-sections
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0D0D0D",
          }}
        >
          <div tw="flex flex-col items-center w-full">
            <div
              tw="h-1/2 w-full"
              style={{
                backgroundImage: generateGradient(),
              }}
            />
            <div tw="flex flex-col p-8 w-full h-full justify-between">
              <div tw="flex flex-col justify-center items-start w-full p-8 self-end rounded-xl border border-[#383838]">
                <div tw="flex text-white">Check Out This Article</div>
                <div tw="flex text-4xl font-bold text-white">{title}</div>
                <div tw="flex font-bold text-white">Kxlaa.com | {date}</div>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 600,
      }
    );
  } catch (e) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}

const hexString = "0123456789abcdef";

function randomColor() {
  let hexCode = "#";
  for (let i = 0; i < 6; i++) {
    hexCode += hexString[Math.floor(Math.random() * hexString.length)];
  }
  return hexCode;
}

function generateGradient() {
  //generate random hex
  // const randomColor = "#000000".replace(/0/g, () => {
  //   return (~~(Math.random() * 16)).toString(16);
  // });

  const colorOne = randomColor();
  const colorTwo = randomColor();
  const angle = Math.floor(Math.random() * 360);

  return `linear-gradient(${angle}deg, ${colorOne}, ${colorTwo})`;
}
