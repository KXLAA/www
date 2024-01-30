import React from "react";
import NextLink from "next/link";
import { BlurImage } from "@/components/blur-image";
import { MainLayout } from "@/components/layout";
import { cx } from "@/lib/cx";

interface Props {
  error: Error;
  reset: () => void;
}

export default function NotFoundPage() {
  return (
    <MainLayout>
      <NextLink href="/">
        <BlurImage
          src="/common/kola-memoji-scared.png"
          alt="Kola's profile picture"
          width="150"
          height="150"
        />
      </NextLink>

      <h2 className="md:text-5xl text-4xl font-bold leading-relaxed">
        <span className="text-green-10">404</span> - The page you were looking
        for could not be found.
      </h2>

      <NextLink
        href="/"
        className={cx(
          "underline decoration-dashed decoration-green-10 transition-all duration-150  underline-offset-2",
          "hover:text-green-10 hover:decoration-green-11 w-fit"
        )}
      >
        Go back home
      </NextLink>
    </MainLayout>
  );
}
