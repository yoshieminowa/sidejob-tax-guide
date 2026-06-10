import type { ArticleFAQ } from "@/lib/article-types";

export function FAQList({ faqs }: { faqs: ArticleFAQ[] }) {
  return (
    <div className="grid gap-3">
      {faqs.map((faq) => (
        <details key={faq.question} className="rounded-lg border border-sky-100 bg-sky-50 p-4">
          <summary className="cursor-pointer text-sm font-bold text-slate-900">{faq.question}</summary>
          <p className="mt-3 text-sm leading-7 text-slate-700">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
