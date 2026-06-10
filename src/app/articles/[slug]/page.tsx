import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleTemplate } from "@/components/ArticleTemplate";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedArticles } from "@/components/RelatedArticles";
import { getAllArticles, getArticleBySlug, getRelatedArticlesForArticle } from "@/lib/articles";
import { categoryHrefByLabel } from "@/lib/article-types";
import { siteUrl } from "@/lib/site-url";

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) {
    return {};
  }
  return {
    title: article.seoTitle,
    description: article.description,
    keywords: article.keywords,
    alternates: {
      canonical: `/articles/${article.slug}`
    },
    openGraph: {
      title: article.seoTitle,
      description: article.description,
      url: `${siteUrl}/articles/${article.slug}`,
      images: [article.ogImage]
    }
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticlesForArticle(article, 4);
  const articleUrl = `${siteUrl}/articles/${article.slug}`;
  const categoryUrl = `${siteUrl}${categoryHrefByLabel[article.category] ?? "/articles"}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    mainEntityOfPage: articleUrl,
    author: {
      "@type": "Organization",
      name: "副業の税金ざっくり診断"
    },
    publisher: {
      "@type": "Organization",
      name: "副業の税金ざっくり診断"
    }
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faq.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "ホーム",
        item: siteUrl
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "記事一覧",
        item: `${siteUrl}/articles`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.category,
        item: categoryUrl
      },
      {
        "@type": "ListItem",
        position: 4,
        name: article.title,
        item: articleUrl
      }
    ]
  };

  return (
    <div className="container-page py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Breadcrumbs
        items={[
          { label: "記事一覧", href: "/articles" },
          { label: article.category, href: categoryHrefByLabel[article.category] ?? "/articles" },
          { label: article.title }
        ]}
      />
      <ArticleTemplate article={article} />
      <RelatedArticles articles={relatedArticles} />
    </div>
  );
}
