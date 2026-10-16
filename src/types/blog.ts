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
  isQuestionH2?: boolean;
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

export interface FAQItem {
  question: string;
  answer: string;
}

export interface InternalLinkItem {
  anchorText: string;
  targetId: string;
  targetSlug: string;
  context: string;
}

export interface ExternalLinkItem {
  anchorText: string;
  url: string;
  publisher: string;
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
  imageAlt: string;
  imageCaption?: string;
  featured?: boolean;
  tags: string[];
  primaryKeyword: string;
  secondaryKeywords: [string, string];
  searchIntent: string;
  seoTitle: string;
  seoDescription: string;
  canonicalPath: string;
  introduction: string;
  sections: ArticleSection[];
  conclusion: string;
  initialLikes: number;
  initialComments: Comment[];
  faqs: FAQItem[];
  internalLinks: InternalLinkItem[];
  externalLinks: ExternalLinkItem[];
}
