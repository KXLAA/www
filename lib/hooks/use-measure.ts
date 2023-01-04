import React from "react";

function useCallbackRef<T>() {
  const [ref, setRef] = React.useState<React.MutableRefObject<T> | null>(null);
  const fn = React.useCallback((node: any) => {
    setRef(node);
  }, []);

  return [ref, fn] as const;
}

type Bounds = {
  height: number;
};
export function useMeasure<T>(ref: T) {
  const [element, attachRef] = useCallbackRef<HTMLDivElement>();
  const [bounds, setBounds] = React.useState<Bounds>({} as Bounds);
  console.log("rendering useMeasure");

  React.useEffect(() => {
    function onResize([entry]: ResizeObserverEntry[]) {
      setBounds({
        height: entry.contentRect.height,
      });
    }

    const observer = new ResizeObserver(onResize);

    if (element && element.current) {
      observer.observe(element.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [element]);

  React.useEffect(() => {
    attachRef(ref);
  }, [attachRef, ref]);

  //make it work with ssr
  return bounds;
}
