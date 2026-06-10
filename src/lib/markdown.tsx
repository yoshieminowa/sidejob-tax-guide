import Link from "next/link";
import type { ReactNode } from "react";

export type MarkdownHeading = {
  id: string;
  level: 2 | 3;
  text: string;
};

export function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-|-$/g, "");
}

export function extractHeadings(markdown: string): MarkdownHeading[] {
  return markdown
    .split("\n")
    .filter((line) => line.startsWith("## ") || line.startsWith("### "))
    .map((line) => {
      const level = line.startsWith("### ") ? 3 : 2;
      const text = line.replace(/^#{2,3}\s+/, "").trim();
      return { id: slugifyHeading(text), level, text };
    });
}

function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);

  return parts.map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!match) {
      return part;
    }

    const [, label, href] = match;
    if (href.startsWith("/")) {
      return (
        <Link key={`${href}-${index}`} href={href} className="font-bold text-blueDeep underline-offset-4 hover:underline">
          {label}
        </Link>
      );
    }

    return (
      <a key={`${href}-${index}`} href={href} className="font-bold text-blueDeep underline-offset-4 hover:underline">
        {label}
      </a>
    );
  });
}

function isTableSeparator(line: string) {
  return /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(line);
}

function parseTable(lines: string[], startIndex: number) {
  const tableLines: string[] = [];
  let index = startIndex;

  while (index < lines.length && lines[index].includes("|") && lines[index].trim() !== "") {
    tableLines.push(lines[index]);
    index += 1;
  }

  const rows = tableLines
    .filter((line) => !isTableSeparator(line))
    .map((line) =>
      line
        .replace(/^\||\|$/g, "")
        .split("|")
        .map((cell) => cell.trim())
    );

  return { rows, nextIndex: index };
}

export function MarkdownContent({
  markdown,
  afterFirstH2,
  afterSecondH2
}: {
  markdown: string;
  afterFirstH2?: ReactNode;
  afterSecondH2?: ReactNode;
}) {
  const lines = markdown.split("\n");
  const nodes: ReactNode[] = [];
  let index = 0;
  let h2Count = 0;

  while (index < lines.length) {
    const line = lines[index].trimEnd();

    if (line.trim() === "") {
      index += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      h2Count += 1;
      const text = line.replace(/^##\s+/, "").trim();
      nodes.push(
        <h2 key={`h2-${index}`} id={slugifyHeading(text)} className="scroll-mt-24 text-2xl font-bold text-slate-950">
          {text}
        </h2>
      );
      if (h2Count === 1 && afterFirstH2) {
        nodes.push(<div key="after-first-h2">{afterFirstH2}</div>);
      }
      if (h2Count === 2 && afterSecondH2) {
        nodes.push(<div key="after-second-h2">{afterSecondH2}</div>);
      }
      index += 1;
      continue;
    }

    if (line.startsWith("### ")) {
      const text = line.replace(/^###\s+/, "").trim();
      nodes.push(
        <h3 key={`h3-${index}`} id={slugifyHeading(text)} className="scroll-mt-24 text-xl font-bold text-slate-900">
          {text}
        </h3>
      );
      index += 1;
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (index < lines.length && lines[index].startsWith("- ")) {
        items.push(lines[index].replace(/^- /, ""));
        index += 1;
      }
      nodes.push(
        <ul key={`ul-${index}`} className="list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
          {items.map((item) => (
            <li key={item}>{renderInline(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    if (line.startsWith("> ")) {
      const quotes: string[] = [];
      while (index < lines.length && lines[index].startsWith("> ")) {
        quotes.push(lines[index].replace(/^> /, ""));
        index += 1;
      }
      nodes.push(
        <blockquote key={`quote-${index}`} className="rounded-lg border-l-4 border-sky-300 bg-sky-50 p-4 text-sm leading-7 text-slate-700">
          {quotes.map((quote) => (
            <p key={quote}>{renderInline(quote)}</p>
          ))}
        </blockquote>
      );
      continue;
    }

    if (line.includes("|") && index + 1 < lines.length && isTableSeparator(lines[index + 1])) {
      const { rows, nextIndex } = parseTable(lines, index);
      const [headers, ...bodyRows] = rows;
      nodes.push(
        <div key={`table-${index}`} className="overflow-x-auto rounded-lg border border-sky-100">
          <table className="min-w-full divide-y divide-sky-100 text-sm">
            <thead className="bg-sky-50">
              <tr>
                {headers.map((header) => (
                  <th key={header} className="px-4 py-3 text-left font-bold text-slate-900">
                    {renderInline(header)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-100 bg-white">
              {bodyRows.map((row) => (
                <tr key={row.join("-")}>
                  {row.map((cell, cellIndex) => (
                    <td key={`${cell}-${cellIndex}`} className="px-4 py-3 text-slate-700">
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      index = nextIndex;
      continue;
    }

    const paragraph: string[] = [line];
    index += 1;
    while (index < lines.length && lines[index].trim() !== "" && !lines[index].startsWith("#") && !lines[index].startsWith("- ") && !lines[index].startsWith("> ")) {
      paragraph.push(lines[index].trimEnd());
      index += 1;
    }
    nodes.push(
      <p key={`p-${index}`} className="text-sm leading-8 text-slate-700">
        {renderInline(paragraph.join(" "))}
      </p>
    );
  }

  return <div className="space-y-7">{nodes}</div>;
}
