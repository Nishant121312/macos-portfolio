"use client";

import { useState, useEffect } from "react";
import { useOSStore } from "@/store/useOSStore";
import { cn } from "@/lib/utils";

export function NotesWidget() {
  const [note, setNote] = useState("Build something amazing today ✨");
  const theme = useOSStore((s) => s.settings.theme);
  const openApp = useOSStore((s) => s.openApp);

  // Sync with LocalStorage notes if possible
  useEffect(() => {
    const saved = localStorage.getItem("portfolio-notes");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0 && parsed[0].content) {
          setNote(parsed[0].content.split("\n")[0] || parsed[0].title);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleWidgetClick = () => {
    openApp("notes");
  };

  return (
    <div
      onClick={handleWidgetClick}
      className={cn(
        "w-48 rounded-2xl border p-4 shadow-xl backdrop-blur-2xl transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer hover:shadow-2xl select-none",
        theme === "dark"
          ? "border-white/10 bg-yellow-500/10 hover:bg-yellow-500/15"
          : "border-black/10 bg-yellow-100/50 hover:bg-yellow-100/60"
      )}
    >
      <p className="mb-2 text-xs font-semibold opacity-60">Notes</p>
      <div className="h-20 w-full text-xs opacity-80 overflow-hidden line-clamp-4 leading-relaxed">
        {note}
      </div>
    </div>
  );
}
