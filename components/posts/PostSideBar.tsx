import type { PostHeading } from "@/types/post";

type PostSideBarProps = {
  tableOfContent?: PostHeading[];
};

export function PostSideBar(props: PostSideBarProps) {
  const { tableOfContent } = props;
  return (
    <div className="pl-12 md:w-1/3 mt-[1.5em] sticky top-7 self-start">
      <aside className="w-full">
        <nav className="p-4 rounded-lg shiny-border">
          <h2>Table of Contents</h2>
          {tableOfContent?.map((item) => (
            <a key={item.link} href={item.link}>
              {item.content}
            </a>
          ))}
        </nav>
      </aside>
    </div>
  );
}
