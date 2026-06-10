import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTAButton } from "@/components/CTAButton";
import { accountingServices } from "@/lib/accounting-services";

export const metadata: Metadata = {
  title: "副業向け会計ソフト比較｜freee・マネーフォワード・弥生を比較",
  description:
    "副業の確定申告や経費管理に役立つ会計ソフトを比較。初心者向けにfreee、マネーフォワード、弥生の特徴をわかりやすく紹介します。",
  alternates: {
    canonical: "/services"
  }
};

const recommendationRows = [
  { person: "初心者", service: "freee" },
  { person: "家計簿も使いたい", service: "マネーフォワード" },
  { person: "費用を抑えたい", service: "弥生" }
];

const faqs = [
  {
    question: "副業でも会計ソフトは必要？",
    answer: "必須とは限りませんが、収入や経費の記録を整理したい場合に役立つ可能性があります。"
  },
  {
    question: "所得が少なくても使う意味はある？",
    answer: "少額でも、領収書や売上の記録を残しておくと住民税申告や翌年以降の確認がしやすくなる場合があります。"
  },
  {
    question: "税理士相談はいつ必要？",
    answer: "所得が大きい場合、経費判断に迷う場合、初めて申告する場合は相談を検討してもよい場合があります。"
  },
  {
    question: "開業届は出した方がいい？",
    answer: "副業の継続性や所得区分、青色申告を検討するかによって判断が変わるため、税務署または税理士に確認してください。"
  }
];

function SectionTitle({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-slate-950">{title}</h2>
      {description ? <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p> : null}
    </div>
  );
}

function AffiliateButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-blueMain px-4 py-3 text-sm font-bold text-white transition hover:bg-blueDeep"
    >
      {children}
    </Link>
  );
}

export default function ServicesPage() {
  return (
    <div className="container-page py-10">
      <Breadcrumbs items={[{ label: "副業向けサービス比較" }]} />

      <section className="rounded-lg bg-gradient-to-br from-sky-50 to-white p-6 shadow-soft md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 w-fit rounded-full bg-white px-4 py-2 text-sm font-bold text-blueDeep shadow-soft">
              アフィリエイトリンク差し替え対応
            </p>
            <h1 className="text-3xl font-bold leading-tight text-slate-950 sm:text-4xl">副業向けサービス比較</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-700">
              副業の記録・確定申告・開業準備をサポートするサービスを比較できます。
            </p>
          </div>
          <CTAButton href="/diagnosis" variant="secondary">
            無料診断に戻る
          </CTAButton>
        </div>
      </section>

      <p className="mt-6 rounded-lg bg-amber-50 p-4 text-sm leading-7 text-amber-800">
        掲載サービスには広告・アフィリエイトリンクを含む場合があります。各サービスの内容や料金は変更される場合があるため、申込前に公式情報を確認してください。
      </p>

      <section className="mt-12">
        <SectionTitle title="会計ソフト比較" description="副業の売上・経費管理に使いやすい候補を、特徴別に整理しています。" />
        <div className="grid gap-5 lg:grid-cols-3">
          {accountingServices.map((service) => (
            <article key={service.name} className="card flex h-full flex-col">
              <p className="w-fit rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-blueDeep">{service.type}</p>
              <h2 className="mt-4 text-2xl font-bold text-slate-950">{service.name}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{service.summary}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {service.features.map((feature) => (
                  <li key={feature} className="rounded-lg bg-sky-50 px-3 py-2">
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <AffiliateButton href={`/services/${service.slug}`}>詳細を見る</AffiliateButton>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <SectionTitle title="こんな人におすすめ" description="状況によって合うサービスは変わります。まずは選び方の目安として確認してください。" />
        <div className="overflow-hidden rounded-lg border border-sky-100 bg-white shadow-soft">
          <table className="w-full text-left text-sm">
            <thead className="bg-sky-50 text-slate-700">
              <tr>
                <th className="px-4 py-3 font-bold">タイプ</th>
                <th className="px-4 py-3 font-bold">向いている場合があるサービス</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-100">
              {recommendationRows.map((row) => (
                <tr key={row.person}>
                  <td className="px-4 py-4 text-slate-700">{row.person}</td>
                  <td className="px-4 py-4 font-bold text-blueDeep">{row.service}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12 grid gap-5 lg:grid-cols-2">
        <div>
          <SectionTitle title="税理士相談" />
          <article className="card h-full">
            <p className="text-xs font-bold text-blueDeep">税理士相談サービス</p>
            <h2 className="mt-2 text-xl font-bold text-slate-950">判断に迷うときの相談先候補</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              所得や経費判断に不安がある場合、税理士相談が向いている場合があります。
            </p>
            <h3 className="mt-5 text-sm font-bold text-slate-900">向いている人</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
              <li>所得が大きい</li>
              <li>経費判断に不安</li>
              <li>初めての申告</li>
            </ul>
            <AffiliateButton href="#">相談先を見る</AffiliateButton>
          </article>
        </div>

        <div>
          <SectionTitle title="開業サービス" />
          <article className="card h-full">
            <p className="text-xs font-bold text-blueDeep">開業サポート</p>
            <h2 className="mt-2 text-xl font-bold text-slate-950">開業届や青色申告の準備候補</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              継続的に副業を行う場合、開業準備サービスが向いている場合があります。
            </p>
            <h3 className="mt-5 text-sm font-bold text-slate-900">向いている人</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
              <li>本格的に副業を始める</li>
              <li>開業届を出したい</li>
              <li>青色申告を検討中</li>
            </ul>
            <AffiliateButton href="#">サービスを見る</AffiliateButton>
          </article>
        </div>
      </section>

      <section className="mt-12">
        <SectionTitle title="よくある質問" />
        <div className="grid gap-3">
          {faqs.map((faq) => (
            <details key={faq.question} className="rounded-lg border border-sky-100 bg-sky-50 p-4">
              <summary className="cursor-pointer text-sm font-bold text-slate-900">{faq.question}</summary>
              <p className="mt-3 text-sm leading-7 text-slate-700">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-lg bg-slate-900 p-6 text-white md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">まだ診断していない方へ</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-200">
              副業収入や経費を入力して、申告の目安を確認できます。
            </p>
          </div>
          <Link
            href="/diagnosis"
            className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-sky-50"
          >
            無料で診断する
          </Link>
        </div>
      </section>
    </div>
  );
}
