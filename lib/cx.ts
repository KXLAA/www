import type { ClassValue } from "clsx";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge classes with tailwind-merge with clsx full feature */
export function cx(...classes: ClassValue[]) {
  return twMerge(clsx(...classes));
}

//https://github.com/theodorusclarence/ts-nextjs-tailwind-starter/blob/main/src/components/buttons/Button.tsx
