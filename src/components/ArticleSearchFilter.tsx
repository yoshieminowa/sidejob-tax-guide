"use client";

import { useMemo, useState } from "react";
import { ArticleCard } from "@/components/ArticleCard";
import type { ArticleSummary } from "@/lib/article-types";

export function ArticleSearchFilter({ articles, categories }: { articles: ArticleSummary[]; categories: string[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("すべて");

  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesCategory = category === "すべて" || article.category === category;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        article.title.toLowerCase().includes(normalizedQuery) ||
        article.description.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [articles, category, query]);

  return (
    <section className="mt-10">
      <div className="rounded-lg border border-sky-100 bg-white p-5 shadow-soft">
        <div className="grid gap-4 md:grid-cols-[1fr_220px]">
          <label className="grid gap-2 text-sm font-bold text-slate-900">
            記事を検索
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="例：AI副業、住民税、経費"
              className="min-h-12 rounded-lg border border-sky-100 px-4 text-base font-normal outline-none transition focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-900">
            カテゴリ
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="min-h-12 rounded-lg border border-sky-100 px-4 text-base font-normal outline-none transition focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
            >
              <option>すべて</option>
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>
        <p className="mt-3 text-sm text-slate-500">{filteredArticles.length}件の記事を表示しています。</p>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
      {filteredArticles.length === 0 ? (
        <div className="mt-5 rounded-lg border border-sky-100 bg-sky-50 p-5 text-sm leading-7 text-slate-600">
          該当する記事が見つかりませんでした。キーワードを短くするか、カテゴリを「すべて」に戻して探してみてください。
        </div>
      ) : null}
    </section>
  );
}
