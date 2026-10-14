export interface Author {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  keyTakeaways?: string[];
  pullQuote?: {
    text: string;
    attribution?: string;
  };
}

export interface Comment {
  id: string;
  author: string;
  role?: string;
  avatar?: string;
  timestamp: string;
  content: string;
  likes: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  author: Author;
  publishedDate: string;
  readTime: string;
  readTimeMinutes: number;
  image: string;
  imageCaption?: string;
  featured?: boolean;
  tags: string[];
  introduction: string;
  sections: ArticleSection[];
  conclusion: string;
  initialLikes: number;
  initialComments: Comment[];
}
