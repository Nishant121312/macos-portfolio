"use client";

import { useState } from "react";
import { vscodeFiles } from "@/data/vscode-files";
import { AppShell } from "@/components/shared/AppShell";
import { cn } from "@/lib/utils";

function highlightCode(code: string, language: string): React.ReactNode[] {
  const lines = code.split("\n");
  return lines.map((line, i) => {
    let highlighted = line;

    if (language === "typescript") {
      highlighted = line
        .replace(/(\/\/.*)/g, '<span class="text-gray-500">$1</span>')
        .replace(
          /\b(export|const|import|from|default|interface|type|return|function)\b/g,
          '<span class="text-purple-400">$1</span>'
        )
        .replace(/"([^"]*)"/g, '<span class="text-green-400">"$1"</span>')
        .replace(/'([^']*)'/g, '<span class="text-green-400">\'$1\'</span>')
        .replace(/\b(string|number|boolean|Project)\b/g, '<span class="text-cyan-400">$1</span>');
    }

    return (
      <div key={i} className="flex">
        <span className="mr-4 w-8 shrink-0 text-right text-gray-600 select-none">
          {i + 1}
        </span>
        <span
          className="flex-1"
          dangerouslySetInnerHTML={{ __html: highlighted || "&nbsp;" }}
        />
      </div>
    );
  });
}

export default function VSCodeApp() {
  const [activeFile, setActiveFile] = useState(0);
  const file = vscodeFiles[activeFile];

  return (
    <AppShell noPadding>
      <div className="flex h-full">
        <aside className="w-48 shrink-0 border-r border-white/10 bg-[#252526] p-2">
          <p className="mb-2 px-2 text-xs font-semibold uppercase text-gray-400">
            Explorer
          </p>
          <p className="mb-1 px-2 text-xs text-gray-500">PORTFOLIO</p>
          {vscodeFiles.map((f, i) => (
            <button
              key={f.name}
              onClick={() => setActiveFile(i)}
              className={cn(
                "flex w-full items-center gap-2 rounded px-2 py-1 text-xs transition-colors",
                activeFile === i
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <span className="text-blue-400">TS</span>
              {f.name}
            </button>
          ))}
        </aside>

        <div className="flex flex-1 flex-col bg-[#1e1e1e]">
          <div className="flex border-b border-white/10">
            {vscodeFiles.map((f, i) => (
              <button
                key={f.name}
                onClick={() => setActiveFile(i)}
                className={cn(
                  "flex items-center gap-2 border-r border-white/10 px-3 py-1.5 text-xs",
                  activeFile === i
                    ? "bg-[#1e1e1e] text-white"
                    : "bg-[#2d2d2d] text-gray-400"
                )}
              >
                <span className="text-blue-400">TS</span>
                {f.name}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-auto p-4 font-mono text-sm leading-6">
            {highlightCode(file.content, file.language)}
          </div>

          <div className="flex items-center justify-between border-t border-white/10 bg-[#007acc] px-3 py-0.5 text-xs text-white">
            <span>TypeScript</span>
            <span>UTF-8</span>
            <span>Ln {file.content.split("\n").length}, Col 1</span>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
