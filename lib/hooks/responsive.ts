import { useMediaQuery } from "react-responsive";

import tailwindConfig from "../../tailwind.config";

type Sizes = "sm" | "md" | "lg" | "xl" | "2xl";

export function useScreenSize() {
  const sizes = Object.keys(tailwindConfig.theme.screens).reduce(
    (obj, size) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      obj[size as Sizes] = useMediaQuery({
        minWidth: parseInt(tailwindConfig?.theme?.screens[size]!.slice(0, -2)),
      });
      return obj;
    },
    {} as Record<Sizes, boolean>
  );
  return sizes;
}

export function useIsMobile() {
  const isMobile = useMediaQuery({
    maxWidth: parseInt(tailwindConfig.theme.screens.md.slice(0, -2)),
  });
  return isMobile;
}
