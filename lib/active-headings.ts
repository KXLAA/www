import React from "react";

type Heading = {
  id: string;
  content: string;
  link: string;
  level: number;
};

export function useActiveHeading(headings: Array<Heading>) {
  const itemIds = headings.map((heading) => heading.id || ``);
  const [activeId, setActiveId] = React.useState(``);
  const observerRef = React.useRef<IntersectionObserver | null>(null);
  React.useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -60% 0%" }
    );

    itemIds.forEach((id) => {
      if (document.getElementById(id)) {
        observerRef.current?.observe(document.getElementById(id)!);
      }
    });

    return () => {
      itemIds.forEach((id) => {
        if (document.getElementById(id)) {
          observerRef.current?.unobserve(document.getElementById(id)!);
        }
      });
    };
  }, [itemIds]);

  return activeId;
}
