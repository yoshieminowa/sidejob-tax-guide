import assert from "node:assert/strict";
import test from "node:test";
import { buildDiagnosis } from "../src/lib/diagnosis";

function runDiagnosis({
  income,
  expenses,
  sideJob = "ブログ・アフィリエイト"
}: {
  income: number;
  expenses: number;
  sideJob?: Parameters<typeof buildDiagnosis>[1];
}) {
  return buildDiagnosis("会社員", sideJob, income, expenses, "該当しない", "わからない");
}

test("会社員・所得22万円で高判定になる", () => {
  const result = runDiagnosis({ income: 220000, expenses: 0 });

  assert.equal(result.profit, 220000);
  assert.equal(result.riskLevel, "高");
  assert.equal(result.judgement, "確定申告が必要な可能性が高いです");
  assert.equal(result.thresholdDifference, 20000);
});

test("会社員・所得8万円で低判定になる", () => {
  const result = runDiagnosis({ income: 80000, expenses: 0 });

  assert.equal(result.profit, 80000);
  assert.equal(result.riskLevel, "低");
  assert.equal(result.judgement, "所得税の確定申告は不要な場合があります");
  assert.match(result.reason, /住民税の申告が必要になる場合があります/);
  assert.equal(result.thresholdDifference, -120000);
});

test("AI副業の注意文が表示される", () => {
  const result = runDiagnosis({ income: 220000, expenses: 0, sideJob: "AI副業" });

  assert.ok(
    result.cautions.some((caution) => caution.includes("ライティング、画像販売、業務代行")),
    "AI副業向けの注意文が含まれていること"
  );
});

test("メルカリ・フリマの注意文が表示される", () => {
  const result = runDiagnosis({ income: 220000, expenses: 0, sideJob: "メルカリ・フリマ" });

  assert.ok(
    result.cautions.some((caution) => caution.includes("不用品販売と営利目的の販売")),
    "メルカリ・フリマ向けの注意文が含まれていること"
  );
});
