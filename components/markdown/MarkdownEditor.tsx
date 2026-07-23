"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { ToolbarButton, ToolbarSeparator } from "@/components/markdown/MarkdownToolbar";
import { MarkdownPreview } from "@/components/markdown/MarkdownPreview";
import { Link, ImageIcon } from "lucide-react";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  minHeight?: string;
}

type TabMode = "write" | "preview" | "split";

function insertMarkdown(text: string, before: string, after: string = ""): string {
  if (typeof document === "undefined") return text;

  const textarea = document.querySelector(
    "textarea[data-md-editor]"
  ) as HTMLTextAreaElement | null;
  if (!textarea) return text;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = text.substring(start, end) || "text";
  const newText =
    text.substring(0, start) +
    before +
    selectedText +
    after +
    text.substring(end);

  return newText;
}

function insertTaskList(): string {
  return "- [ ] Task 1\n- [ ] Task 2\n- [ ] Task 3";
}

export function MarkdownEditor({
  value,
  onChange,
  label,
  placeholder,
  minHeight = "300px",
}: MarkdownEditorProps) {
  const [mode, setMode] = useState<TabMode>("write");
  const [dragOver, setDragOver] = useState(false);
  const [previewValue, setPreviewValue] = useState(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPreviewValue(value);
    }, 150);
    return () => clearTimeout(timer);
  }, [value]);

  const wrap = useCallback(
    (before: string, after: string = "") => {
      const next = insertMarkdown(value, before, after);
      onChange(next);
    },
    [value, onChange]
  );

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      const markdown = `![${file.name}](${base64})`;
      onChange(value + "\n\n" + markdown);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith("image/"));
    
    if (imageFile) {
      handleFileUpload(imageFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-white/70 mb-3">
          {label}
        </label>
      )}

      <div className={`bg-gray-900 border rounded-xl overflow-hidden ${dragOver ? "border-emerald-300/50" : "border-white/10"}`}>
        <div className="flex items-center justify-between border-b border-white/10 bg-gray-950/50 flex-wrap gap-2">
          <div className="flex items-center gap-0.5 p-2 flex-wrap">
            <ToolbarButton onClick={() => wrap("# ", "")} title="Heading 1">
              H1
            </ToolbarButton>
            <ToolbarButton onClick={() => wrap("## ", "")} title="Heading 2">
              H2
            </ToolbarButton>
            <ToolbarButton onClick={() => wrap("### ", "")} title="Heading 3">
              H3
            </ToolbarButton>
            <ToolbarSeparator />
            <ToolbarButton onClick={() => wrap("**", "**")} title="Bold">
              <span className="font-bold">B</span>
            </ToolbarButton>
            <ToolbarButton onClick={() => wrap("*", "*")} title="Italic">
              <span className="italic">I</span>
            </ToolbarButton>
            <ToolbarButton onClick={() => wrap("~~", "~~")} title="Strikethrough">
              <span className="line-through">S</span>
            </ToolbarButton>
            <ToolbarSeparator />
            <ToolbarButton onClick={() => wrap("- ", "")} title="Bullet List">
              •
            </ToolbarButton>
            <ToolbarButton onClick={() => wrap("1. ", "")} title="Numbered List">
              1.
            </ToolbarButton>
            <ToolbarButton onClick={() => wrap(insertTaskList(), "")} title="Task List">
              ☑
            </ToolbarButton>
            <ToolbarSeparator />
            <ToolbarButton onClick={() => wrap("> ", "")} title="Quote">
              &quot;
            </ToolbarButton>
            <ToolbarButton onClick={() => wrap("```\n", "\n```")} title="Code Block">
              {"{ }"}
            </ToolbarButton>
            <ToolbarButton onClick={() => wrap("| Header 1 | Header 2 | Header 3 |\n| -------- | -------- | -------- |\n| Cell 1   | Cell 2   | Cell 3   |\n| Cell 4   | Cell 5   | Cell 6   |", "")} title="Table">
              #
            </ToolbarButton>
            <ToolbarButton onClick={() => wrap("```mermaid\n", "\n```")} title="Mermaid Diagram">
              ◈
            </ToolbarButton>
            <ToolbarSeparator />
            <ToolbarButton onClick={() => wrap("[", "](url)")} title="Link">
              <Link className="size-4" />
            </ToolbarButton>
            <ToolbarButton 
              onClick={() => fileInputRef.current?.click()} 
              title="Upload Image"
            >
              <ImageIcon className="size-4" />
            </ToolbarButton>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file);
              }}
            />
            <ToolbarSeparator />
            <ToolbarButton onClick={() => wrap("---\n", "")} title="Horizontal Rule">
              —
            </ToolbarButton>
          </div>

          <div className="flex items-center gap-1 p-2">
            <ToolbarButton
              onClick={() => setMode("write")}
              title="Write"
              active={mode === "write"}
            >
              Write
            </ToolbarButton>
            <ToolbarButton
              onClick={() => setMode("split")}
              title="Split view"
              active={mode === "split"}
            >
              Split
            </ToolbarButton>
            <ToolbarButton
              onClick={() => setMode("preview")}
              title="Preview"
              active={mode === "preview"}
            >
              Preview
            </ToolbarButton>
          </div>
        </div>

        <div
          className="grid"
          style={{
            gridTemplateColumns:
              mode === "split" ? "1fr 1fr" : "1fr",
          }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {(mode === "write" || mode === "split") && (
            <textarea
              data-md-editor="true"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder || "Write markdown here... You can drag & drop images"}
              className="w-full bg-gray-900 text-white px-4 py-3 text-sm leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-emerald-300/20 font-mono border-r border-white/10"
              style={{ minHeight }}
            />
          )}

          {(mode === "preview" || mode === "split") && (
            <div
              className="bg-gray-900/50 p-4 overflow-y-auto"
              style={{
                minHeight,
                maxHeight: "600px",
              }}
            >
              <MarkdownPreview content={previewValue} className="text-white/70 text-base leading-relaxed" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
