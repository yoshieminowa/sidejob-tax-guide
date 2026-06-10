import { getArticleSummaries } from "@/lib/articles";
import { articleUrl, escapeXml, siteDescription, siteTitle, siteUrl } from "@/lib/feed";

export function GET() {
  const updated = new Date().toISOString();
  const entries = getArticleSummaries()
    .map(
      (article) => `
        <entry>
          <title>${escapeXml(article.title)}</title>
          <id>${articleUrl(article)}</id>
          <link href="${articleUrl(article)}" />
          <updated>${updated}</updated>
          <summary>${escapeXml(article.description)}</summary>
          <category term="${escapeXml(article.category)}" />
        </entry>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <feed xmlns="http://www.w3.org/2005/Atom">
      <title>${escapeXml(siteTitle)}</title>
      <id>${siteUrl}</id>
      <link href="${siteUrl}" />
      <link rel="self" href="${siteUrl}/atom.xml" />
      <updated>${updated}</updated>
      <subtitle>${escapeXml(siteDescription)}</subtitle>
      ${entries}
    </feed>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8"
    }
  });
}
