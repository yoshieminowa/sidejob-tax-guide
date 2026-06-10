import Link from "next/link";

const links = [
  { label: "副業20万円以下なら？", href: "/articles/side-job-tax-200000" },
  { label: "経費一覧", href: "/articles/expense-guide" },
  { label: "会計ソフト比較", href: "/services" }
];

export function InternalLinkBox() {
  return (
    <aside className="rounded-lg border border-sky-100 bg-white p-5 shadow-soft">
      <h2 className="text-lg font-bold text-slate-900">関連情報</h2>
      <ul className="mt-3 space-y-2 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="font-bold text-blueDeep hover:underline">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
