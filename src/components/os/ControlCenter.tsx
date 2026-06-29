"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Wifi, Bluetooth, Sun, Moon, Volume2, VolumeX } from "lucide-react";
import { useOSStore } from "@/store/useOSStore";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

export function ControlCenter() {
  const {
    controlCenterOpen,
    setControlCenterOpen,
    settings,
    updateSettings,
  } = useOSStore();

  return (
    <AnimatePresence>
      {controlCenterOpen && (
        <motion.div
          className="fixed inset-0 z-[9400]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setControlCenterOpen(false)}
        >
          <motion.div
            className="absolute right-2 top-8 w-72 rounded-2xl border border-white/10 bg-gray-900/90 p-4 shadow-2xl backdrop-blur-2xl"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 grid grid-cols-2 gap-2">
              <button
                onClick={() =>
                  updateSettings({
                    theme: settings.theme === "dark" ? "light" : "dark",
                  })
                }
                className="flex flex-col items-center gap-1 rounded-xl bg-white/10 p-3 hover:bg-white/15 transition-colors"
              >
                {settings.theme === "dark" ? (
                  <Moon size={20} />
                ) : (
                  <Sun size={20} />
                )}
                <span className="text-xs">
                  {settings.theme === "dark" ? "Dark" : "Light"}
                </span>
              </button>
              <div className="flex flex-col items-center gap-1 rounded-xl bg-white/10 p-3">
                <Wifi size={20} />
                <span className="text-xs">Wi-Fi On</span>
              </div>
              <div className="flex flex-col items-center gap-1 rounded-xl bg-white/10 p-3">
                <Bluetooth size={20} />
                <span className="text-xs">Bluetooth</span>
              </div>
              <button
                onClick={() => updateSettings({ sound: !settings.sound })}
                className="flex flex-col items-center gap-1 rounded-xl bg-white/10 p-3 hover:bg-white/15 transition-colors"
              >
                {settings.sound ? (
                  <Volume2 size={20} />
                ) : (
                  <VolumeX size={20} />
                )}
                <span className="text-xs">Sound</span>
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs">Animations</span>
                <Switch
                  checked={settings.animations}
                  onCheckedChange={(v) => updateSettings({ animations: v })}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs">Blur Effects</span>
                <Switch
                  checked={settings.blur}
                  onCheckedChange={(v) => updateSettings({ blur: v })}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs">Glass Effects</span>
                <Switch
                  checked={settings.glass}
                  onCheckedChange={(v) => updateSettings({ glass: v })}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs">Dock Magnification</span>
                <Switch
                  checked={settings.dockMagnification}
                  onCheckedChange={(v) =>
                    updateSettings({ dockMagnification: v })
                  }
                />
              </div>
              <div>
                <span className="text-xs">Display Brightness</span>
                <Slider
                  defaultValue={[80]}
                  max={100}
                  step={1}
                  className="mt-2"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
