import Link from "next/link";
import type { ArticleSummary } from "@/lib/article-types";

export function ArticleCard({ article }: { article: ArticleSummary }) {
  return (
    <article className="card flex h-full flex-col gap-3">
      <span className="w-fit rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-blueDeep">
        {article.category}
      </span>
      <h2 className="text-lg font-bold leading-7 text-slate-900">
        <Link href={`/articles/${article.slug}`} className="hover:text-blueDeep">
          {article.title}
        </Link>
      </h2>
      <p className="text-sm leading-7 text-slate-600">{article.description}</p>
      <Link href={`/articles/${article.slug}`} className="mt-auto text-sm font-bold text-blueDeep">
        記事を読む
      </Link>
    </article>
  );
}
