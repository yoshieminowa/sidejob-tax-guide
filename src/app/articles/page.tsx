import type { Metadata } from "next";
import { ArticleSearchFilter } from "@/components/ArticleSearchFilter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTAButton } from "@/components/CTAButton";
import { CategoryCard } from "@/components/CategoryCard";
import { categories } from "@/lib/article-types";
import { getArticleSummaries } from "@/lib/articles";

export const metadata: Metadata = {
  title: "副業税金の記事一覧",
  description: "確定申告、住民税、経費、副業別ガイドなど、副業の税金に関する初心者向け記事一覧です。",
  alternates: {
    canonical: "/articles"
  }
};

export default function ArticlesPage() {
  const articles = getArticleSummaries();

  return (
    <div className="container-page py-10">
      <Breadcrumbs items={[{ label: "記事一覧" }]} />
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">副業税金の記事一覧</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
            気になるテーマから、副業の確定申告・住民税・経費の考え方を確認できます。
          </p>
        </div>
        <CTAButton href="/diagnosis">無料で診断する</CTAButton>
      </div>
      <section className="mt-8">
        <h2 className="text-xl font-bold text-slate-900">カテゴリ</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category} label={category} />
          ))}
        </div>
      </section>
      <section className="mt-10">
        <h2 className="text-xl font-bold text-slate-900">記事を探す</h2>
        <ArticleSearchFilter articles={articles} categories={[...categories]} />
      </section>
    </div>
  );
}
