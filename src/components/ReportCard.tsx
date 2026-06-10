type ReportCardProps = {
  title: string;
  price: string;
  description: string;
  status: string;
};

export function ReportCard({ title, price, description, status }: ReportCardProps) {
  return (
    <article className="card">
      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">{status}</span>
      <h2 className="mt-4 text-xl font-bold text-slate-900">{title}</h2>
      <p className="mt-2 text-2xl font-bold text-blueDeep">{price}</p>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
      <button
        type="button"
        disabled
        className="mt-5 w-full rounded-lg bg-slate-200 px-4 py-3 text-sm font-bold text-slate-500"
      >
        購入準備中
      </button>
    </article>
  );
}
