/* eslint-disable react/no-unescaped-entities */

import { Footer } from "@/components/common/Footer";

export function About() {
  return (
    <div className="max-w-[540px] flex flex-col gap-4 mt-24">
      <h1 className="text-4xl font-medium">
        Hello, I'm <span className="text-blue-500">Kolade</span>
      </h1>
      <p className="text-2xl font-light">
        Software Engineer with hands on experience in building client &
        server-side web applications using Typescript.{" "}
      </p>

      <p className="text-2xl font-light">
        Currently building products at{" "}
        <a
          href="https://www.zeiq.co/"
          className="text-silver-50 border-shark-600"
        >
          Super
        </a>
        .
      </p>

      <Footer />
    </div>
  );
}
