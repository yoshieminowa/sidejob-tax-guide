"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

async function subscribeLead(email: string) {
  // Future integration point: replace this with Mailchimp, ConvertKit, or an API route.
  window.localStorage.setItem(
    "side-job-tax-guide-lead",
    JSON.stringify({
      email,
      subscribedAt: new Date().toISOString()
    })
  );
}

export function LeadForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !email.includes("@")) {
      setError("メールアドレスを入力してください。");
      return;
    }

    await subscribeLead(email.trim());
    router.push("/free-guide/thanks");
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      <div>
        <label htmlFor="email" className="text-sm font-bold text-slate-900">
          メールアドレス
        </label>
        <input
          id="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="example@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-2 w-full rounded-lg border border-sky-200 px-4 py-4 text-base outline-none focus:border-blueMain focus:ring-2 focus:ring-sky-100"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "lead-email-error" : undefined}
        />
        {error ? (
          <p id="lead-email-error" className="mt-2 text-sm font-medium text-rose-600">
            {error}
          </p>
        ) : null}
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-blueMain px-5 py-4 text-base font-bold text-white shadow-lg shadow-sky-200 transition hover:bg-blueDeep"
      >
        無料ガイドを受け取る
      </button>
      <p className="text-xs leading-6 text-slate-500">
        現時点ではダミー登録です。将来的にMailchimpやConvertKitなどへ接続できます。
      </p>
    </form>
  );
}
