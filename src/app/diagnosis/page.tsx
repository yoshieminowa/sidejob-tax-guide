import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DiagnosisForm } from "@/components/DiagnosisForm";
import { DisclaimerBox } from "@/components/DisclaimerBox";

export const metadata: Metadata = {
  title: "副業の税金ざっくり診断｜確定申告が必要か簡単チェック",
  description:
    "副業収入と経費を入力するだけで、確定申告や住民税の注意点をざっくり確認できます。会社員・AI副業・note販売・メルカリなどに対応。",
  alternates: {
    canonical: "/diagnosis"
  }
};

export default function DiagnosisPage() {
  return (
    <div className="container-page py-10">
      <Breadcrumbs items={[{ label: "診断" }]} />
      <h1 className="text-3xl font-bold text-slate-950">副業の税金ざっくり診断</h1>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
        副業収入・経費・働き方から、確定申告が必要になる可能性や住民税の注意点を確認します。
        診断は一般的な目安であり、入力内容は保存されません。
      </p>
      <div className="mt-8">
        <DiagnosisForm />
      </div>
      <div className="mt-8">
        <DisclaimerBox />
      </div>
    </div>
  );
}
