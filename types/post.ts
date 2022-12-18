export type AuthorType = {
  name: string;
  picture: string;
};

export type PostType = {
  slug: string;
  title: string;
  description?: string;
  date: string;
  thumbnail?: string;
  tags: string[];
  author: AuthorType;
  duration?: string;
  length?: string;
  ogImage: {
    url: string;
  };
};
