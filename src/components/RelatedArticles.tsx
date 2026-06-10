import { ArticleCard } from "@/components/ArticleCard";
import type { ArticleSummary } from "@/lib/article-types";

export function RelatedArticles({ articles }: { articles: ArticleSummary[] }) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-slate-900">関連記事</h2>
      <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {articles.slice(0, 4).map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
