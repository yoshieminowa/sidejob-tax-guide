import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-sky-100 bg-slate-50">
      <div className="container-page grid gap-6 py-8 text-sm text-slate-600 md:grid-cols-[1.5fr_1fr]">
        <div>
          <p className="font-bold text-slate-900">副業の税金ざっくり診断</p>
          <p className="mt-2 leading-7">
            副業の確定申告・住民税・経費について、初心者が最初に確認するための情報サイトです。
          </p>
        </div>
        <div className="flex flex-wrap gap-4 md:justify-end">
          <Link href="/diagnosis">診断</Link>
          <Link href="/articles">記事一覧</Link>
          <Link href="/services">おすすめサービス</Link>
          <Link href="/reports">有料レポート</Link>
          <Link href="/disclaimer">免責・運営者情報</Link>
        </div>
      </div>
    </footer>
  );
}
