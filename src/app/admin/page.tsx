import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleOutlineGenerator } from "@/components/ArticleOutlineGenerator";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { categories } from "@/lib/article-types";
import { getArticleSummaries } from "@/lib/articles";

export const metadata: Metadata = {
  title: "記事生成支援",
  description: "SEO記事のタイトル、meta description、見出し構成、FAQ案、関連記事候補を作成する管理画面です。",
  robots: {
    index: false,
    follow: false
  }
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const canViewAdmin = await isAdminAuthenticated();
  if (!canViewAdmin) {
    notFound();
  }

  const articles = getArticleSummaries();

  return (
    <div className="container-page py-10">
      <Breadcrumbs items={[{ label: "記事生成支援" }]} />
      <div className="mb-8">
        <p className="text-sm font-bold text-blueDeep">管理画面</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">記事生成支援</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
          SEO記事を量産するための構成案作成ツールです。本文は生成せず、編集前の設計だけを出力します。
        </p>
      </div>
      <ArticleOutlineGenerator articles={articles} categories={[...categories]} />
    </div>
  );
}
