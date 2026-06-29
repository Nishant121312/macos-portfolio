"use client";

import Image from "next/image";
import { wallpapers } from "@/data/wallpapers";
import { useOSStore } from "@/store/useOSStore";
import { AppShell } from "@/components/shared/AppShell";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const accentColors = [
  "#007AFF",
  "#5856D6",
  "#AF52DE",
  "#FF2D55",
  "#FF9500",
  "#34C759",
  "#00C7BE",
];

export default function SettingsApp() {
  const { settings, updateSettings } = useOSStore();

  return (
    <AppShell title="System Settings">
      <div className="mx-auto max-w-lg space-y-6">
        <section>
          <h3 className="mb-3 text-sm font-semibold">Appearance</h3>
          <div className="space-y-3 rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Dark Mode</span>
              <Switch
                checked={settings.theme === "dark"}
                onCheckedChange={(v) =>
                  updateSettings({ theme: v ? "dark" : "light" })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Blur Effects</span>
              <Switch
                checked={settings.blur}
                onCheckedChange={(v) => updateSettings({ blur: v })}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Animations</span>
              <Switch
                checked={settings.animations}
                onCheckedChange={(v) => updateSettings({ animations: v })}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Sound</span>
              <Switch
                checked={settings.sound}
                onCheckedChange={(v) => updateSettings({ sound: v })}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Dock Magnification</span>
              <Switch
                checked={settings.dockMagnification}
                onCheckedChange={(v) =>
                  updateSettings({ dockMagnification: v })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Dock Position</span>
              <select
                value={settings.dockPosition || "bottom"}
                onChange={(e) => updateSettings({ dockPosition: e.target.value as any })}
                className="bg-white/10 border border-white/10 rounded-md text-xs px-2 py-0.5 outline-none text-white cursor-pointer"
              >
                <option value="bottom" className="bg-zinc-800 text-white">Bottom</option>
                <option value="left" className="bg-zinc-800 text-white">Left</option>
                <option value="right" className="bg-zinc-800 text-white">Right</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5 pt-1.5 border-t border-white/5">
              <div className="flex justify-between items-center">
                <span className="text-sm">Dock Size</span>
                <span className="text-xs opacity-60 font-mono">{settings.dockSize || 64}px</span>
              </div>
              <input
                type="range"
                min="48"
                max="76"
                value={settings.dockSize || 64}
                onChange={(e) => updateSettings({ dockSize: Number(e.target.value) })}
                className="w-full accent-[var(--accent)] cursor-pointer h-1 bg-white/10 rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-1.5 pt-1.5 border-t border-white/5">
              <div className="flex justify-between items-center">
                <span className="text-sm">Dock Transparency</span>
                <span className="text-xs opacity-60 font-mono">{settings.transparency || 80}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={settings.transparency || 80}
                onChange={(e) => updateSettings({ transparency: Number(e.target.value) })}
                className="w-full accent-[var(--accent)] cursor-pointer h-1 bg-white/10 rounded-lg"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Cursor Glow</span>
              <Switch
                checked={settings.cursorGlow}
                onCheckedChange={(v) => updateSettings({ cursorGlow: v })}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Glass Effects</span>
              <Switch
                checked={settings.glass}
                onCheckedChange={(v) => updateSettings({ glass: v })}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Mouse Trail</span>
              <Switch
                checked={settings.mouseTrail}
                onCheckedChange={(v) => updateSettings({ mouseTrail: v })}
              />
            </div>
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-sm font-semibold">Accent Color</h3>
          <div className="flex flex-wrap gap-3">
            {accentColors.map((color) => (
              <button
                key={color}
                onClick={() => updateSettings({ accentColor: color })}
                className={cn(
                  "h-8 w-8 rounded-full transition-transform hover:scale-110",
                  settings.accentColor === color &&
                    "ring-2 ring-white ring-offset-2 ring-offset-gray-900"
                )}
                style={{ backgroundColor: color }}
                aria-label={`Accent color ${color}`}
              />
            ))}
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-sm font-semibold">Wallpaper</h3>
          <div className="grid grid-cols-3 gap-2">
            {wallpapers.map((wp) => {
              const isGradient = wp.url.startsWith("gradient-");
              return (
                <button
                  key={wp.id}
                  onClick={() => updateSettings({ wallpaper: wp.url })}
                  className={cn(
                    "relative aspect-video overflow-hidden rounded-lg border-2 transition-all hover:scale-105",
                    settings.wallpaper === wp.url
                      ? "border-[var(--accent)]"
                      : "border-transparent"
                  )}
                >
                  {isGradient ? (
                    <div
                      className="h-full w-full"
                      style={{
                        background:
                          wp.url === "gradient-aurora"
                            ? "linear-gradient(135deg, #0f0c29, #302b63, #24243e)"
                            : "linear-gradient(135deg, #ff6b6b, #feca57, #ff9ff3)",
                      }}
                    />
                  ) : (
                    <Image
                      src={wp.thumbnail || wp.url}
                      alt={wp.name}
                      fill
                      className="object-cover"
                      sizes="120px"
                    />
                  )}
                  <span className="absolute bottom-0 left-0 right-0 bg-black/60 px-1 py-0.5 text-[10px]">
                    {wp.name}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
