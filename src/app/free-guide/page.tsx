import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "副業税金スタートガイド｜無料PDFプレゼント",
  description: "副業初心者向けに確定申告や住民税の基本をまとめた無料ガイドを配布中。",
  alternates: {
    canonical: "/free-guide"
  }
};

const guideContents = ["確定申告の基本", "20万円ルール", "住民税の注意点", "経費の考え方", "副業別チェックリスト"];

export default function FreeGuidePage() {
  return (
    <div className="container-page py-10">
      <Breadcrumbs items={[{ label: "副業税金スタートガイド" }]} />
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div>
          <p className="mb-4 w-fit rounded-full bg-sky-100 px-4 py-2 text-sm font-bold text-blueDeep">
            無料PDFプレゼント
          </p>
          <h1 className="text-3xl font-bold leading-tight text-slate-950 sm:text-4xl">副業税金スタートガイド</h1>
          <p className="mt-5 text-base leading-8 text-slate-700">
            副業初心者が最初につまずきやすい、確定申告・住民税・経費の考え方をまとめた無料ガイドです。
          </p>
          <div className="mt-8 card">
            <h2 className="text-xl font-bold text-slate-950">ガイドの内容</h2>
            <ul className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              {guideContents.map((item) => (
                <li key={item} className="rounded-lg bg-sky-50 px-4 py-3 font-bold">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <LeadForm />
      </section>
    </div>
  );
}
