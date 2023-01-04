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
    const { searchParams } = req.nextUrl;

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
          tw="w-full h-full flex flex-col text-center items-center justify-between py-11"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, #191d21 0%, #605e6755 15%)",
            backgroundSize: "50px 50px",
            maskImage: "radial-gradient(black 0.9px, transparent 0.9px)",
            maskSize: "18px 18px",
          }}
        >
          <div tw="flex flex-col items-center w-full">
            <div tw="flex flex-col p-8 w-full h-full justify-between">
              <div tw="flex flex-col justify-center items-start w-full p-8 self-end rounded-xl">
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
