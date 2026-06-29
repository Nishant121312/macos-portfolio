"use client";

import { useOSStore } from "@/store/useOSStore";
import { Window } from "./Window";

export function WindowManager() {
  const windows = useOSStore((s) => s.windows);

  return (
    <div className="absolute inset-0 top-7 bottom-16 overflow-hidden">
      {windows.map((win) => (
        <Window key={win.id} window={win} />
      ))}
    </div>
  );
}
