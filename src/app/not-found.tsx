import Link from "next/link";
import { CTAButton } from "@/components/CTAButton";
import { DisclaimerBox } from "@/components/DisclaimerBox";

export default function NotFound() {
  return (
    <div className="container-page py-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-4 inline-flex rounded-full bg-sky-50 px-4 py-2 text-sm font-bold text-blueDeep">404 Not Found</p>
        <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">ページが見つかりませんでした</h1>
        <p className="mt-5 text-base leading-8 text-slate-600">
          URLが変更されたか、ページが削除された可能性があります。診断ツールや記事一覧から目的の情報を探してみてください。
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <CTAButton href="/diagnosis">無料で診断する</CTAButton>
          <CTAButton href="/articles" variant="secondary">
            記事一覧を見る
          </CTAButton>
        </div>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">
        {[
          { title: "トップページ", href: "/", text: "サイト全体の入口に戻ります。" },
          { title: "サービス比較", href: "/services", text: "会計ソフトや相談先を確認できます。" },
          { title: "無料ガイド", href: "/free-guide", text: "初心者向けPDFの案内ページです。" }
        ].map((item) => (
          <Link key={item.href} href={item.href} className="card block p-5 transition hover:-translate-y-0.5 hover:shadow-md">
            <h2 className="text-lg font-bold text-slate-950">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <DisclaimerBox />
      </div>
    </div>
  );
}
