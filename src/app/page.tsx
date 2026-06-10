import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { CategoryCard } from "@/components/CategoryCard";
import { CTAButton } from "@/components/CTAButton";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { FreeGuideCTA } from "@/components/FreeGuideCTA";
import { sideJobLinks } from "@/data/site";
import { categories } from "@/lib/article-types";
import { getArticleSummaries, getPopularArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "副業の税金、申告が必要かざっくり診断",
  description:
    "副業収入・経費・働き方を入力するだけで、確定申告や住民税の注意点を簡単に確認できます。",
  alternates: {
    canonical: "/"
  }
};

export default function HomePage() {
  const articles = getArticleSummaries();
  const popularArticles = getPopularArticles(5);

  return (
    <div>
      <section className="bg-gradient-to-b from-sky-50 to-white">
        <div className="container-page grid gap-8 py-14 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <p className="mb-4 w-fit rounded-full bg-white px-4 py-2 text-sm font-bold text-blueDeep shadow-soft">
              初心者向け・入力データ保存なし
            </p>
            <h1 className="max-w-4xl text-3xl font-bold leading-tight text-slate-950 sm:text-5xl">
              <span className="inline-block">副業の税金、</span>
              <span className="inline-block">申告が必要か</span>
              <span className="inline-block whitespace-nowrap">ざっくり診断</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-700 sm:text-lg">
              副業収入・経費・働き方を入力するだけで、確定申告や住民税の注意点を簡単に確認できます。
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <CTAButton href="/diagnosis">無料で診断する</CTAButton>
              <CTAButton href="/articles" variant="secondary">
                記事を読む
              </CTAButton>
            </div>
          </div>
          <div className="card">
            <p className="text-sm font-bold text-blueDeep">ざっくり診断でわかること</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
              <li>確定申告が必要になる可能性</li>
              <li>住民税で注意すること</li>
              <li>経費にできる可能性があるもの</li>
              <li>会計ソフトや相談先の選び方</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="rounded-lg border border-sky-100 bg-white p-6 shadow-soft md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-bold text-blueDeep">無料特典</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-950">まずは無料ガイドから</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                副業の税金で最初につまずきやすいポイントをまとめています。
              </p>
            </div>
            <CTAButton href="/free-guide">無料で受け取る</CTAButton>
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <h2 className="text-2xl font-bold text-slate-900">このサイトでわかること</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {["確定申告が必要か", "住民税で注意すること", "経費にできる可能性があるもの", "会計ソフトや相談先の選び方"].map(
            (item) => (
              <div key={item} className="card">
                <p className="text-lg font-bold text-slate-900">{item}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">まず確認したいポイントをやさしく整理します。</p>
              </div>
            )
          )}
        </div>
      </section>

      <section className="container-page py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">人気記事ランキング</h2>
            <p className="mt-2 text-sm text-slate-600">検索流入後によく読まれるテーマをまとめました。</p>
          </div>
          <Link href="/articles" className="text-sm font-bold text-blueDeep">
            記事一覧へ
          </Link>
        </div>
        <div className="mt-6 grid gap-3">
          {popularArticles.map((article, index) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="flex items-center gap-4 rounded-lg border border-sky-100 bg-white p-4 shadow-soft transition hover:border-sky-300 hover:bg-sky-50"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blueMain text-sm font-bold text-white">
                {index + 1}位
              </span>
              <span>
                <span className="block text-base font-bold text-slate-900">{article.title}</span>
                <span className="mt-1 block text-xs font-bold text-blueDeep">{article.category}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-12">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">副業別リンク</h2>
              <p className="mt-2 text-sm text-slate-600">自分の副業に近いテーマから確認できます。</p>
            </div>
            <Link href="/articles" className="text-sm font-bold text-blueDeep">
              記事一覧へ
            </Link>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sideJobLinks.map((item) => (
              <Link key={item.label} href={item.href} className="card text-base font-bold hover:border-sky-300">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-2xl font-bold text-slate-900">カテゴリから探す</h2>
          <CTAButton href="/diagnosis" variant="secondary">
            先に診断する
          </CTAButton>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category} label={category} />
          ))}
        </div>
      </section>

      <section className="container-page py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-2xl font-bold text-slate-900">新着記事</h2>
          <Link href="/articles" className="text-sm font-bold text-blueDeep">
            すべて見る
          </Link>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {articles.slice(0, 3).map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      <section className="container-page">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <FreeGuideCTA compact />
          <DisclaimerBox />
        </div>
      </section>
    </div>
  );
}
