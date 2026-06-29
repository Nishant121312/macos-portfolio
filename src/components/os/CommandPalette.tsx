"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { appDefinitions } from "@/data/apps";
import { about } from "@/data/about";
import { useOSStore } from "@/store/useOSStore";
import { AppIcon } from "@/components/shared/AppIcon";
import type { AppId } from "@/types";

export function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen, openApp, openSafari } =
    useOSStore();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (commandPaletteOpen) {
      setQuery("");
      setSelected(0);
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [commandPaletteOpen]);

  const filtered = appDefinitions.filter((a) =>
    a.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (appId: AppId) => {
    if (appId === "github" || appId === "linkedin") {
      openSafari(appId === "github" ? about.github : about.linkedin);
    } else {
      openApp(appId);
    }
    setCommandPaletteOpen(false);
  };

  if (!commandPaletteOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9600] flex items-start justify-center pt-[12vh] bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setCommandPaletteOpen(false)}
    >
      <motion.div
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-gray-900/95 shadow-2xl backdrop-blur-2xl"
        initial={{ scale: 0.95, y: -20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <span className="text-white/50">⌘</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelected(0);
            }}
            placeholder="Type a command or search apps..."
            className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/40"
            onKeyDown={(e) => {
              if (e.key === "Escape") setCommandPaletteOpen(false);
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelected((s) => Math.min(s + 1, filtered.length - 1));
              }
              if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelected((s) => Math.max(s - 1, 0));
              }
              if (e.key === "Enter" && filtered[selected]) {
                handleSelect(filtered[selected].id);
              }
            }}
          />
        </div>

        <div className="max-h-72 overflow-y-auto p-2">
          {filtered.map((app, i) => (
            <button
              key={app.id}
              onClick={() => handleSelect(app.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                i === selected ? "bg-[var(--accent)]/20" : "hover:bg-white/10"
              }`}
            >
              <AppIcon appId={app.id} size={22} />
              <span className="text-sm">{app.name}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
