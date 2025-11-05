"use client";

import { useEffect, useRef } from "react";
import Prism from "prismjs";

import "prismjs/components/prism-markup";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-diff";
import "prismjs/themes/prism-tomorrow.css";

Prism.manual = true;

type CodeItem = {
  title: string;
  description?: string;
  language: "tsx" | "ts" | "diff";
  code: string;
};

type Props = {
  items: CodeItem[];
};

export default function CodePane({ items }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    Prism.highlightAllUnder(containerRef.current);
  }, [items]);

  return (
    <div ref={containerRef} className="space-y-6">
      {items.map((item) => (
        <article
          key={item.title}
          className="rounded-lg border border-white/10 bg-black p-4 shadow-lg shadow-black/40"
        >
          <div className="mb-3">
            <h4 className="text-base font-semibold text-white">{item.title}</h4>
            {item.description && (
              <p className="mt-1 text-sm text-zinc-300">{item.description}</p>
            )}
          </div>
          <pre className="overflow-x-auto rounded-md border border-white/10 bg-black/80 p-4 text-xs leading-relaxed">
            <code className={`language-${item.language}`}>{item.code}</code>
          </pre>
        </article>
      ))}
    </div>
  );
}


