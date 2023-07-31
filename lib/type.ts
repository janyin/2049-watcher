interface Post {
  title: string;
  date: string;
  excerpt: string;
  author: {
    name: string;
    picture: string;
  };
  ogImage: {
    url: string;
  };
  content: string;
  slug: string;
}
