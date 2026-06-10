import { ArticleCTA } from "@/components/ArticleCTA";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { FreeGuideCTA } from "@/components/FreeGuideCTA";
import { InternalLinkBox } from "@/components/InternalLinkBox";
import type { Article } from "@/lib/article-types";
import { extractHeadings, MarkdownContent } from "@/lib/markdown";

export function ArticleTemplate({ article }: { article: Article }) {
  const tableOfContents = extractHeadings(article.content).filter((heading) => heading.level === 2);

  return (
    <article className="mx-auto max-w-3xl">
      <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-blueDeep">{article.category}</span>
      <h1 className="mt-4 text-3xl font-bold leading-tight text-slate-950 sm:text-4xl">{article.title}</h1>
      <p className="mt-5 text-base leading-8 text-slate-700">{article.description}</p>

      <nav className="mt-8 rounded-lg border border-sky-100 bg-sky-50 p-5" aria-label="目次">
        <h2 className="text-lg font-bold text-slate-900">目次</h2>
        <ol className="mt-3 grid gap-2 text-sm text-blueDeep sm:grid-cols-2">
          {tableOfContents.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="font-bold hover:underline">
                {item.text}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-10 space-y-10">
        <MarkdownContent
          markdown={article.content}
          afterFirstH2={
            <aside className="rounded-lg border border-sky-100 bg-sky-50 p-5">
              <h2 className="text-xl font-bold text-slate-950">あなたの場合はどうなる？</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                副業収入と経費を入力すると、申告や住民税の目安を確認できます。
              </p>
              <div className="mt-4">
                <a
                  href="/diagnosis"
                  className="inline-flex rounded-lg bg-blueMain px-5 py-3 text-sm font-bold text-white transition hover:bg-blueDeep"
                >
                  無料診断はこちら
                </a>
              </div>
            </aside>
          }
          afterSecondH2={<InternalLinkBox />}
        />

        <ArticleCTA pattern="diagnosis" />
        <ArticleCTA pattern="services" />
        <FreeGuideCTA />
        <DisclaimerBox />
      </div>
    </article>
  );
}
