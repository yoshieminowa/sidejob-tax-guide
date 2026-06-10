import Link from "next/link";
import type { DiagnosisOutput, Recommendation, RiskLevel } from "@/lib/diagnosis";

const riskStyles: Record<RiskLevel, string> = {
  低: "bg-emerald-50 text-emerald-700 border-emerald-100",
  中: "bg-amber-50 text-amber-700 border-amber-100",
  高: "bg-rose-50 text-rose-700 border-rose-100",
  要確認: "bg-slate-100 text-slate-700 border-slate-200"
};

function RecommendationList({ items }: { items: Recommendation[] }) {
  return (
    <div className="mt-3 grid gap-3">
      {items.map((item) => (
        <Link
          key={`${item.href}-${item.title}`}
          href={item.href}
          className="rounded-lg border border-sky-100 bg-sky-50 p-4 transition hover:border-sky-300 hover:bg-white"
        >
          <span className="text-sm font-bold text-blueDeep">{item.title}</span>
          <span className="mt-1 block text-xs leading-6 text-slate-600">{item.description}</span>
        </Link>
      ))}
    </div>
  );
}

function formatSignedAmount(value: number) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toLocaleString()}円`;
}

export function DiagnosisResult({ result }: { result: DiagnosisOutput }) {
  const thresholdTone =
    result.thresholdDifference > 0
      ? "border-rose-100 bg-rose-50 text-rose-700"
      : "border-emerald-100 bg-emerald-50 text-emerald-700";

  return (
    <section className="space-y-4" aria-live="polite">
      <div className="card border-blueMain">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-blueDeep">判定結果</p>
            <h2 className="mt-2 text-2xl font-bold leading-9 text-slate-900">{result.judgement}</h2>
          </div>
          <span className={`rounded-full border px-4 py-2 text-sm font-bold ${riskStyles[result.riskLevel]}`}>
            リスクレベル：{result.riskLevel}
          </span>
        </div>

        <dl className="mt-5 grid gap-3 rounded-lg bg-sky-50 p-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-slate-500">年間収入</dt>
            <dd className="font-bold">{result.income.toLocaleString()}円</dd>
          </div>
          <div>
            <dt className="text-slate-500">年間経費</dt>
            <dd className="font-bold">{result.expenses.toLocaleString()}円</dd>
          </div>
          <div>
            <dt className="text-slate-500">所得金額</dt>
            <dd className="font-bold">{result.profit.toLocaleString()}円</dd>
          </div>
          <div className={`rounded-lg border px-3 py-2 ${thresholdTone}`}>
            <dt className="text-xs font-bold">20万円基準との差</dt>
            <dd className="mt-1 text-lg font-bold">{formatSignedAmount(result.thresholdDifference)}</dd>
          </div>
        </dl>
      </div>

      <div className="card p-4">
        <h3 className="text-lg font-bold text-slate-900">理由</h3>
        <p className="mt-3 text-sm leading-7 text-slate-700">{result.reason}</p>
      </div>

      <div className="card p-4">
        <h3 className="text-lg font-bold text-slate-900">注意点</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
          {result.cautions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="card p-4">
        <h3 className="text-lg font-bold text-slate-900">次にやること</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
          {result.nextActions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="card p-4">
          <h3 className="text-lg font-bold text-slate-900">おすすめ記事</h3>
          <RecommendationList items={result.recommendedArticles} />
          <Link
            href="/articles"
            className="mt-3 inline-flex w-full items-center justify-center rounded-lg border border-sky-200 bg-white px-4 py-3 text-sm font-bold text-blueDeep transition hover:bg-sky-50"
          >
            関連記事をもっと見る
          </Link>
        </div>
        <div className="card p-4">
          <h3 className="text-lg font-bold text-slate-900">おすすめサービス</h3>
          <div className="mt-3 rounded-lg border border-sky-100 bg-white p-4">
            <p className="text-xs font-bold text-blueDeep">無料PDF</p>
            <p className="mt-1 text-sm font-bold text-slate-900">診断結果を理解するための副業税金スタートガイド</p>
            <Link
              href="/free-guide"
              className="mt-3 inline-flex w-full justify-center rounded-lg bg-blueMain px-4 py-3 text-sm font-bold text-white transition hover:bg-blueDeep"
            >
              無料ダウンロード
            </Link>
          </div>
          <RecommendationList items={result.recommendedServices} />
        </div>
      </div>

      <div className="card p-4">
        <h3 className="text-lg font-bold text-slate-900">よくある質問</h3>
        <div className="mt-3 space-y-3">
          {result.faqs.map((faq) => (
            <details key={faq.question} className="rounded-lg border border-sky-100 bg-sky-50 p-4">
              <summary className="cursor-pointer text-sm font-bold text-slate-900">{faq.question}</summary>
              <p className="mt-3 text-sm leading-7 text-slate-700">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>

      <p className="rounded-lg border border-sky-100 bg-white p-4 text-xs leading-6 text-slate-600">
        この診断は一般的な情報をもとにした目安です。税務判断は個別事情により異なります。
        正確な判断は税務署または税理士に確認してください。
      </p>
    </section>
  );
}
