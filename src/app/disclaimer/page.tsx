import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTAButton } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "免責・運営者情報",
  description: "当サイトの免責事項、税務情報の扱い、広告・アフィリエイトリンクに関する説明です。",
  alternates: {
    canonical: "/disclaimer"
  }
};

export default function DisclaimerPage() {
  return (
    <div className="container-page py-10">
      <Breadcrumbs items={[{ label: "免責・運営者情報" }]} />
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold text-slate-950">免責・運営者情報</h1>
        <div className="mt-8 space-y-6 text-sm leading-8 text-slate-700">
          <section className="card">
            <h2 className="text-xl font-bold text-slate-900">情報提供について</h2>
            <p className="mt-3">当サイトは一般的な情報提供を目的として運営しています。</p>
          </section>
          <section className="card">
            <h2 className="text-xl font-bold text-slate-900">税務判断について</h2>
            <p className="mt-3">
              税務判断は個別事情により異なります。診断結果や記事の内容は、税理士など専門家の判断を代替するものではありません。
            </p>
          </section>
          <section className="card">
            <h2 className="text-xl font-bold text-slate-900">相談先について</h2>
            <p className="mt-3">正確な判断は税務署または税理士に相談してください。</p>
          </section>
          <section className="card">
            <h2 className="text-xl font-bold text-slate-900">利用責任について</h2>
            <p className="mt-3">診断結果の利用は自己責任でお願いします。入力データは保存しません。</p>
          </section>
          <section className="card">
            <h2 className="text-xl font-bold text-slate-900">広告について</h2>
            <p className="mt-3">当サイトには広告・アフィリエイトリンクを含む場合があります。</p>
          </section>
        </div>
        <div className="mt-8">
          <CTAButton href="/diagnosis">無料で診断する</CTAButton>
        </div>
      </div>
    </div>
  );
}
