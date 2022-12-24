export type PostHeading = {
  id?: string;
  content?: string;
  link?: string;
  level?: number;
};

export function getHeadings(source: string): PostHeading[] {
  //get all heading levels from markdown source, including #, ##, ###, etc.
  const headings = source.match(/#+\s(.*?)\n/g);

  //return array of objects with heading names and ids
  return (
    headings?.map((h, i) => {
      const content = h.match(/#+\s(.*?)\n/)?.[1];
      const type = headings?.[i].match(/#+/)?.[0];
      const slug = content?.replace(/ /g, "-").toLowerCase();
      const link = "#" + slug;
      return {
        id: slug || "",
        content: content || "",
        link: link || "",
        level: type?.length || 0,
      };
    }) || []
  );
}
