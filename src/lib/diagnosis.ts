export type RiskLevel = "低" | "中" | "高" | "要確認";
export type Employment = "会社員" | "パート・アルバイト" | "個人事業主" | "無職・学生" | "その他";
export type SideJob =
  | "ブログ・アフィリエイト"
  | "note・コンテンツ販売"
  | "メルカリ・フリマ"
  | "ココナラ・スキル販売"
  | "YouTube・SNS"
  | "AI副業"
  | "配達・ギグワーク"
  | "その他";
export type PrivacyAnswer = "はい" | "いいえ" | "該当しない";
export type BusinessNotificationAnswer = "はい" | "いいえ" | "わからない";

export type Recommendation = {
  title: string;
  description: string;
  href: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type DiagnosisOutput = {
  income: number;
  expenses: number;
  profit: number;
  thresholdDifference: number;
  judgement: string;
  reason: string;
  riskLevel: RiskLevel;
  cautions: string[];
  nextActions: string[];
  recommendedArticles: Recommendation[];
  recommendedServices: Recommendation[];
  faqs: FAQ[];
};

export const employmentOptions: Employment[] = ["会社員", "パート・アルバイト", "個人事業主", "無職・学生", "その他"];
export const sideJobOptions: SideJob[] = [
  "ブログ・アフィリエイト",
  "note・コンテンツ販売",
  "メルカリ・フリマ",
  "ココナラ・スキル販売",
  "YouTube・SNS",
  "AI副業",
  "配達・ギグワーク",
  "その他"
];
export const privacyOptions: PrivacyAnswer[] = ["はい", "いいえ", "該当しない"];
export const businessNotificationOptions: BusinessNotificationAnswer[] = ["はい", "いいえ", "わからない"];

export function parseAmount(value: string) {
  const trimmed = value.replaceAll(",", "").trim();
  if (trimmed === "") {
    return null;
  }

  const parsed = Number(trimmed);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return null;
  }

  return parsed;
}

function buildNextActions(riskLevel: RiskLevel, privacyAnswer: PrivacyAnswer) {
  if (riskLevel === "高") {
    return ["収入と経費の記録を整理する", "領収書・レシートを保管する", "税理士相談を検討する"];
  }

  if (privacyAnswer === "はい") {
    return ["住民税の申告が必要か自治体に確認する", "収入と経費の記録を整理する", "税務署または税理士に確認する"];
  }

  return ["収入と経費の記録を整理する", "領収書・レシートを保管する", "会計ソフトを比較する"];
}

function buildRecommendedArticles(sideJob: SideJob, privacyAnswer: PrivacyAnswer): Recommendation[] {
  const twentyManArticle = {
    title: "副業20万円以下なら確定申告はいらない？",
    description: "20万円ルールと住民税の注意点を確認できます。",
    href: "/articles/side-job-tax-200000"
  };
  const expenseArticle = {
    title: "副業で経費にできるもの一覧",
    description: "パソコン、通信費、書籍代などの考え方を整理できます。",
    href: "/articles/expense-guide"
  };

  if (sideJob === "AI副業") {
    return [
      {
        title: "AI副業の税金はどうなる？",
        description: "ChatGPT、画像生成、ライティング収入の考え方を確認できます。",
        href: "/articles/ai-side-job-tax"
      },
      twentyManArticle,
      expenseArticle
    ];
  }

  if (sideJob === "note・コンテンツ販売") {
    return [
      {
        title: "note販売の収入に税金はかかる？",
        description: "コンテンツ販売で申告が必要になるケースを確認できます。",
        href: "/articles/note-tax"
      },
      twentyManArticle,
      expenseArticle
    ];
  }

  if (sideJob === "メルカリ・フリマ") {
    return [
      {
        title: "メルカリの売上に税金はかかる？",
        description: "不用品販売と営利販売の違いを確認できます。",
        href: "/articles/mercari-tax"
      },
      twentyManArticle,
      expenseArticle
    ];
  }

  if (sideJob === "ブログ・アフィリエイト") {
    return [
      twentyManArticle,
      expenseArticle,
      {
        title: "ブログ収入の税金ガイド",
        description: "広告収入やアフィリエイト収入で確認したい税金の基本を整理します。",
        href: "/articles"
      }
    ];
  }

  if (sideJob === "YouTube・SNS") {
    return [
      {
        title: "YouTube収益の税金",
        description: "広告収益、案件収入、SNS収益で確認したいポイントを整理します。",
        href: "/articles"
      },
      twentyManArticle,
      expenseArticle
    ];
  }

  if (sideJob === "ココナラ・スキル販売") {
    return [
      {
        title: "スキル販売の税金",
        description: "制作・相談・代行などのスキル販売収入で確認したいポイントを整理します。",
        href: "/articles"
      },
      twentyManArticle,
      expenseArticle
    ];
  }

  if (privacyAnswer === "はい") {
    return [
      {
        title: "副業20万円以下なら確定申告はいらない？",
        description: "住民税の注意点と会社員が確認したいポイントを読めます。",
        href: "/articles/side-job-tax-200000"
      },
      expenseArticle
    ];
  }

  return [twentyManArticle, expenseArticle];
}

function buildRecommendedServices(profit: number, businessNotificationAnswer: BusinessNotificationAnswer): Recommendation[] {
  const sideJobGuide = {
    title: "副業税金ガイド",
    description: "まず押さえたい申告・住民税・経費の基本を確認できます。",
    href: "/articles"
  };
  const accountingSoftware = {
    title: "会計ソフト比較",
    description: "収入・経費の記録や申告準備をしやすくするサービス候補です。",
    href: "/services"
  };
  const taxConsultation = {
    title: "税理士相談",
    description: "申告要否や経費の扱いに不安がある場合の相談先候補です。",
    href: "/services"
  };

  const services: Recommendation[] =
    profit < 200000
      ? [sideJobGuide, accountingSoftware]
      : [accountingSoftware, taxConsultation, sideJobGuide];

  if (businessNotificationAnswer !== "はい") {
    return services;
  }

  return [
    ...services,
    {
      title: "青色申告ガイド",
      description: "開業届を出している場合に確認したい青色申告の基本です。",
      href: "/services"
    },
    {
      title: "開業後の帳簿管理ガイド",
      description: "帳簿づけや証憑管理の始め方を確認できます。",
      href: "/services"
    }
  ];
}

function buildFaqs(): FAQ[] {
  return [
    {
      question: "20万円以下なら確定申告は不要ですか？",
      answer: "所得税の確定申告が不要な場合がありますが、住民税の申告が必要になる場合があります。"
    },
    {
      question: "副業が会社に知られることはありますか？",
      answer: "住民税の通知方法などにより異なるため、勤務先や自治体の制度を確認してください。"
    },
    {
      question: "経費はどこまで認められますか？",
      answer: "副業との関連性がある支出が対象になる場合があります。"
    },
    {
      question: "この診断結果は確定ですか？",
      answer: "いいえ。この診断は一般的な情報をもとにした目安です。"
    }
  ];
}

export function buildDiagnosis(
  employment: Employment,
  sideJob: SideJob,
  income: number,
  expenses: number,
  privacyAnswer: PrivacyAnswer,
  businessNotificationAnswer: BusinessNotificationAnswer
): DiagnosisOutput {
  const profit = income - expenses;
  const thresholdDifference = profit - 200000;
  let judgement = "個別確認が必要です";
  let reason = "働き方や所得区分によって判断が変わります。";
  let riskLevel: RiskLevel = "要確認";

  if (employment === "会社員") {
    if (profit <= 0) {
      judgement = "確定申告が必要かは所得区分により確認が必要です";
      reason = "赤字の扱いは、雑所得・事業所得などの区分で変わる可能性があります。";
      riskLevel = "要確認";
    } else if (profit > 200000) {
      judgement = "確定申告が必要な可能性が高いです";
      reason =
        "会社員で、副業など給与所得・退職所得以外の所得が20万円を超える場合、確定申告が必要になるケースがあります。";
      riskLevel = "高";
    } else {
      judgement = "所得税の確定申告は不要な場合があります";
      reason = "ただし、住民税の申告が必要になる場合があります。";
      riskLevel = "低";
    }
  }

  if (employment === "パート・アルバイト") {
    if (profit <= 0) {
      judgement = "確定申告が必要かは所得区分により確認が必要です";
      reason = "赤字の扱いは、雑所得・事業所得などの区分で変わる可能性があります。";
      riskLevel = "要確認";
    } else if (profit > 200000) {
      judgement = "確定申告が必要な可能性が高いです";
      reason =
        "副業など給与所得・退職所得以外の所得が20万円を超える場合、確定申告が必要になるケースがあります。扶養、年末調整、複数給与の有無でも扱いが変わる可能性があります。";
      riskLevel = "高";
    } else {
      judgement = "所得税の確定申告は不要な場合があります";
      reason =
        "20万円以下が一つの目安になる場合があります。ただし、住民税の申告、扶養、年末調整、複数給与の有無により確認が必要です。";
      riskLevel = "低";
    }
  }

  if (employment === "個人事業主") {
    judgement = "確定申告が必要になる可能性が高いです";
    reason = "事業として収入を得ている場合、所得額や控除の状況により申告が必要になる可能性があります。";
    riskLevel = profit > 0 ? "高" : "要確認";
  }

  if (employment === "無職・学生") {
    judgement = "扶養や所得額によって確認が必要です";
    reason = "所得額によって、本人の税金だけでなく扶養にも影響する可能性があります。";
    riskLevel = "要確認";
  }

  if (employment === "その他") {
    judgement = "個別確認が必要です";
    reason = "働き方や所得区分によって判断が変わります。";
    riskLevel = "要確認";
  }

  const cautions = [
    "この診断は申告要否を断定するものではありません。",
    "住民税の申告が必要になる場合があります。",
    "税務署または税理士に確認してください。"
  ];

  if (employment === "パート・アルバイト") {
    cautions.push("扶養、年末調整、複数給与の有無によって確認すべき点が増える可能性があります。");
  }

  if (privacyAnswer === "はい") {
    cautions.push("住民税の通知方法に注意が必要です。");
    cautions.push("ただし、会社に知られないことを保証するものではありません。");
    cautions.push("自治体や勤務先の扱いにより異なります。");
  }

  if (sideJob === "メルカリ・フリマ") {
    cautions.push("不用品販売と営利目的の販売では扱いが変わる可能性があります。");
  }

  if (sideJob === "AI副業") {
    cautions.push("ライティング、画像販売、業務代行など、収入の内容を記録しておくことが大切です。");
  }

  if (sideJob === "ブログ・アフィリエイト") {
    cautions.push("広告収入、ASP報酬、サーバー代などの入出金を月ごとに記録しておくと確認しやすくなります。");
  }

  if (sideJob === "note・コンテンツ販売") {
    cautions.push("販売手数料や振込額だけでなく、売上発生日の記録も残しておくことをおすすめします。");
  }

  if (sideJob === "YouTube・SNS") {
    cautions.push("広告収益、案件収入、投げ銭など収入の種類ごとに記録しておくことが大切です。");
  }

  if (sideJob === "ココナラ・スキル販売") {
    cautions.push("販売手数料、外注費、制作ツール代など、案件ごとの収支を整理しておくと確認しやすくなります。");
  }

  if (businessNotificationAnswer === "はい") {
    cautions.push("青色申告や帳簿管理について、会計ソフト比較ページや税務署の案内を確認してください。");
  }

  if (expenses > income) {
    cautions.push("赤字の扱いは所得区分により変わるため、専門家への確認を検討してください。");
  }

  return {
    income,
    expenses,
    profit,
    thresholdDifference,
    judgement,
    reason,
    riskLevel,
    cautions,
    nextActions: buildNextActions(riskLevel, privacyAnswer),
    recommendedArticles: buildRecommendedArticles(sideJob, privacyAnswer),
    recommendedServices: buildRecommendedServices(profit, businessNotificationAnswer),
    faqs: buildFaqs()
  };
}
