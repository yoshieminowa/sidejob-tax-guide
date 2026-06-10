export const categories = ["AI副業", "コンテンツ販売", "スキル販売", "フリマ", "SNS", "税金基礎", "経費"] as const;

export type ArticleCategory = (typeof categories)[number];

export type ArticleFAQ = {
  question: string;
  answer: string;
};

export type CategoryPage = {
  slug: string;
  title: string;
  description: string;
  categoryNames: ArticleCategory[];
  relatedCategories: string[];
};

export type Article = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  updatedAt: string;
  keywords: string[];
  ogImage: string;
  category: ArticleCategory;
  categorySlug: string;
  featured: boolean;
  popular: boolean;
  relatedArticles: string[];
  content: string;
  faq: ArticleFAQ[];
};

export type ArticleSummary = Omit<Article, "content">;

export const categoryPages: CategoryPage[] = [
  {
    slug: "skill-sales",
    title: "スキル販売の記事",
    description: "ココナラなどスキル販売で収入がある場合の税金記事をまとめています。",
    categoryNames: ["スキル販売"],
    relatedCategories: ["tax", "ai-side-job", "content-sales"]
  },
  {
    slug: "tax",
    title: "税金基礎の記事",
    description: "副業の確定申告、20万円ルール、住民税など基本の記事をまとめています。",
    categoryNames: ["税金基礎"],
    relatedCategories: ["expense", "ai-side-job", "content-sales"]
  },
  {
    slug: "expense",
    title: "経費の記事",
    description: "副業で経費として考えられる支出や記録方法の記事をまとめています。",
    categoryNames: ["経費"],
    relatedCategories: ["tax", "content-sales", "ai-side-job"]
  },
  {
    slug: "ai-side-job",
    title: "AI副業の記事",
    description: "ChatGPT、画像生成、Canva販売などAI副業の税金記事をまとめています。",
    categoryNames: ["AI副業"],
    relatedCategories: ["tax", "sns", "content-sales"]
  },
  {
    slug: "content-sales",
    title: "コンテンツ販売の記事",
    description: "note、電子書籍、デジタルコンテンツ販売の税金記事をまとめています。",
    categoryNames: ["コンテンツ販売"],
    relatedCategories: ["tax", "expense", "ai-side-job"]
  },
  {
    slug: "note",
    title: "note・コンテンツ販売の記事",
    description: "note販売やコンテンツ販売の税金記事をまとめています。",
    categoryNames: ["コンテンツ販売"],
    relatedCategories: ["tax", "expense", "ai-side-job"]
  },
  {
    slug: "mercari",
    title: "フリマ・せどりの記事",
    description: "メルカリ、フリマ、せどりなど販売系副業の税金記事をまとめています。",
    categoryNames: ["フリマ"],
    relatedCategories: ["tax", "expense", "content-sales"]
  },
  {
    slug: "sns",
    title: "SNS収益の記事",
    description: "YouTube、Instagram、SNS収益の税金記事をまとめています。",
    categoryNames: ["SNS"],
    relatedCategories: ["tax", "ai-side-job", "expense"]
  },
  {
    slug: "blog-sns",
    title: "ブログ・SNS収益の記事",
    description: "YouTube、Instagram、ブログ収益などSNS系副業の税金記事をまとめています。",
    categoryNames: ["SNS"],
    relatedCategories: ["tax", "ai-side-job", "expense"]
  }
];

export const categoryHrefByLabel: Record<string, string> = {
  AI副業: "/category/ai-side-job",
  コンテンツ販売: "/category/content-sales",
  スキル販売: "/category/skill-sales",
  フリマ: "/category/mercari",
  SNS: "/category/sns",
  税金基礎: "/category/tax",
  経費: "/category/expense"
};
