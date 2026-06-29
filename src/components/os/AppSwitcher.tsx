"use client";

import { useEffect, useState } from "react";
import { useOSStore } from "@/store/useOSStore";
import { AppIcon } from "@/components/shared/AppIcon";
import { getAppDefinition } from "@/data/apps";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import type { AppId } from "@/types";

export function AppSwitcher() {
  const { runningApps, openApp, focusWindow, windows } = useOSStore();
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Always ensure Finder is at least present in the switcher list
  const switcherApps: AppId[] = runningApps.length > 0 ? runningApps : ["finder"];

  useEffect(() => {
    let keysPressed: Record<string, boolean> = {};

    const handleKeyDown = (e: KeyboardEvent) => {
      const isMeta = e.metaKey || e.ctrlKey;
      keysPressed[e.key] = true;

      // Detect Cmd+Tab (or Ctrl+Tab)
      if (isMeta && e.key === "Tab") {
        e.preventDefault();
        setIsOpen(true);
        setActiveIndex((prev) => (prev + 1) % switcherApps.length);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed[e.key] = false;

      // When Cmd/Ctrl is released, switch to the selected app
      if (e.key === "Meta" || e.key === "Control") {
        if (isOpen) {
          setIsOpen(false);
          const targetApp = switcherApps[activeIndex];
          if (targetApp) {
            // Find if there is an existing window to focus
            const existingWin = windows.find((w) => w.appId === targetApp && !w.minimized && !w.closing);
            if (existingWin) {
              focusWindow(existingWin.id);
            } else {
              openApp(targetApp);
            }
          }
        }
      }
    };

    const handleBlur = () => {
      setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleBlur);
    };
  }, [isOpen, activeIndex, switcherApps, windows, focusWindow, openApp]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/10 backdrop-blur-[2px] pointer-events-none">
      <div className="bg-zinc-900/85 backdrop-blur-2xl border border-white/10 p-5 rounded-2xl shadow-2xl flex flex-col items-center gap-3">
        <div className="flex gap-4">
          {switcherApps.map((appId, idx) => {
            const app = getAppDefinition(appId);
            const isSelected = idx === activeIndex;
            return (
              <div
                key={appId}
                className={cn(
                  "p-3 rounded-xl transition-all flex flex-col items-center justify-center h-16 w-16 gap-1 border",
                  isSelected 
                    ? "bg-white/15 border-white/20 scale-105 shadow-lg" 
                    : "bg-transparent border-transparent opacity-65"
                )}
              >
                <AppIcon appId={appId} size={32} />
              </div>
            );
          })}
        </div>
        <span className="text-xs font-semibold tracking-wide text-zinc-300 capitalize">
          {getAppDefinition(switcherApps[activeIndex])?.name || switcherApps[activeIndex]}
        </span>
      </div>
    </div>
  );
}
