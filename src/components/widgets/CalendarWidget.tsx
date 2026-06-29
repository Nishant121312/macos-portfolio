"use client";

import { useClock } from "@/hooks/useClock";
import { useOSStore } from "@/store/useOSStore";
import { cn } from "@/lib/utils";

export function CalendarWidget() {
  const clock = useClock();
  const theme = useOSStore((s) => s.settings.theme);
  const openApp = useOSStore((s) => s.openApp);

  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const today = clock.date;
  const startDay = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  ).getDay();
  const daysInMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  ).getDate();

  const handleWidgetClick = () => {
    openApp("calendar");
  };

  return (
    <div
      onClick={handleWidgetClick}
      className={cn(
        "w-48 rounded-2xl border p-4 shadow-xl backdrop-blur-2xl transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer hover:shadow-2xl select-none",
        theme === "dark"
          ? "border-white/10 bg-black/30 hover:bg-black/40"
          : "border-black/10 bg-white/30 hover:bg-white/40"
      )}
    >
      <p className="mb-2 text-sm font-semibold">
        {clock.month} {new Date().getFullYear()}
      </p>
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {days.map((d, i) => (
          <span key={i} className="opacity-40">
            {d}
          </span>
        ))}
        {Array.from({ length: startDay }).map((_, i) => (
          <span key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "rounded-full py-0.5",
              i + 1 === today && "bg-[var(--accent)] text-white font-bold"
            )}
          >
            {i + 1}
          </span>
        ))}
      </div>
    </div>
  );
}
