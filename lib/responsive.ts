import { useMediaQuery } from "react-responsive";

import tailwindConfig from "../tailwind.config";

type Sizes = "sm" | "md" | "lg" | "xl" | "2xl";

export function useScreenSize() {
  const screens = tailwindConfig?.theme?.screens || {};

  const sizes = Object.keys(screens).reduce((obj, size) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    obj[size as Sizes] = useMediaQuery({
      minWidth: parseInt(screens[size as Sizes].slice(0, -2)),
    });
    return obj;
  }, {} as Record<Sizes, boolean>);
  return sizes;
}

export function useIsMobile() {
  const isMobile = useMediaQuery({
    maxWidth: parseInt(tailwindConfig.theme.screens?.md.slice(0, -2)),
  });
  return isMobile;
}
