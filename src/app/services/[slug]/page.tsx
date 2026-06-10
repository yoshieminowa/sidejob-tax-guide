import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQList } from "@/components/FAQList";
import { accountingServices, getAccountingServiceBySlug } from "@/lib/accounting-services";

type ServiceDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const relatedArticles = [
  {
    title: "副業20万円ルール",
    description: "会社員の副業で確定申告が必要になる可能性と住民税の注意点を確認できます。",
    href: "/articles/side-job-20man-rule"
  },
  {
    title: "副業で経費にできるもの一覧",
    description: "パソコン代・通信費・ツール代など、副業経費の考え方を整理しています。",
    href: "/articles/expenses-list"
  }
];

export function generateStaticParams() {
  return accountingServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getAccountingServiceBySlug(slug);
  if (!service) {
    return {};
  }

  return {
    title: `${service.name}の特徴｜副業向け会計ソフト比較`,
    description: `${service.name}のサービス概要、向いている人、メリット・デメリット、料金概要を副業初心者向けに整理します。`,
    alternates: {
      canonical: `/services/${service.slug}`
    }
  };
}

function BulletCard({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="card">
      <h2 className="text-xl font-bold text-slate-950">{title}</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = getAccountingServiceBySlug(slug);
  if (!service) {
    notFound();
  }

  return (
    <div className="container-page py-10">
      <Breadcrumbs
        items={[
          { label: "副業向けサービス比較", href: "/services" },
          { label: service.name }
        ]}
      />

      <section className="rounded-lg bg-gradient-to-br from-sky-50 to-white p-6 shadow-soft md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 w-fit rounded-full bg-white px-4 py-2 text-sm font-bold text-blueDeep shadow-soft">
              {service.type}
            </p>
            <h1 className="text-3xl font-bold leading-tight text-slate-950 sm:text-4xl">{service.name}の特徴</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-700">{service.summary}</p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-lg border border-sky-200 bg-white px-5 py-3 text-sm font-bold text-blueDeep transition hover:bg-sky-50"
          >
            比較ページへ戻る
          </Link>
        </div>
      </section>

      <p className="mt-6 rounded-lg bg-amber-50 p-4 text-sm leading-7 text-amber-800">
        現在はアフィリエイトリンクを設置していません。後から公式サイトや広告リンクを追加する場合は、サービスデータの
        <code className="mx-1 rounded bg-white px-1 py-0.5">affiliateHref</code>
        を差し替える想定です。
      </p>

      <section className="mt-12 card">
        <h2 className="text-2xl font-bold text-slate-950">サービス概要</h2>
        <p className="mt-4 text-sm leading-8 text-slate-700">{service.overview}</p>
      </section>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <BulletCard title="向いている人" items={service.bestFor} />
        <BulletCard title="メリット" items={service.merits} />
        <BulletCard title="デメリット" items={service.demerits} />
        <BulletCard title="料金概要" items={service.pricing} />
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-950">よくある質問</h2>
        <div className="mt-5">
          <FAQList faqs={service.faq} />
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-950">関連記事</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">会計ソフトを選ぶ前に、申告と経費の基本も確認できます。</p>
          </div>
          <Link href="/services" className="text-sm font-bold text-blueDeep hover:underline">
            比較ページへ戻る
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {relatedArticles.map((article) => (
            <Link key={article.href} href={article.href} className="card transition hover:border-sky-300 hover:bg-sky-50">
              <h3 className="text-lg font-bold text-slate-950">{article.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{article.description}</p>
              <span className="mt-4 inline-flex text-sm font-bold text-blueDeep">記事を読む</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-lg bg-slate-900 p-6 text-white md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">自分に合うか迷う方へ</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-200">
              副業収入や経費を入力して、申告の目安や次にやることを確認できます。
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
