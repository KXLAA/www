import {
  Disclosure,
  DisclosureContent,
  useDisclosureState,
} from "ariakit/disclosure";

import { cx } from "@/lib/cx";
import type { PostHeading } from "@/types/post";

type PostSideBarProps = {
  tableOfContent?: PostHeading[];
};

export function PostSideBar(props: PostSideBarProps) {
  const disclosure = useDisclosureState();

  const { tableOfContent } = props;
  return (
    <div className="pl-12 md:w-1/3 mt-[1.5em] md:sticky md:top-7 self-start">
      <aside className="w-full">
        <nav className="flex flex-col items-start rounded-md shiny-border">
          <Disclosure
            state={disclosure}
            className="w-full p-4 text-2xl font-semibold text-left text-silver-800"
          >
            <h2>TABLE OF CONTENTS</h2>
          </Disclosure>
          <DisclosureContent state={disclosure}>
            <div className="flex flex-col w-full gap-3 p-4 pt-0">
              {tableOfContent?.map((item) => (
                <a
                  key={item.link}
                  href={item.link}
                  className={cx(
                    "font-extralight text-silver-800",
                    item.level === 2 && "text-lg font-normal text-silver-700",
                    item.level === 3 && "ml-4",
                    item.level === 4 && "ml-8",
                    item.level === 5 && "ml-12",
                    item.level === 6 && "ml-16"
                  )}
                >
                  {item.content}
                </a>
              ))}
            </div>
          </DisclosureContent>
        </nav>
      </aside>
    </div>
  );
}
