"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { appDefinitions } from "@/data/apps";
import { projects } from "@/data/projects";
import { useOSStore } from "@/store/useOSStore";
import { AppIcon } from "@/components/shared/AppIcon";
import { Input } from "@/components/ui/input";
import { about } from "@/data/about";
import type { AppId } from "@/types";

export function Spotlight() {
  const { spotlightOpen, setSpotlightOpen, openApp, openSafari } = useOSStore();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (spotlightOpen) {
      setQuery("");
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [spotlightOpen]);

  const appResults = appDefinitions.filter((a) =>
    a.name.toLowerCase().includes(query.toLowerCase())
  );

  const projectResults = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.techStack.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  const handleSelect = (appId: AppId) => {
    if (appId === "github" || appId === "linkedin") {
      openSafari(appId === "github" ? about.github : about.linkedin);
    } else {
      openApp(appId);
    }
    setSpotlightOpen(false);
  };

  if (!spotlightOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9500] flex items-start justify-center pt-[15vh] bg-black/40 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setSpotlightOpen(false)}
    >
      <motion.div
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-gray-900/90 shadow-2xl backdrop-blur-2xl"
        initial={{ scale: 0.95, y: -20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <Search size={18} className="text-white/50" />
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Spotlight Search"
            className="border-0 bg-transparent text-base focus-visible:ring-0"
            onKeyDown={(e) => {
              if (e.key === "Escape") setSpotlightOpen(false);
              if (e.key === "Enter" && appResults.length > 0) {
                handleSelect(appResults[0].id);
              }
            }}
          />
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {appResults.length > 0 && (
            <div className="mb-2">
              <p className="px-2 py-1 text-xs font-medium text-white/40">Applications</p>
              {appResults.map((app) => (
                <button
                  key={app.id}
                  onClick={() => handleSelect(app.id)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-white/10 transition-colors"
                >
                  <AppIcon appId={app.id} size={24} />
                  <span className="text-sm">{app.name}</span>
                </button>
              ))}
            </div>
          )}

          {projectResults.length > 0 && (
            <div>
              <p className="px-2 py-1 text-xs font-medium text-white/40">Projects</p>
              {projectResults.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    openApp("projects");
                    setSpotlightOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-white/10 transition-colors"
                >
                  <span className="text-sm">{p.title}</span>
                  <span className="text-xs text-white/40">{p.category}</span>
                </button>
              ))}
            </div>
          )}

          {query && appResults.length === 0 && projectResults.length === 0 && (
            <p className="px-3 py-4 text-center text-sm text-white/40">
              No results for &quot;{query}&quot;
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
