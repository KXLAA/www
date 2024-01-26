import React from "react";

export function useHideOnScroll(height?: number) {
  const [isHidden, setIsHidden] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      const heightToHideFrom = height || 280;
      const winScroll = window.scrollY;

      if (winScroll >= heightToHideFrom) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [height]);

  return isHidden;
}
