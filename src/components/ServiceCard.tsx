import Link from "next/link";

type ServiceCardProps = {
  title: string;
  category: string;
  description: string;
  href: string;
};

export function ServiceCard({ title, category, description, href }: ServiceCardProps) {
  return (
    <article className="card">
      <p className="text-xs font-bold text-blueDeep">{category}</p>
      <h2 className="mt-2 text-xl font-bold text-slate-900">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
      <Link
        href={href}
        className="mt-5 inline-flex rounded-lg bg-blueMain px-4 py-2 text-sm font-bold text-white hover:bg-blueDeep"
      >
        詳細を見る
      </Link>
    </article>
  );
}
