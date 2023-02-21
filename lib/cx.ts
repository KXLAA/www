import type { ClassValue } from "clsx";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

//https://github.com/theodorusclarence/ts-nextjs-tailwind-starter/blob/main/src/components/buttons/Button.tsx
export function cx(...classes: ClassValue[]) {
  return twMerge(clsx(...classes));
}
