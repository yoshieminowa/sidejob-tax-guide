import type { ArticleSummary } from "@/lib/article-types";
import { siteUrl } from "@/lib/site-url";

export { siteUrl };

export const siteTitle = "副業の税金ざっくり診断";
export const siteDescription = "副業の確定申告、住民税、経費を初心者向けにやさしく整理する情報サイトです。";

export function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function articleUrl(article: ArticleSummary) {
  return `${siteUrl}/articles/${article.slug}`;
}
