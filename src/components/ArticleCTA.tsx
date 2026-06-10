import Link from "next/link";

type ArticleCTAProps = {
  pattern: "diagnosis" | "services";
};

const ctaContent = {
  diagnosis: {
    title: "まずは診断してみる",
    description: "副業収入や経費を入力して、申告や住民税の注意点をざっくり確認できます。",
    href: "/diagnosis",
    button: "無料で診断する"
  },
  services: {
    title: "会計ソフトを比較する",
    description: "副業の記録、確定申告、開業準備に役立つサービス候補を確認できます。",
    href: "/services",
    button: "サービスを比較する"
  }
};

export function ArticleCTA({ pattern }: ArticleCTAProps) {
  const item = ctaContent[pattern];

  return (
    <aside className="rounded-lg border border-sky-100 bg-gradient-to-br from-sky-50 to-white p-5 shadow-soft">
      <h2 className="text-xl font-bold text-slate-950">{item.title}</h2>
      <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
      <Link
        href={item.href}
        className="mt-4 inline-flex rounded-lg bg-blueMain px-5 py-3 text-sm font-bold text-white transition hover:bg-blueDeep"
      >
        {item.button}
      </Link>
    </aside>
  );
}
