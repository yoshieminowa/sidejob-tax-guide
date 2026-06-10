import Link from "next/link";
import { categoryHrefByLabel } from "@/lib/article-types";

export function CategoryCard({ label }: { label: string }) {
  return (
    <Link
      href={categoryHrefByLabel[label] ?? "/articles"}
      className="rounded-lg border border-sky-100 bg-white p-4 text-sm font-bold text-slate-800 shadow-soft transition hover:-translate-y-0.5 hover:border-sky-300"
    >
      {label}
    </Link>
  );
}
