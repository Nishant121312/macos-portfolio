"use client";

import { ReactNode } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useOSStore } from "@/store/useOSStore";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: ReactNode;
  title?: string;
  className?: string;
  noPadding?: boolean;
}

export function AppShell({
  children,
  title,
  className,
  noPadding,
}: AppShellProps) {
  const theme = useOSStore((s) => s.settings.theme);

  return (
    <div
      className={cn(
        "flex h-full flex-col",
        theme === "dark" ? "bg-gray-900/50 text-white" : "bg-white/80 text-gray-900",
        className
      )}
    >
      {title && (
        <div
          className={cn(
            "shrink-0 border-b px-4 py-2 text-sm font-semibold",
            theme === "dark" ? "border-white/10" : "border-black/10"
          )}
        >
          {title}
        </div>
      )}
      <ScrollArea className="flex-1">
        <div className={cn(!noPadding && "p-4")}>{children}</div>
      </ScrollArea>
    </div>
  );
}
