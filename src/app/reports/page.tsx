import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTAButton } from "@/components/CTAButton";
import { ReportCard } from "@/components/ReportCard";
import { reports } from "@/data/site";

export const metadata: Metadata = {
  title: "有料PDFレポート",
  description: "副業税金ざっくり完全ガイド、経費チェックリスト、住民税ガイドなど販売予定のPDFレポート一覧です。",
  alternates: {
    canonical: "/reports"
  }
};

export default function ReportsPage() {
  return (
    <div className="container-page py-10">
      <Breadcrumbs items={[{ label: "有料PDFレポート" }]} />
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">有料PDFレポート</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
            副業の税金で迷いやすいテーマを、手元で見返しやすいPDFとして販売予定です。
          </p>
        </div>
        <CTAButton href="/diagnosis">無料で診断する</CTAButton>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {reports.map((report) => (
          <ReportCard key={report.title} {...report} />
        ))}
      </div>
    </div>
  );
}
