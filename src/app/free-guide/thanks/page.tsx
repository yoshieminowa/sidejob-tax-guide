import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "登録ありがとうございます",
  description: "副業税金スタートガイドへの登録完了ページです。",
  alternates: {
    canonical: "/free-guide/thanks"
  }
};

const nextLinks = [
  {
    title: "無料診断",
    description: "副業収入と経費から申告の目安を確認できます。",
    href: "/diagnosis"
  },
  {
    title: "人気記事",
    description: "20万円ルールや経費など、よく読まれる記事を確認できます。",
    href: "/articles"
  },
  {
    title: "サービス比較",
    description: "会計ソフトや税理士相談などの候補を比較できます。",
    href: "/services"
  }
];

export default function FreeGuideThanksPage() {
  return (
    <div className="container-page py-10">
      <Breadcrumbs items={[{ label: "無料ガイド", href: "/free-guide" }, { label: "登録完了" }]} />
      <section className="mx-auto max-w-3xl text-center">
        <p className="mb-4 rounded-full bg-sky-100 px-4 py-2 text-sm font-bold text-blueDeep inline-flex">登録完了</p>
        <h1 className="text-3xl font-bold text-slate-950">登録ありがとうございます。</h1>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          無料ガイドの受け取り準備ができました。続けて、診断や記事でご自身の状況を確認できます。
        </p>
      </section>
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">次におすすめ</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {nextLinks.map((item) => (
            <Link key={item.href} href={item.href} className="card hover:border-sky-300">
              <span className="text-lg font-bold text-blueDeep">{item.title}</span>
              <span className="mt-3 block text-sm leading-7 text-slate-600">{item.description}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
