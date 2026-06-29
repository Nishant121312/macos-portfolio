"use client";

import { useState } from "react";
import { Play, Pause, SkipForward, Headphones } from "lucide-react";
import { useOSStore } from "@/store/useOSStore";
import { cn } from "@/lib/utils";

const tracks = [
  { title: "Chill Lofi Study Beats", artist: "Apple Music Lo-Fi" },
  { title: "Deep Focus Ambient", artist: "Apple Music Ambient" },
  { title: "Night Drive Synthwave", artist: "Apple Music Synth" },
];

export function MusicWidget() {
  const [playing, setPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const theme = useOSStore((s) => s.settings.theme);
  const { openApp } = useOSStore();
  const track = tracks[trackIndex];

  const handleWidgetClick = () => {
    openApp("music");
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
      <div className="flex justify-between items-center mb-2 shrink-0">
        <span className="text-[10px] font-semibold opacity-50 flex items-center gap-1">
          <Headphones size={11} />
          <span>Apple Music</span>
        </span>
        <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
      </div>

      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 text-lg shadow-md shrink-0">
          🎵
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold text-white/90">{track.title}</p>
          <p className="truncate text-[10px] opacity-50">{track.artist}</p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => setPlaying(!playing)}
          className="rounded-full bg-white/10 p-2 hover:bg-white/20 hover:scale-105 active:scale-95 transition-all text-white"
        >
          {playing ? <Pause size={14} /> : <Play size={14} />}
        </button>
        <button
          onClick={() => setTrackIndex((i) => (i + 1) % tracks.length)}
          className="rounded-full p-1.5 hover:bg-white/10 hover:scale-105 active:scale-95 transition-all text-white/80"
        >
          <SkipForward size={14} />
        </button>
      </div>
    </div>
  );
}
