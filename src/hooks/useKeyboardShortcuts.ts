"use client";

import { useEffect } from "react";
import { useOSStore } from "@/store/useOSStore";

export function useKeyboardShortcuts() {
  const {
    setSpotlightOpen,
    setCommandPaletteOpen,
    setNotificationCenterOpen,
    spotlightOpen,
    commandPaletteOpen,
    updateSettings,
    settings,
    activeWindowId,
    closeWindow,
    minimizeWindow,
    minimizeAllWindows,
  } = useOSStore();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey;

      if (meta && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
        return;
      }

      if (meta && e.key === " ") {
        e.preventDefault();
        setSpotlightOpen(!spotlightOpen);
        return;
      }

      if (meta && e.key === "w" && activeWindowId) {
        e.preventDefault();
        closeWindow(activeWindowId);
        return;
      }

      if (meta && e.key === "q" && activeWindowId) {
        e.preventDefault();
        closeWindow(activeWindowId);
        return;
      }

      if (meta && e.key === "m" && activeWindowId) {
        e.preventDefault();
        minimizeWindow(activeWindowId);
        return;
      }

      if (meta && e.key === "d") {
        e.preventDefault();
        minimizeAllWindows();
        return;
      }

      if (meta && e.shiftKey && e.key === "T") {
        e.preventDefault();
        updateSettings({
          theme: settings.theme === "dark" ? "light" : "dark",
        });
        return;
      }

      if (meta && e.key === "n") {
        e.preventDefault();
        setNotificationCenterOpen(true);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [
    setSpotlightOpen,
    setCommandPaletteOpen,
    setNotificationCenterOpen,
    spotlightOpen,
    commandPaletteOpen,
    updateSettings,
    settings.theme,
    activeWindowId,
    closeWindow,
    minimizeWindow,
    minimizeAllWindows,
  ]);
}
