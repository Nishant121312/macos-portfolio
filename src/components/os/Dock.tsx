"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { dockApps } from "@/data/apps";
import { useOSStore } from "@/store/useOSStore";
import { AppIcon } from "@/components/shared/AppIcon";
import { cn } from "@/lib/utils";
import type { AppId } from "@/types";

export function Dock() {
  const dockRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    appId: AppId;
  } | null>(null);

  const { openApp, runningApps, dockBounce, settings, windows, closeWindow } = useOSStore();

  const getScale = (index: number) => {
    if (!settings.dockMagnification || hoveredIndex === null) return 1;
    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) return 1.6;
    if (distance === 1) return 1.3;
    if (distance === 2) return 1.1;
    return 1;
  };

  const handleClick = (appId: AppId) => {
    openApp(appId);
  };

  const handleContextMenu = (e: React.MouseEvent, appId: AppId) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      appId,
    });
  };

  const handleQuitApp = (appId: AppId) => {
    const appWins = windows.filter((w) => w.appId === appId);
    appWins.forEach((w) => closeWindow(w.id));
    setContextMenu(null);
  };

  useEffect(() => {
    const closeMenu = () => setContextMenu(null);
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  const position = settings.dockPosition || "bottom";

  const dockClasses = cn(
    "fixed z-[8000] transition-all duration-300",
    position === "bottom" && "bottom-2 left-1/2 -translate-x-1/2 flex-row",
    position === "left" && "left-2 top-1/2 -translate-y-1/2 flex-col",
    position === "right" && "right-2 top-1/2 -translate-y-1/2 flex-col"
  );

  const containerClasses = cn(
    "flex items-end gap-1.5 rounded-2xl border px-3 py-2 shadow-2xl transition-all duration-300",
    position === "bottom" && "flex-row",
    (position === "left" || position === "right") && "flex-col items-center",
    settings.glass && settings.blur && "backdrop-blur-3xl",
    settings.theme === "dark"
      ? "border-white/10 bg-white/10"
      : "border-black/10 bg-white/30"
  );

  return (
    <>
      <motion.div
        ref={dockRef}
        className={dockClasses}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      >
        <div 
          className={containerClasses}
          style={{ 
            opacity: (settings.transparency || 80) / 100,
            padding: `${(settings.dockSize || 64) / 8}px` 
          }}
        >
          {dockApps.map((app, index) => {
            const isRunning = runningApps.includes(app.id);
            const isBouncing = dockBounce === app.id;
            const scale = getScale(index);
            const dynamicSize = settings.dockSize || 64;

            return (
              <motion.button
                key={app.id}
                onClick={() => handleClick(app.id)}
                onContextMenu={(e) => handleContextMenu(e, app.id)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                animate={
                  isBouncing
                    ? { y: [0, -18, 0] }
                    : {
                        scale,
                        y: scale > 1 ? -(scale - 1) * 20 : 0,
                      }
                }
                transition={
                  isBouncing
                    ? { duration: 0.55, repeat: Infinity, ease: "easeInOut" }
                    : { type: "spring", stiffness: 400, damping: 22 }
                }
                className="relative flex flex-col items-center p-1 group focus:outline-none"
                aria-label={app.name}
              >
                {/* App Name Tooltip */}
                <div 
                  className={cn(
                    "absolute hidden group-hover:block px-2.5 py-1 text-[11px] font-medium rounded-md shadow-md text-white border border-white/10 bg-zinc-900/90 backdrop-blur-md pointer-events-none z-[9000] whitespace-nowrap",
                    position === "bottom" && "-top-10",
                    position === "left" && "left-16",
                    position === "right" && "right-16"
                  )}
                >
                  {app.name}
                </div>

                {/* Reflection Container */}
                <div
                  className="flex items-center justify-center rounded-xl shadow-lg transition-all hover:shadow-xl shrink-0"
                  style={{
                    backgroundColor: `${app.color}25`,
                    width: `${dynamicSize - 12}px`,
                    height: `${dynamicSize - 12}px`,
                    // High fidelity reflection effect
                    WebkitBoxReflect: position === "bottom" 
                      ? "below 2px linear-gradient(transparent, transparent 65%, rgba(255, 255, 255, 0.12))"
                      : "none"
                  }}
                >
                  <AppIcon appId={app.id} size={dynamicSize - 28} />
                </div>

                {/* Running dot indicator */}
                {isRunning && (
                  <span 
                    className={cn(
                      "absolute rounded-full bg-white/90 shadow",
                      position === "bottom" && "-bottom-0.5 h-1 w-1",
                      position === "left" && "-right-0.5 h-1 w-1 top-1/2 -translate-y-1/2",
                      position === "right" && "-left-0.5 h-1 w-1 top-1/2 -translate-y-1/2"
                    )} 
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Right-click Context Menu */}
      <AnimatePresence>
        {contextMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.08 }}
            className={cn(
              "fixed border rounded-xl py-1 w-44 shadow-2xl z-[9999] text-xs font-medium",
              settings.theme === "dark" ? "bg-zinc-900/95 border-white/10 text-white" : "bg-white/95 border-black/10 text-black",
              settings.blur && "backdrop-blur-2xl"
            )}
            style={{ left: contextMenu.x, top: contextMenu.y - 40 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                openApp(contextMenu.appId);
                setContextMenu(null);
              }}
              className="w-full text-left px-3.5 py-1.5 hover:bg-[var(--accent)] hover:text-white transition-colors"
            >
              Open App
            </button>
            {runningApps.includes(contextMenu.appId) && (
              <button
                onClick={() => handleQuitApp(contextMenu.appId)}
                className="w-full text-left px-3.5 py-1.5 hover:bg-red-600 hover:text-white transition-colors text-red-500 hover:font-semibold"
              >
                Quit
              </button>
            )}
            <div className="my-1 border-t border-white/10" />
            <button
              onClick={() => {
                openApp("settings");
                setContextMenu(null);
              }}
              className="w-full text-left px-3.5 py-1.5 hover:bg-white/5 opacity-60 hover:opacity-100 transition-colors"
            >
              Dock Preferences...
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
