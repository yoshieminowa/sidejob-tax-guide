import type { ArticleCategory, ArticleSummary } from "@/lib/article-types";

export type GeneratedArticleOutline = {
  title: string;
  metaDescription: string;
  headings: {
    level: "h2" | "h3";
    text: string;
  }[];
  faq: {
    question: string;
    answerHint: string;
  }[];
  relatedArticles: ArticleSummary[];
};

function trimDescription(description: string) {
  return description.length > 118 ? `${description.slice(0, 117)}…` : description;
}

export function generateArticleOutline({
  title,
  mainKeyword,
  category,
  articles
}: {
  title: string;
  mainKeyword: string;
  category: ArticleCategory;
  articles: ArticleSummary[];
}): GeneratedArticleOutline {
  const normalizedTitle = title.trim();
  const normalizedKeyword = mainKeyword.trim();
  const keyword = normalizedKeyword || normalizedTitle;

  const sameCategory = articles.filter((article) => article.category === category);
  const taxFallback = articles.filter((article) => article.category === "税金基礎");
  const relatedArticles = [...sameCategory, ...taxFallback]
    .filter((article, index, self) => self.findIndex((item) => item.slug === article.slug) === index)
    .slice(0, 4);

  const metaDescription = trimDescription(
    `${keyword}について、副業の税金・確定申告・住民税・経費の考え方を初心者向けに整理します。申告が必要になる可能性や注意点を確認できます。`
  );

  return {
    title: normalizedTitle,
    metaDescription,
    headings: [
      { level: "h2", text: "結論まとめ" },
      { level: "h2", text: `${keyword}で税金が発生するケース` },
      { level: "h3", text: "収入として記録しておきたいもの" },
      { level: "h3", text: "一時的な収入と継続的な収入の違い" },
      { level: "h2", text: "確定申告が必要になる可能性" },
      { level: "h3", text: "会社員の場合の20万円ライン" },
      { level: "h3", text: "住民税で確認したい点" },
      { level: "h2", text: "経費として考えられるもの" },
      { level: "h3", text: `${keyword}に関連する支出例` },
      { level: "h3", text: "領収書・明細の残し方" },
      { level: "h2", text: "よくある質問" },
      { level: "h2", text: "まとめ" }
    ],
    faq: [
      {
        question: `${keyword}の収入に税金はかかる？`,
        answerHint: "所得がある場合、税金や申告の確認が必要になる場合があると説明します。"
      },
      {
        question: "20万円以下なら確定申告は不要ですか？",
        answerHint: "所得税の確定申告が不要な場合でも、住民税の申告が必要になる場合があると説明します。"
      },
      {
        question: "経費はどこまで認められますか？",
        answerHint: "副業との関連性がある支出が対象になる場合があると説明します。"
      },
      {
        question: "この情報だけで判断できますか？",
        answerHint: "一般的な目安であり、正確な判断は税務署または税理士への確認が必要と説明します。"
      }
    ],
    relatedArticles
  };
}
