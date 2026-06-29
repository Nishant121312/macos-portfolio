"use client";

import { useClock } from "@/hooks/useClock";
import { useOSStore } from "@/store/useOSStore";
import { cn } from "@/lib/utils";

export function ClockWidget() {
  const clock = useClock();
  const theme = useOSStore((s) => s.settings.theme);

  return (
    <div
      className={cn(
        "w-48 rounded-2xl border p-4 shadow-xl backdrop-blur-2xl",
        theme === "dark"
          ? "border-white/10 bg-black/30"
          : "border-black/10 bg-white/30"
      )}
    >
      <p className="text-3xl font-light tabular-nums">
        {clock.hours}:{clock.minutes}
        <span className="ml-1 text-sm">{clock.ampm}</span>
      </p>
      <p className="mt-1 text-sm opacity-60">
        {clock.day}, {clock.month} {clock.date}
      </p>
    </div>
  );
}
