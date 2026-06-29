"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOSStore } from "@/store/useOSStore";
interface ContextMenuState {
  x: number;
  y: number;
  visible: boolean;
}

export function ContextMenu() {
  const [menu, setMenu] = useState<ContextMenuState>({
    x: 0,
    y: 0,
    visible: false,
  });
  const { openApp, updateSettings, settings } = useOSStore();

  useEffect(() => {
    const handleContext = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-no-context]")) return;
      e.preventDefault();
      setMenu({ x: e.clientX, y: e.clientY, visible: true });
    };

    const handleClick = () => setMenu((m) => ({ ...m, visible: false }));

    window.addEventListener("contextmenu", handleContext);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("contextmenu", handleContext);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const items: { label: string; action: () => void }[] = [
    { label: "New Finder Window", action: () => openApp("finder") },
    { label: "Open Terminal", action: () => openApp("terminal") },
    { label: "Open Projects", action: () => openApp("projects") },
    { label: "Change Wallpaper", action: () => openApp("settings") },
    {
      label: `Switch to ${settings.theme === "dark" ? "Light" : "Dark"} Mode`,
      action: () =>
        updateSettings({
          theme: settings.theme === "dark" ? "light" : "dark",
        }),
    },
  ];

  return (
    <AnimatePresence>
      {menu.visible && (
        <motion.div
          className="fixed z-[9700] min-w-48 overflow-hidden rounded-xl border border-white/10 bg-gray-900/95 py-1 shadow-2xl backdrop-blur-2xl"
          style={{ left: menu.x, top: menu.y }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          data-no-context
        >
          {items.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className="flex w-full px-4 py-2 text-left text-sm hover:bg-[var(--accent)]/20 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
