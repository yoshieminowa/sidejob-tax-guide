import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTAButton } from "@/components/CTAButton";
import { categoryPages, getArticlesForCategory, getCategoryBySlug } from "@/lib/articles";
import type { CategoryPage as CategoryPageData } from "@/lib/article-types";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return categoryPages.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) {
    return {};
  }

  return {
    title: category.title,
    description: category.description,
    alternates: {
      canonical: `/category/${category.slug}`
    }
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) {
    notFound();
  }

  const categoryArticles = getArticlesForCategory(category.slug);
  const relatedCategories = category.relatedCategories
    .map((relatedSlug) => getCategoryBySlug(relatedSlug))
    .filter((item): item is CategoryPageData => Boolean(item));

  return (
    <div className="container-page py-10">
      <Breadcrumbs items={[{ label: category.title }]} />
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">{category.title}</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">{category.description}</p>
        </div>
        <CTAButton href="/diagnosis">無料で診断する</CTAButton>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-slate-900">記事一覧</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {categoryArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-slate-900">関連カテゴリ</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {relatedCategories.map((relatedCategory) => (
            <Link
              key={relatedCategory.slug}
              href={`/category/${relatedCategory.slug}`}
              className="rounded-lg border border-sky-100 bg-sky-50 px-4 py-3 text-sm font-bold text-blueDeep transition hover:border-sky-300 hover:bg-white"
            >
              {relatedCategory.title}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
