"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { ArticleCategory, ArticleSummary } from "@/lib/article-types";
import { generateArticleOutline } from "@/lib/article-generator";

export function ArticleOutlineGenerator({
  articles,
  categories
}: {
  articles: ArticleSummary[];
  categories: ArticleCategory[];
}) {
  const [title, setTitle] = useState("");
  const [mainKeyword, setMainKeyword] = useState("");
  const [category, setCategory] = useState<ArticleCategory>(categories[0]);
  const [submitted, setSubmitted] = useState(false);

  const canGenerate = title.trim().length > 0 && mainKeyword.trim().length > 0;
  const outline = useMemo(() => {
    if (!submitted || !canGenerate) {
      return null;
    }

    return generateArticleOutline({ title, mainKeyword, category, articles });
  }, [articles, canGenerate, category, mainKeyword, submitted, title]);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="card h-fit">
        <h2 className="text-xl font-bold text-slate-950">構成案を作成</h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          タイトル、メインキーワード、カテゴリを入力すると、記事制作前の構成案を自動で作成します。
        </p>

        <div className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-bold text-slate-900">
            タイトル
            <input
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                setSubmitted(false);
              }}
              placeholder="例：副業でPayPayを受け取ったら税金はかかる？"
              className="min-h-12 rounded-lg border border-sky-100 px-4 text-base font-normal outline-none transition focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
            />
          </label>

          <label className="grid gap-2 text-sm font-bold text-slate-900">
            メインキーワード
            <input
              value={mainKeyword}
              onChange={(event) => {
                setMainKeyword(event.target.value);
                setSubmitted(false);
              }}
              placeholder="例：PayPay 副業 税金"
              className="min-h-12 rounded-lg border border-sky-100 px-4 text-base font-normal outline-none transition focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
            />
          </label>

          <label className="grid gap-2 text-sm font-bold text-slate-900">
            カテゴリ
            <select
              value={category}
              onChange={(event) => {
                setCategory(event.target.value as ArticleCategory);
                setSubmitted(false);
              }}
              className="min-h-12 rounded-lg border border-sky-100 px-4 text-base font-normal outline-none transition focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
            >
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>

        {!canGenerate && submitted ? (
          <p className="mt-4 rounded-lg bg-rose-50 p-3 text-sm font-bold text-rose-700">
            タイトルとメインキーワードを入力してください。
          </p>
        ) : null}

        <button
          type="button"
          onClick={() => setSubmitted(true)}
          className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-blueMain px-5 py-3 text-sm font-bold text-white shadow-lg shadow-sky-200 transition hover:bg-blueDeep"
        >
          構成案を生成する
        </button>
      </section>

      <section className="card">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-blueDeep">生成結果</p>
            <h2 className="mt-1 text-xl font-bold text-slate-950">記事テンプレート案</h2>
          </div>
          <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-blueDeep">
            本文生成なし
          </span>
        </div>

        {outline ? (
          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">title</h3>
              <p className="mt-2 rounded-lg bg-sky-50 p-4 text-sm leading-7 text-slate-700">{outline.title}</p>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">meta description</h3>
              <p className="mt-2 rounded-lg bg-sky-50 p-4 text-sm leading-7 text-slate-700">
                {outline.metaDescription}
              </p>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">見出し構成</h3>
              <ol className="mt-3 space-y-2 text-sm leading-7 text-slate-700">
                {outline.headings.map((heading, index) => (
                  <li key={`${heading.level}-${heading.text}`} className={heading.level === "h3" ? "ml-5" : ""}>
                    <span className="mr-2 rounded bg-sky-100 px-2 py-1 text-xs font-bold text-blueDeep">
                      {heading.level.toUpperCase()}
                    </span>
                    {index + 1}. {heading.text}
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">FAQ案</h3>
              <div className="mt-3 grid gap-3">
                {outline.faq.map((faq) => (
                  <div key={faq.question} className="rounded-lg border border-sky-100 bg-sky-50 p-4">
                    <p className="text-sm font-bold text-slate-900">Q. {faq.question}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-600">A案. {faq.answerHint}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">関連記事候補</h3>
              <div className="mt-3 grid gap-3">
                {outline.relatedArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/articles/${article.slug}`}
                    className="rounded-lg border border-sky-100 bg-white p-4 text-sm transition hover:border-sky-300 hover:bg-sky-50"
                  >
                    <span className="block font-bold text-slate-900">{article.title}</span>
                    <span className="mt-1 block text-xs font-bold text-blueDeep">{article.category}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-lg border border-dashed border-sky-200 bg-sky-50 p-6 text-sm leading-7 text-slate-600">
            入力後に「構成案を生成する」を押すと、title、meta description、見出し構成、FAQ案、関連記事候補がここに表示されます。
          </div>
        )}
      </section>
    </div>
  );
}
