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
    const hasDescription = searchParams.has("description");

    // 3: If so, take the passed value. If not, assign a default
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "Some title";

    const description = hasDescription
      ? searchParams.get("description")?.slice(0, 100)
      : "Some description";

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
            backgroundColor: "#111112",
          }}
        >
          <div tw="bg-[#111112] flex">
            <div tw="flex flex-col  w-full py-12 px-4 p-8 items-end">
              <h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left">
                <span tw="text-[#202022]">Article #01</span>
                <span tw="text-[#C0C0C0] underline font-black">
                  Drag & drop in React with Dnd Kit .
                </span>
              </h2>
            </div>

            <div tw="flex flex-col  w-full py-12 px-4 p-8 items-end">
              <h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left">
                <span tw="text-[#202022]">Article #01</span>
                <span tw="text-[#C0C0C0] underline font-black">
                  Drag & drop in React with Dnd Kit .
                </span>
              </h2>
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
