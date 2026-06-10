"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  buildDiagnosis,
  businessNotificationOptions,
  employmentOptions,
  parseAmount,
  privacyOptions,
  sideJobOptions,
  type BusinessNotificationAnswer,
  type DiagnosisOutput,
  type Employment,
  type PrivacyAnswer,
  type SideJob
} from "@/lib/diagnosis";
import { DiagnosisResult } from "./DiagnosisResult";

type Errors = {
  income?: string;
  expenses?: string;
};

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="mt-2 text-sm font-medium text-rose-600">{message}</p>;
}

function RadioGroup<T extends string>({
  legend,
  name,
  options,
  value,
  onChange
}: {
  legend: string;
  name: string;
  options: T[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-bold text-slate-900">{legend}</legend>
      <div className="mt-2 grid gap-2 sm:grid-cols-3">
        {options.map((option) => (
          <label
            key={option}
            className={`flex cursor-pointer items-center justify-center rounded-lg border px-3 py-3 text-center text-sm font-bold transition ${
              value === option
                ? "border-blueMain bg-sky-50 text-blueDeep"
                : "border-sky-100 bg-white text-slate-700 hover:border-sky-300"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              className="sr-only"
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function DiagnosisForm() {
  const [employment, setEmployment] = useState<Employment>("会社員");
  const [sideJob, setSideJob] = useState<SideJob>("ブログ・アフィリエイト");
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [privacyAnswer, setPrivacyAnswer] = useState<PrivacyAnswer>("該当しない");
  const [businessNotificationAnswer, setBusinessNotificationAnswer] = useState<BusinessNotificationAnswer>("わからない");
  const [errors, setErrors] = useState<Errors>({});
  const [result, setResult] = useState<DiagnosisOutput | null>(null);

  const profitPreview = useMemo(() => {
    const parsedIncome = parseAmount(income);
    const parsedExpenses = parseAmount(expenses);

    if (parsedIncome === null || parsedExpenses === null) {
      return null;
    }

    return parsedIncome - parsedExpenses;
  }, [income, expenses]);

  function validate() {
    const nextErrors: Errors = {};
    const parsedIncome = parseAmount(income);
    const parsedExpenses = parseAmount(expenses);

    if (parsedIncome === null) {
      nextErrors.income = "年間の副業収入を0以上の数値で入力してください。";
    }

    if (parsedExpenses === null) {
      nextErrors.expenses = "年間の副業経費を0以上の数値で入力してください。";
    }

    setErrors(nextErrors);

    if (parsedIncome === null || parsedExpenses === null) {
      return null;
    }

    return {
      income: parsedIncome,
      expenses: parsedExpenses
    };
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = validate();

    if (!values) {
      setResult(null);
      return;
    }

    setResult(
      buildDiagnosis(
        employment,
        sideJob,
        values.income,
        values.expenses,
        privacyAnswer,
        businessNotificationAnswer
      )
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <form onSubmit={handleSubmit} className="card space-y-6" noValidate>
        <div className="rounded-lg bg-sky-50 p-4 text-sm leading-7 text-slate-700">
          個人情報の入力は不要です。収入・経費・働き方だけで、税金まわりの目安を確認できます。
        </div>

        <div>
          <label htmlFor="employment" className="text-sm font-bold text-slate-900">
            本業の状況
          </label>
          <select
            id="employment"
            value={employment}
            onChange={(event) => setEmployment(event.target.value as Employment)}
            className="mt-2 w-full rounded-lg border border-sky-200 bg-white px-4 py-4 text-base outline-none focus:border-blueMain focus:ring-2 focus:ring-sky-100"
          >
            {employmentOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="sideJob" className="text-sm font-bold text-slate-900">
            副業の種類
          </label>
          <select
            id="sideJob"
            value={sideJob}
            onChange={(event) => setSideJob(event.target.value as SideJob)}
            className="mt-2 w-full rounded-lg border border-sky-200 bg-white px-4 py-4 text-base outline-none focus:border-blueMain focus:ring-2 focus:ring-sky-100"
          >
            {sideJobOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="income" className="text-sm font-bold text-slate-900">
              年間の副業収入
            </label>
            <div className="mt-2 flex rounded-lg border border-sky-200 focus-within:border-blueMain focus-within:ring-2 focus-within:ring-sky-100">
              <input
                id="income"
                type="number"
                min="0"
                inputMode="numeric"
                placeholder="例：300000"
                value={income}
                onChange={(event) => setIncome(event.target.value)}
                className="w-full rounded-l-lg px-4 py-4 text-base outline-none"
                aria-describedby="income-unit income-error"
                aria-invalid={Boolean(errors.income)}
              />
              <span id="income-unit" className="rounded-r-lg bg-sky-50 px-4 py-4 text-slate-600">
                円
              </span>
            </div>
            <FieldError message={errors.income} />
          </div>

          <div>
            <label htmlFor="expenses" className="text-sm font-bold text-slate-900">
              年間の副業経費
            </label>
            <div className="mt-2 flex rounded-lg border border-sky-200 focus-within:border-blueMain focus-within:ring-2 focus-within:ring-sky-100">
              <input
                id="expenses"
                type="number"
                min="0"
                inputMode="numeric"
                placeholder="例：50000"
                value={expenses}
                onChange={(event) => setExpenses(event.target.value)}
                className="w-full rounded-l-lg px-4 py-4 text-base outline-none"
                aria-describedby="expenses-unit expenses-error"
                aria-invalid={Boolean(errors.expenses)}
              />
              <span id="expenses-unit" className="rounded-r-lg bg-sky-50 px-4 py-4 text-slate-600">
                円
              </span>
            </div>
            <FieldError message={errors.expenses} />
          </div>
        </div>

        <div className="rounded-lg bg-slate-50 p-4 text-sm">
          <p className="text-slate-500">所得の目安</p>
          <p className="mt-1 text-xl font-bold text-blueDeep">
            {profitPreview === null ? "収入と経費を入力すると表示されます" : `${profitPreview.toLocaleString()}円`}
          </p>
        </div>

        <RadioGroup
          legend="会社に副業を知られたくないか"
          name="privacy"
          options={privacyOptions}
          value={privacyAnswer}
          onChange={setPrivacyAnswer}
        />

        <RadioGroup
          legend="開業届を出しているか"
          name="businessNotification"
          options={businessNotificationOptions}
          value={businessNotificationAnswer}
          onChange={setBusinessNotificationAnswer}
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-blueMain px-5 py-4 text-base font-bold text-white shadow-lg shadow-sky-200 transition hover:bg-blueDeep"
        >
          診断結果を見る
        </button>
      </form>

      {result ? (
        <DiagnosisResult result={result} />
      ) : (
        <aside className="card flex flex-col justify-center bg-gradient-to-br from-sky-50 to-white">
          <p className="text-sm font-bold text-blueDeep">入力後すぐに表示</p>
          <h2 className="mt-3 text-2xl font-bold leading-9 text-slate-900">
            確定申告や住民税の注意点を、ざっくり整理します。
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            判定タイトル、所得金額、リスクレベル、注意点、次にやること、おすすめ記事・サービスを結果画面に表示します。
          </p>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-600">
            <li>会社員の20万円超の目安に対応</li>
            <li>住民税の申告が必要になる場合を表示</li>
            <li>メルカリ・AI副業など副業別の注意点を表示</li>
          </ul>
        </aside>
      )}
    </div>
  );
}
