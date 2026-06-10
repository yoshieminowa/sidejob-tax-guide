import fs from "node:fs";
import path from "node:path";
import {
  categoryPages,
  type Article,
  type ArticleCategory,
  type ArticleFAQ,
  type ArticleSummary,
  type CategoryPage
} from "@/lib/article-types";

const contentDirectory = path.join(process.cwd(), "content", "articles");

type Frontmatter = Record<string, string>;

function parseFrontmatter(file: string): { data: Frontmatter; content: string } {
  const match = file.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return { data: {}, content: file.trim() };
  }

  const data = match[1].split("\n").reduce<Frontmatter>((acc, line) => {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) {
      return acc;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();
    acc[key] = value;
    return acc;
  }, {});

  return { data, content: match[2].trim() };
}

function parseList(value?: string): string[] {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseBoolean(value?: string) {
  return value === "true";
}

function buildDefaultFaq(title: string): ArticleFAQ[] {
  const subject = title.replace(/｜.*/, "").replace(/の税金.*/, "");

  return [
    {
      question: `${subject}の収入に税金はかかる？`,
      answer: "収入から必要経費を差し引いた所得がある場合、税金や申告の確認が必要になる場合があります。"
    },
    {
      question: "20万円以下なら申告不要？",
      answer: "所得税の確定申告が不要な場合がありますが、住民税の申告が必要になる場合があります。"
    },
    {
      question: "住民税はどうなる？",
      answer: "住民税は所得税と扱いが異なるため、少額の所得でも自治体への確認が必要になる場合があります。"
    },
    {
      question: "この情報だけで判断できますか？",
      answer: "いいえ。この診断は一般的な情報をもとにした目安です。"
    }
  ];
}

function markdownToFaq(markdown: string, title: string): ArticleFAQ[] {
  const faqStart = markdown.indexOf("## よくある質問");
  if (faqStart === -1) {
    return buildDefaultFaq(title);
  }

  const faqBlock = markdown.slice(faqStart).split(/\n## /)[0];
  const matches = Array.from(faqBlock.matchAll(/### (.+)\n([\s\S]*?)(?=\n### |\n*$)/g));
  const faqs = matches.map((match) => ({
    question: match[1].trim(),
    answer: match[2].replace(/\n+/g, " ").trim()
  }));

  return faqs.length > 0 ? faqs : buildDefaultFaq(title);
}

function toArticle(fileName: string): Article {
  const file = fs.readFileSync(path.join(contentDirectory, fileName), "utf8");
  const { data, content } = parseFrontmatter(file);
  const title = data.title ?? data.slug ?? fileName.replace(/\.md$/, "");

  return {
    slug: data.slug ?? fileName.replace(/\.md$/, ""),
    title,
    seoTitle: data.seoTitle ?? title,
    description: data.description ?? "",
    updatedAt: data.updatedAt ?? "2026-06-08",
    keywords: parseList(data.keywords),
    ogImage: data.ogImage ?? "/og/default.png",
    category: (data.category ?? "税金基礎") as ArticleCategory,
    categorySlug: data.categorySlug ?? "tax",
    featured: parseBoolean(data.featured),
    popular: parseBoolean(data.popular),
    relatedArticles: parseList(data.relatedArticles),
    content,
    faq: markdownToFaq(content, title)
  };
}

export function getAllArticles(): Article[] {
  return fs
    .readdirSync(contentDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map(toArticle)
    .sort((a, b) => Number(b.featured) - Number(a.featured) || a.title.localeCompare(b.title, "ja"));
}

export function getArticleSummaries(): ArticleSummary[] {
  return getAllArticles().map(({ content, ...article }) => article);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((article) => article.slug === slug);
}

export function getPopularArticles(limit = 5): ArticleSummary[] {
  return getArticleSummaries()
    .filter((article) => article.popular)
    .slice(0, limit);
}

export function getCategoryBySlug(slug: string): CategoryPage | undefined {
  return categoryPages.find((category) => category.slug === slug);
}

export function getArticlesForCategory(categorySlug: string): ArticleSummary[] {
  const category = getCategoryBySlug(categorySlug);
  if (!category) {
    return [];
  }

  return getArticleSummaries().filter((article) => category.categoryNames.includes(article.category));
}

export function getRelatedArticlesForArticle(article: Article, limit = 4): ArticleSummary[] {
  const articles = getArticleSummaries();
  const selected = new Map<string, ArticleSummary>();
  const addArticle = (candidate?: ArticleSummary) => {
    if (!candidate || candidate.slug === article.slug || selected.has(candidate.slug)) {
      return;
    }
    selected.set(candidate.slug, candidate);
  };

  article.relatedArticles.forEach((slug) => addArticle(articles.find((candidate) => candidate.slug === slug)));
  articles.filter((candidate) => candidate.category === article.category).forEach(addArticle);
  articles.filter((candidate) => candidate.category === "税金基礎").forEach(addArticle);
  articles.forEach(addArticle);

  return Array.from(selected.values()).slice(0, limit);
}

export { categoryPages };
