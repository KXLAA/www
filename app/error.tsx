"use client";

import React from "react";
import NextLink from "next/link";
import { BlurImage } from "@/components/blur-image";
import { MainLayout } from "@/components/layout";
import { cx } from "@/lib/cx";

interface Props {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <MainLayout>
      <NextLink href="/">
        <BlurImage
          src="/common/kola-memoji-peeking.png"
          alt="Kola's profile picture"
          width={150}
          height={150}
        />
      </NextLink>

      <h2 className="md:text-5xl text-4xl font-bold leading-relaxed">
        Oh no, something went wrong... maybe{" "}
        <button
          className={cx(
            "underline decoration-dashed decoration-green-10 transition-all duration-150  underline-offset-2",
            "hover:text-green-10 hover:decoration-green-11 w-fit"
          )}
          onClick={reset}
        >
          refresh
        </button>
        ?
      </h2>
    </MainLayout>
  );
}
