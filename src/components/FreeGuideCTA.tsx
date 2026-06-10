import Link from "next/link";

type FreeGuideCTAProps = {
  compact?: boolean;
};

export function FreeGuideCTA({ compact = false }: FreeGuideCTAProps) {
  return (
    <aside className="rounded-lg border border-sky-100 bg-gradient-to-br from-sky-50 to-white p-5 shadow-soft">
      <p className="text-xs font-bold text-blueDeep">無料PDF</p>
      <h2 className={`${compact ? "text-xl" : "text-2xl"} mt-2 font-bold text-slate-950`}>
        副業の税金で損したくない方へ
      </h2>
      <p className="mt-3 text-sm leading-7 text-slate-600">初心者向けPDFを無料配布中</p>
      <Link
        href="/free-guide"
        className="mt-4 inline-flex rounded-lg bg-blueMain px-5 py-3 text-sm font-bold text-white transition hover:bg-blueDeep"
      >
        無料ガイドを受け取る
      </Link>
    </aside>
  );
}
