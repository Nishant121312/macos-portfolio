"use client";

import { useEffect, useState } from "react";
import { useOSStore } from "@/store/useOSStore";

export function CursorEffects() {
  const { cursorGlow, mouseTrail } = useOSStore((s) => s.settings);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>(
    []
  );

  useEffect(() => {
    if (!cursorGlow && !mouseTrail) return;

    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (mouseTrail) {
        setTrail((prev) => [
          ...prev.slice(-12),
          { x: e.clientX, y: e.clientY, id: Date.now() },
        ]);
      }
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [cursorGlow, mouseTrail]);

  if (!cursorGlow && !mouseTrail) return null;

  return (
    <>
      {cursorGlow && (
        <div
          className="pointer-events-none fixed z-[9998] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl transition-transform duration-100"
          style={{
            left: position.x,
            top: position.y,
            background:
              "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          }}
        />
      )}
      {mouseTrail &&
        trail.map((point, i) => (
          <div
            key={point.id}
            className="pointer-events-none fixed z-[9997] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)]"
            style={{
              left: point.x,
              top: point.y,
              opacity: (i + 1) / trail.length * 0.5,
              transform: `translate(-50%, -50%) scale(${(i + 1) / trail.length})`,
            }}
          />
        ))}
    </>
  );
}
