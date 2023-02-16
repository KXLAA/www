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
        <div tw="w-full h-full bg-[#111111] flex flex-col justify-center items-center relative">
          <div tw="flex items-center justify-center -mt-40">
            <div tw="w-[148px] h-[148px] bg-[#282828] ml-4" />
            <div tw="w-[148px] h-[148px] bg-[#1C1C1C] ml-4" />
            <div tw="w-[148px] h-[148px] bg-[#161616] ml-4" />
          </div>
          <div tw="w-full bg-[#161616] p-14 absolute bottom-0 flex gap-3 flex-col">
            <span tw="font-black text-[#464646] text-xl">ARTICLE #01 </span>
            <h1 tw="text-[#999999] font-semibold text-5xl">
              Drag & Drop in React with Dnd Kit
            </h1>
            <span tw="text-[#757575] font-light">February 15, 2023</span>
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
