import React from "react";

//https://stackoverflow.com/questions/55023041/react-hooks-how-to-implement-usehideonscroll-hook
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

    console.log("adding listener");
    window.addEventListener("scroll", onScroll);

    return () => {
      console.log("removing listener");
      window.removeEventListener("scroll", onScroll);
    };
  }, [height]);

  return isHidden;
}
