"use client";

import React, { useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import { MermaidChart } from "./MermaidChart";

interface MarkdownPreviewProps {
  content: string;
  className?: string;
  onHeadingsChange?: (headings: { id: string; text: string; level: number }[]) => void;
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-");
}

function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let partIndex = 0;

  while (remaining.length > 0) {
    const boldMatch = remaining.match(/^\*\*(.+?)\*\*/);
    const italicMatch = remaining.match(/^\*(.+?)\*/);
    const strikeMatch = remaining.match(/^~~(.+?)~~/);
    const codeMatch = remaining.match(/^`(.+?)`/);
    const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
    const imgMatch = remaining.match(/^!\[([^\]]*)\]\(([^)]+)\)/);

    if (imgMatch) {
      parts.push(
        <Image
          key={`${keyPrefix}-${partIndex++}`}
          src={imgMatch[2]}
          alt={imgMatch[1] || "image"}
          width={800}
          height={400}
          className="max-w-full h-auto rounded-lg my-4"
        />
      );
      remaining = remaining.slice(imgMatch[0].length);
    } else if (boldMatch) {
      parts.push(
        <strong key={`${keyPrefix}-${partIndex++}`} className="font-semibold text-white">
          {boldMatch[1]}
        </strong>
      );
      remaining = remaining.slice(boldMatch[0].length);
    } else if (strikeMatch) {
      parts.push(
        <del key={`${keyPrefix}-${partIndex++}`} className="line-through text-white/50">
          {strikeMatch[1]}
        </del>
      );
      remaining = remaining.slice(strikeMatch[0].length);
    } else if (italicMatch) {
      parts.push(
        <em key={`${keyPrefix}-${partIndex++}`} className="italic">
          {italicMatch[1]}
        </em>
      );
      remaining = remaining.slice(italicMatch[0].length);
    } else if (codeMatch) {
      parts.push(
        <code
          key={`${keyPrefix}-${partIndex++}`}
          className="bg-gray-950 px-2 py-1 rounded text-sm font-mono text-emerald-300"
        >
          {codeMatch[1]}
        </code>
      );
      remaining = remaining.slice(codeMatch[0].length);
    } else if (linkMatch) {
      parts.push(
        <a
          key={`${keyPrefix}-${partIndex++}`}
          href={linkMatch[2]}
          className="text-emerald-300 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkMatch[1]}
        </a>
      );
      remaining = remaining.slice(linkMatch[0].length);
    } else {
      const nextSpecial = remaining.search(/[*`!\[\]]/);
      if (nextSpecial === -1) {
        parts.push(remaining);
        break;
      }
      if (nextSpecial === 0) {
        parts.push(remaining[0]);
        remaining = remaining.slice(1);
      } else {
        parts.push(remaining.slice(0, nextSpecial));
        remaining = remaining.slice(nextSpecial);
      }
    }
  }

  return parts;
}

function parseCodeBlock(
  trimmed: string,
  lines: string[],
  i: number
): { nodes: React.ReactNode[]; nextIndex: number } {
  const backtickCount = trimmed.match(/^(`+)/)?.[1].length || 3;
  const closingPattern = "^" + "`".repeat(backtickCount);
  const mermaidMatch = trimmed.toLowerCase().match(/^`{3,}\s*(\w+)?/);
  const language = mermaidMatch?.[1]?.trim().toLowerCase() || "";

  const codeLines: string[] = [];
  let nextIdx = i + 1;
  while (nextIdx < lines.length && !new RegExp(closingPattern).test(lines[nextIdx].trim())) {
    codeLines.push(lines[nextIdx]);
    nextIdx++;
  }

  if (language === "mermaid") {
    return {
      nodes: [<MermaidChart key={`mermaid-${nextIdx}`} code={codeLines.join("\n")} />],
      nextIndex: nextIdx + 1
    };
  }

  const lang = trimmed.slice(backtickCount).trim();
  const nodes = [
    <div key={`code-${nextIdx}`} className="my-6">
      {lang && (
        <div className="text-xs text-white/40 font-mono mb-2 px-4 pt-2">
          {lang}
        </div>
      )}
      <pre className="bg-gray-950 border border-white/10 rounded-xl p-4 overflow-x-auto">
        <code className="text-sm text-white/80 font-mono">{codeLines.join("\n")}</code>
      </pre>
    </div>
  ];

  return { nodes, nextIndex: nextIdx + 1 };
}

export function MarkdownPreview({ content, className = "", onHeadingsChange }: MarkdownPreviewProps) {
  const onHeadingsChangeRef = useRef(onHeadingsChange);
  onHeadingsChangeRef.current = onHeadingsChange;

  const { items, headings } = useMemo(() => {
    if (!content) return { items: [], headings: [] };

    const lines = content.split("\n");
    const items: React.ReactNode[] = [];
    const headings: TocItem[] = [];
    let i = 0;

    while (i < lines.length) {
      const trimmed = lines[i].trim();

      if (!trimmed) {
        i++;
        continue;
      }

      if (trimmed.startsWith("# ")) {
        const text = trimmed.slice(2);
        const id = slugify(text);
        headings.push({ id, text, level: 1 });
        items.push(
          <h1 key={i} id={id} className="text-3xl font-serif text-white mt-8 mb-4 scroll-mt-28">
            {text}
          </h1>
        );
        i++;
      } else if (trimmed.startsWith("## ")) {
        const text = trimmed.slice(3);
        const id = slugify(text);
        headings.push({ id, text, level: 2 });
        items.push(
          <h2 key={i} id={id} className="text-2xl font-serif text-white mt-8 mb-4 scroll-mt-28">
            {text}
          </h2>
        );
        i++;
      } else if (trimmed.startsWith("### ")) {
        const text = trimmed.slice(4);
        const id = slugify(text);
        headings.push({ id, text, level: 3 });
        items.push(
          <h3 key={i} id={id} className="text-xl font-semibold text-white mt-6 mb-3 scroll-mt-28">
            {text}
          </h3>
        );
        i++;
      } else if (trimmed === "---") {
        items.push(<hr key={i} className="border-white/10 my-8" />);
        i++;
      } else if (/^`{3,}/.test(trimmed.toLowerCase())) {
        const { nodes, nextIndex } = parseCodeBlock(trimmed, lines, i);
        items.push(...nodes);
        i = nextIndex;
      } else if (trimmed.startsWith("| ")) {
        const tableRows: string[] = [trimmed];
        i++;
        while (i < lines.length && lines[i].trim().startsWith("|")) {
          tableRows.push(lines[i].trim());
          i++;
        }
        const rows = tableRows.map(row => 
          row.split("|").filter(cell => cell.trim()).map(cell => cell.trim())
        );
        const header = rows[0] || [];
        const body = rows.slice(2);
        
        items.push(
          <div key={`table-${i}`} className="overflow-x-auto my-6">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {header.map((cell, idx) => (
                    <th key={idx} className="border border-white/10 bg-white/5 px-4 py-2 text-left text-white font-semibold">
                      {renderInline(cell, `th-${i}-${idx}`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {body.map((row, rowIdx) => (
                  <tr key={rowIdx}>
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx} className="border border-white/10 px-4 py-2 text-white/70">
                        {renderInline(cell, `td-${i}-${rowIdx}-${cellIdx}`)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      } else if (trimmed.startsWith("> ")) {
        const quoteLines: string[] = [trimmed.slice(2)];
        i++;
        while (i < lines.length && lines[i].trim().startsWith(">")) {
          quoteLines.push(lines[i].trim().slice(2));
          i++;
        }
        items.push(
          <blockquote
            key={`quote-${i}`}
            className="border-l-4 border-emerald-300/50 pl-4 italic text-white/60 my-6"
          >
            {quoteLines.join("\n")}
          </blockquote>
        );
      } else if (trimmed.startsWith("- [ ] ") || trimmed.startsWith("* [ ] ")) {
        const taskItems: { text: string; checked: boolean }[] = [];
        
        while (i < lines.length) {
          const line = lines[i].trim();
          if (line.startsWith("- [ ] ")) {
            taskItems.push({ text: line.slice(6), checked: false });
            i++;
          } else if (line.startsWith("- [x] ")) {
            taskItems.push({ text: line.slice(6), checked: true });
            i++;
          } else {
            break;
          }
        }
        
        items.push(
          <ul key={`tasks-${i}`} className="space-y-2 mb-6 list-none">
            {taskItems.map((task, idx) => (
              <li key={idx} className="flex items-start gap-3 text-white/70 text-lg">
                <input
                  type="checkbox"
                  checked={task.checked}
                  readOnly
                  className="mt-1.5 w-5 h-5 rounded border-white/20 bg-gray-950 text-emerald-300 focus:ring-emerald-300 focus:ring-offset-gray-900"
                />
                <span className={task.checked ? "line-through text-white/40" : ""}>
                  {renderInline(task.text, `task-${i}-${idx}`)}
                </span>
              </li>
            ))}
          </ul>
        );
      } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        const listItems: string[] = [];
        while (i < lines.length && (lines[i].trim().startsWith("- ") || lines[i].trim().startsWith("* "))) {
          listItems.push(lines[i].trim().replace(/^[-*]\s/, ""));
          i++;
        }
        items.push(
          <ul key={`list-${i}`} className="space-y-2 mb-6 list-disc list-inside">
            {listItems.map((item, idx) => (
              <li key={idx} className="text-white/70 text-lg">
                {renderInline(item, `li-${i}-${idx}`)}
              </li>
            ))}
          </ul>
        );
      } else if (/^\d+\.\s/.test(trimmed)) {
        const listItems: string[] = [];
        while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
          listItems.push(lines[i].trim().replace(/^\d+\.\s/, ""));
          i++;
        }
        items.push(
          <ol key={`ol-${i}`} className="space-y-2 mb-6 list-decimal list-inside">
            {listItems.map((item, idx) => (
              <li key={idx} className="text-white/70 text-lg">
                {renderInline(item, `ol-${i}-${idx}`)}
              </li>
            ))}
          </ol>
        );
      } else {
        items.push(
          <p key={i} className="text-white/70 text-lg leading-relaxed mb-4">
            {renderInline(trimmed, `p-${i}`)}
          </p>
        );
        i++;
      }
    }

    return { items, headings };
  }, [content]);

  useEffect(() => {
    if (onHeadingsChangeRef.current) {
      onHeadingsChangeRef.current(headings);
    }
  }, [headings]);

  if (!content) {
    return (
      <div className={`text-white/40 italic ${className}`}>
        Nothing to preview
      </div>
    );
  }

  return <div className={className}>{items}</div>;
}
