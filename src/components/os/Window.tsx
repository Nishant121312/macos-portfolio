"use client";

import { useCallback, useRef } from "react";
import { Rnd } from "react-rnd";
import { motion } from "framer-motion";
import { Minus, Square, X, Maximize2 } from "lucide-react";
import { useOSStore } from "@/store/useOSStore";
import { appComponents } from "@/lib/app-registry";
import { AppIcon } from "@/components/shared/AppIcon";
import { cn } from "@/lib/utils";
import type { AppWindowProps, WindowState } from "@/types";
import { useWindowSize } from "@/hooks/useClock";

interface WindowProps {
  window: WindowState;
}

export function Window({ window: win }: WindowProps) {
  const {
    activeWindowId,
    focusWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    updateWindowPosition,
    settings,
  } = useOSStore();

  const { width: screenW, height: screenH } = useWindowSize();
  const isActive = activeWindowId === win.id;
  const AppComponent = appComponents[win.appId];
  const rndRef = useRef<Rnd>(null);

  const handleDragStop = useCallback(
    (_e: unknown, d: { x: number; y: number }) => {
      let { x, y } = d;
      const snapThreshold = 20;

      if (x < snapThreshold) x = 0;
      if (y < 28 + snapThreshold) y = 28;
      if (screenW && x + win.width > screenW - snapThreshold)
        x = screenW - win.width;
      if (screenH && y + win.height > screenH - 80)
        y = screenH - win.height - 80;

      updateWindowPosition(win.id, x, y, win.width, win.height);
    },
    [win.id, win.width, win.height, screenW, screenH, updateWindowPosition]
  );

  const handleResizeStop = useCallback(
    (
      _e: unknown,
      _dir: unknown,
      ref: HTMLElement,
      _delta: unknown,
      position: { x: number; y: number }
    ) => {
      updateWindowPosition(
        win.id,
        position.x,
        position.y,
        ref.offsetWidth,
        ref.offsetHeight
      );
    },
    [win.id, updateWindowPosition]
  );

  if (win.minimized) return null;

  const maximizedHeight = (screenH || 800) - 28 - 70;
  const windowStyle = win.maximized
    ? { x: 0, y: 28, width: screenW || 1200, height: maximizedHeight }
    : { x: win.x, y: win.y, width: win.width, height: win.height };

  const appProps: AppWindowProps = {
    windowId: win.id,
    payload: win.payload,
  };

  const openTransition = settings.animations
    ? { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }
    : { duration: 0 };

  return (
    <Rnd
      ref={rndRef}
      position={{ x: windowStyle.x, y: windowStyle.y }}
      size={{ width: windowStyle.width, height: windowStyle.height }}
      minWidth={320}
      minHeight={200}
      bounds="parent"
      dragHandleClassName="window-drag-handle"
      disableDragging={win.maximized}
      enableResizing={!win.maximized}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      onMouseDown={() => focusWindow(win.id)}
      style={{ zIndex: win.zIndex, position: "absolute" }}
      className={cn(!settings.animations && "!transition-none")}
    >
      <motion.div
        initial={
          settings.animations ? { opacity: 0, scale: 0.92, y: 16 } : false
        }
        animate={
          win.closing
            ? { opacity: 0, scale: 0.88, y: 8 }
            : { opacity: 1, scale: 1, y: 0 }
        }
        transition={openTransition}
        className={cn(
          "flex h-full flex-col overflow-hidden rounded-xl border shadow-2xl transition-all duration-200",
          settings.theme === "dark"
            ? "border-white/10 bg-gray-900/90"
            : "border-black/10 bg-white/90",
          settings.blur && settings.glass && "backdrop-blur-2xl",
          !isActive && "opacity-[0.82] saturate-[0.7] brightness-[0.9] contrast-[0.95]"
        )}
      >
        <div
          onDoubleClick={(e) => {
            if ((e.target as HTMLElement).closest("button")) return;
            if (win.maximized) {
              restoreWindow(win.id);
            } else {
              maximizeWindow(win.id);
            }
          }}
          className={cn(
            "window-drag-handle flex h-9 shrink-0 items-center justify-between px-3 cursor-default select-none",
            settings.theme === "dark" ? "bg-white/5" : "bg-black/5"
          )}
        >
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeWindow(win.id);
              }}
              className="group flex h-3 w-3 items-center justify-center rounded-full bg-red-500 hover:bg-red-600"
              aria-label="Close"
            >
              <X
                size={8}
                className="opacity-0 group-hover:opacity-100 text-red-900"
              />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                minimizeWindow(win.id);
              }}
              className="group flex h-3 w-3 items-center justify-center rounded-full bg-yellow-500 hover:bg-yellow-600"
              aria-label="Minimize"
            >
              <Minus
                size={8}
                className="opacity-0 group-hover:opacity-100 text-yellow-900"
              />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (win.maximized) {
                  restoreWindow(win.id);
                } else {
                  maximizeWindow(win.id);
                }
              }}
              className="group flex h-3 w-3 items-center justify-center rounded-full bg-green-500 hover:bg-green-600"
              aria-label={win.maximized ? "Restore" : "Maximize"}
            >
              {win.maximized ? (
                <Square
                  size={6}
                  className="opacity-0 group-hover:opacity-100 text-green-900"
                />
              ) : (
                <Maximize2
                  size={6}
                  className="opacity-0 group-hover:opacity-100 text-green-900"
                />
              )}
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-medium opacity-70">
            <AppIcon appId={win.appId} size={14} />
            <span>{win.title}</span>
          </div>

          <div className="w-16" />
        </div>

        <div className="flex-1 overflow-hidden">
          {AppComponent && <AppComponent {...appProps} />}
        </div>
      </motion.div>
    </Rnd>
  );
}
