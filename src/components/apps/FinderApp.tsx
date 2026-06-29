"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, LayoutGrid, List } from "lucide-react";
import { finderRoot } from "@/data/finder";
import { useOSStore } from "@/store/useOSStore";
import { AppShell } from "@/components/shared/AppShell";
import { AppIcon } from "@/components/shared/AppIcon";
import type { FinderItem } from "@/types";
import { cn } from "@/lib/utils";
import type { AppWindowProps } from "@/types";

interface PathEntry {
  name: string;
  items: FinderItem[];
}

export default function FinderApp(_props: AppWindowProps) {
  const [pathStack, setPathStack] = useState<PathEntry[]>([
    { name: "Nishant's Mac", items: finderRoot },
  ]);
  const [view, setView] = useState<"grid" | "list">("grid");
  const { openApp, openSafari } = useOSStore();
  const theme = useOSStore((s) => s.settings.theme);

  const current = pathStack[pathStack.length - 1];

  const navigateTo = (item: FinderItem) => {
    if (item.type === "folder") {
      if (item.children) {
        setPathStack([...pathStack, { name: item.name, items: item.children }]);
      } else if (item.safariUrl) {
        openSafari(item.safariUrl, item.name);
      } else if (item.appId) {
        if (item.appId === "github" || item.appId === "linkedin") {
          openSafari(item.safariUrl ?? "", item.name);
        } else {
          openApp(item.appId);
        }
      }
    } else if (item.appId) {
      openApp(item.appId);
    } else if (item.safariUrl) {
      openSafari(item.safariUrl, item.name);
    }
  };

  const goBack = () => {
    if (pathStack.length > 1) setPathStack(pathStack.slice(0, -1));
  };

  const goForward = () => {
    // Forward navigation would require history stack — kept as no-op when unavailable
  };

  return (
    <AppShell noPadding>
      <div className="flex h-full">
        <aside
          className={cn(
            "w-44 shrink-0 border-r p-2",
            theme === "dark" ? "border-white/10 bg-white/5" : "border-black/10"
          )}
        >
          <p className="mb-2 px-2 text-xs font-semibold opacity-50">Favorites</p>
          {finderRoot.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.children) {
                  setPathStack([
                    { name: "Nishant's Mac", items: finderRoot },
                    { name: item.name, items: item.children },
                  ]);
                } else {
                  navigateTo(item);
                }
              }}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs hover:bg-white/10 transition-colors"
            >
              <AppIcon appId={item.icon} size={16} />
              {item.name}
            </button>
          ))}
        </aside>

        <div className="flex flex-1 flex-col">
          <div
            className={cn(
              "flex items-center gap-2 border-b px-3 py-2",
              theme === "dark" ? "border-white/10" : "border-black/10"
            )}
          >
            <button
              onClick={goBack}
              disabled={pathStack.length <= 1}
              className="rounded p-1 hover:bg-white/10 disabled:opacity-30"
              aria-label="Back"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={goForward}
              disabled
              className="rounded p-1 opacity-30"
              aria-label="Forward"
            >
              <ChevronRight size={16} />
            </button>
            <span className="flex-1 text-xs opacity-60">
              {pathStack.map((p) => p.name).join(" › ")}
            </span>
            <button
              onClick={() => setView("grid")}
              className={cn("rounded p-1", view === "grid" && "bg-white/10")}
              aria-label="Grid view"
            >
              <LayoutGrid size={14} />
            </button>
            <button
              onClick={() => setView("list")}
              className={cn("rounded p-1", view === "list" && "bg-white/10")}
              aria-label="List view"
            >
              <List size={14} />
            </button>
          </div>

          <div
            className={cn(
              "flex-1 overflow-auto p-4",
              view === "grid"
                ? "grid grid-cols-3 gap-4 sm:grid-cols-4"
                : "flex flex-col gap-1"
            )}
          >
            {current.items.map((item) => (
              <button
                key={item.id}
                onDoubleClick={() => navigateTo(item)}
                onClick={() => {
                  if (view === "list" && item.type === "folder" && item.children) {
                    setPathStack([...pathStack, { name: item.name, items: item.children }]);
                  }
                }}
                className={cn(
                  "flex items-center gap-2 rounded-lg transition-colors hover:bg-white/10",
                  view === "grid" ? "flex-col p-3" : "flex-row px-3 py-2"
                )}
              >
                <AppIcon appId={item.icon} size={view === "grid" ? 40 : 20} />
                <span className="text-xs text-center">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
