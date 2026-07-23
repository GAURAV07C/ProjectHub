"use client";

import React, { useEffect, useRef, useState } from "react";

interface MermaidLike {
  initialize: (config: Record<string, unknown>) => void;
  parse: (code: string) => Promise<void>;
  render: (id: string, code: string) => Promise<{ svg: string }>;
}

const normalizeMermaidLabels = (code: string): string => {
  return code.replace(/\[([^\]]+)\]/g, (match, label) => {
    const trimmedLabel = label.trim();
    if (trimmedLabel.includes(' ') && !trimmedLabel.startsWith('"') && !trimmedLabel.startsWith("'")) {
      return `["${trimmedLabel}"]`;
    }
    return match;
  });
};

export function MermaidChart({ code }: { code: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mermaidLib, setMermaidLib] = useState<MermaidLike | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initMermaid = async () => {
      try {
        const mod = await import("mermaid");
        const mermaid = (mod.default || mod) as unknown as MermaidLike;
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          securityLevel: "loose",
        });
        if (isMounted) {
          setMermaidLib(mermaid);
        }
      } catch (err) {
        console.error("Mermaid initialization error:", err);
        if (isMounted) {
          setError("Failed to load Mermaid library");
          setLoading(false);
        }
      }
    };

    initMermaid();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!code.trim()) {
      setLoading(false);
      setError(null);
      setSvg(null);
      return;
    }

    if (!mermaidLib) return;

    let isMounted = true;
    const renderTimer = setTimeout(async () => {
      try {
        const trimmedCode = code.trim();
        const normalizedCode = normalizeMermaidLabels(trimmedCode);
        await mermaidLib.parse(normalizedCode);

        const renderId = `mermaid-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        const result = await mermaidLib.render(renderId, normalizedCode);

        if (isMounted) {
          if (containerRef.current) {
            containerRef.current.innerHTML = "";
          }
          const raw = result as unknown as { svg?: string } | string | undefined;
          const svg = typeof raw === "string" ? raw : raw?.svg || "";
          setSvg(svg);
          setLoading(false);
        }
      } catch (err) {
        console.error("Mermaid render error:", err);
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to render diagram");
          setLoading(false);
        }
      }
    }, 500);

    return () => {
      isMounted = false;
      clearTimeout(renderTimer);
    };
  }, [code, mermaidLib]);

  if (loading) {
    return (
      <div className="my-6 bg-gray-900 border border-white/10 rounded-xl p-4 overflow-x-auto">
        <div className="text-white/40 text-sm">Loading diagram...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-6 bg-gray-900 border border-white/10 rounded-xl p-4 overflow-x-auto">
        <details>
          <summary className="text-red-400 text-sm cursor-pointer mb-2 select-none">
            Diagram Error (click to view code)
          </summary>
          <pre className="text-xs text-white/60 font-mono whitespace-pre-wrap">
            {code}
          </pre>
        </details>
      </div>
    );
  }

  return (
    <div className="my-6 bg-gray-900 border border-white/10 rounded-xl p-4 overflow-x-auto flex justify-center">
      <div
        ref={containerRef}
        dangerouslySetInnerHTML={{ __html: svg || "" }}
        className="mermaid-container [&_svg]:max-w-full [&_svg]:h-auto"
      />
    </div>
  );
}
