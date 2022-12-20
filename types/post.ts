export type AuthorType = {
  name: string;
  picture: string;
};

export type PostHeading = {
  id?: string;
  content?: string;
  link?: string;
  level?: number;
};

export type PostType = {
  slug: string;
  title: string;
  headings?: PostHeading[];
  number?: number;
  description?: string;
  date: string;
  thumbnail?: string;
  tags: string[];
  author: AuthorType;
  duration?: string;
  ogImage: {
    url: string;
  };
};
