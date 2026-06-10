import { getArticleSummaries } from "@/lib/articles";
import { articleUrl, escapeXml, siteDescription, siteTitle, siteUrl } from "@/lib/feed";

export function GET() {
  const now = new Date().toUTCString();
  const items = getArticleSummaries()
    .map(
      (article) => `
        <item>
          <title>${escapeXml(article.title)}</title>
          <link>${articleUrl(article)}</link>
          <guid>${articleUrl(article)}</guid>
          <description>${escapeXml(article.description)}</description>
          <category>${escapeXml(article.category)}</category>
          <pubDate>${now}</pubDate>
        </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>${escapeXml(siteTitle)}</title>
        <link>${siteUrl}</link>
        <description>${escapeXml(siteDescription)}</description>
        <language>ja</language>
        <lastBuildDate>${now}</lastBuildDate>
        ${items}
      </channel>
    </rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8"
    }
  });
}
