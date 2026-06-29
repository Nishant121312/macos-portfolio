"use client";

import { useState, useRef, useEffect } from "react";
import {
  Wifi,
  Bluetooth,
  Battery,
  Search,
  Bell,
  SlidersHorizontal,
  Sun,
  Moon,
  Volume2,
  VolumeX,
} from "lucide-react";
import { FaApple } from "react-icons/fa";
import { useOSStore } from "@/store/useOSStore";
import { useClock } from "@/hooks/useClock";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";
import type { MenuAction, AppId } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export function MenuBar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [menuActive, setMenuActive] = useState(false);
  const [activeRightMenu, setActiveRightMenu] = useState<string | null>(null);
  
  // Right item states
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
  const [volumeLevel, setVolumeLevel] = useState(70);
  const [brightnessLevel, setBrightnessLevel] = useState(85);

  const menuRef = useRef<HTMLDivElement>(null);
  const rightMenuRef = useRef<HTMLDivElement>(null);
  const clock = useClock();
  
  const {
    openApp,
    openSafari,
    settings,
    updateSettings,
    setSpotlightOpen,
    setNotificationCenterOpen,
    setControlCenterOpen,
    setCommandPaletteOpen,
    activeWindowId,
    windows,
    closeWindow,
    minimizeWindow,
    minimizeAllWindows,
    focusWindow,
    runningApps,
  } = useOSStore();

  const activeWindow = windows.find((w) => w.id === activeWindowId);
  const rawAppName = activeWindow?.appId ?? "finder";
  const appName = rawAppName.charAt(0).toUpperCase() + rawAppName.slice(1);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
        setMenuActive(false);
      }
      if (rightMenuRef.current && !rightMenuRef.current.contains(e.target as Node)) {
        setActiveRightMenu(null);
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const toggleTheme = () => {
    updateSettings({ theme: settings.theme === "dark" ? "light" : "dark" });
    setOpenMenu(null);
    setMenuActive(false);
  };

  const handleMenuClick = (menu: string) => {
    if (menuActive && openMenu === menu) {
      setOpenMenu(null);
      setMenuActive(false);
    } else {
      setOpenMenu(menu);
      setMenuActive(true);
    }
  };

  const handleMenuMouseEnter = (menu: string) => {
    if (menuActive) {
      setOpenMenu(menu);
    }
  };

  // Apple Menu Actions
  const appleActions: MenuAction[] = [
    { label: "About This Mac", action: () => openApp("about") },
    { label: "System Settings...", action: () => openApp("settings") },
    { label: "App Store...", action: () => openSafari("https://www.apple.com/app-store/") },
    { separator: true, label: "", action: () => {} },
    { label: "Sleep", action: () => minimizeAllWindows() },
    { label: "Restart...", action: () => window.location.reload() },
    { label: "Shut Down...", action: () => window.location.reload() },
  ];

  // Active App Menu Actions
  const appActions: MenuAction[] = [
    { label: `About ${appName}`, action: () => openApp(rawAppName as AppId) },
    { label: "Settings...", action: () => openApp("settings") },
    { separator: true, label: "", action: () => {} },
    { label: `Hide ${appName}`, shortcut: "⌘H", action: () => activeWindowId && minimizeWindow(activeWindowId), disabled: !activeWindowId },
    { label: "Hide Others", action: () => {} },
    { label: "Show All", action: () => {} },
    { separator: true, label: "", action: () => {} },
    { label: `Quit ${appName}`, shortcut: "⌘Q", action: () => activeWindowId && closeWindow(activeWindowId), disabled: !activeWindowId },
  ];

  // Finder specific actions
  const finderActions: MenuAction[] = [
    { label: "New Finder Window", shortcut: "⌘N", action: () => openApp("finder", { forceNew: true }) },
    { label: "Close Window", shortcut: "⌘W", action: () => activeWindowId && closeWindow(activeWindowId), disabled: !activeWindowId },
    { separator: true, label: "", action: () => {} },
    { label: "Empty Trash...", action: () => openApp("trash") },
  ];

  const fileActions: MenuAction[] = [
    { label: "New Finder Window", shortcut: "⌘N", action: () => openApp("finder") },
    { label: "New Tab", shortcut: "⌘T", action: () => openApp("safari") },
    { separator: true, label: "", action: () => {} },
    { label: "Close Window", shortcut: "⌘W", action: () => activeWindowId && closeWindow(activeWindowId), disabled: !activeWindowId },
    { label: "Save", shortcut: "⌘S", action: () => toast.success("Saved successfully!") },
    { label: "Print...", shortcut: "⌘P", action: () => window.print() },
  ];

  const editActions: MenuAction[] = [
    { label: "Undo", shortcut: "⌘Z", action: () => {}, disabled: true },
    { label: "Redo", shortcut: "⇧⌘Z", action: () => {}, disabled: true },
    { separator: true, label: "", action: () => {} },
    { label: "Cut", shortcut: "⌘X", action: () => {} },
    { label: "Copy", shortcut: "⌘C", action: () => document.execCommand("copy") },
    { label: "Paste", shortcut: "⌘V", action: () => document.execCommand("paste") },
    { label: "Select All", shortcut: "⌘A", action: () => {} },
  ];

  const viewActions: MenuAction[] = [
    { label: "Show Desktop", shortcut: "⌘D", action: () => minimizeAllWindows() },
    { label: "Toggle Dark Mode", shortcut: "⌘⇧T", action: toggleTheme },
    { separator: true, label: "", action: () => {} },
    { label: "Enter Full Screen", shortcut: "🌐F", action: () => document.documentElement.requestFullscreen?.() },
  ];

  const goActions: MenuAction[] = [
    { label: "Back", shortcut: "⌘[", action: () => {} },
    { label: "Forward", shortcut: "⌘]", action: () => {} },
    { separator: true, label: "", action: () => {} },
    { label: "Applications", shortcut: "⇧⌘A", action: () => openApp("finder") },
    { label: "Desktop", shortcut: "⇧⌘D", action: () => minimizeAllWindows() },
    { label: "Downloads", shortcut: "⌥⌘L", action: () => openApp("downloads") },
  ];

  const windowActions: MenuAction[] = [
    { label: "Minimize", shortcut: "⌘M", action: () => activeWindowId && minimizeWindow(activeWindowId), disabled: !activeWindowId },
    { label: "Zoom (Maximize)", action: () => {} },
    { separator: true, label: "", action: () => {} },
    { label: "Bring All to Front", action: () => windows.forEach((w) => focusWindow(w.id)) },
  ];

  const helpActions: MenuAction[] = [
    { label: `${appName} Help`, action: () => {} },
    { label: "Command Palette", shortcut: "⌘K", action: () => setCommandPaletteOpen(true) },
    { label: "Spotlight Search", shortcut: "⌘Space", action: () => setSpotlightOpen(true) },
    { separator: true, label: "", action: () => {} },
    { label: "Developer GitHub", action: () => openSafari(profile.github, "GitHub") },
    { label: "Developer LinkedIn", action: () => openSafari(profile.linkedin, "LinkedIn") },
  ];

  const getMenuActions = (menuName: string): MenuAction[] => {
    switch (menuName.toLowerCase()) {
      case "apple": return appleActions;
      case "finder": return finderActions;
      case "file": return fileActions;
      case "edit": return editActions;
      case "view": return viewActions;
      case "go": return goActions;
      case "window": return windowActions;
      case "help": return helpActions;
      default: return appActions;
    }
  };

  const renderDropdown = (menuName: string) => {
    const items = getMenuActions(menuName);
    return (
      <motion.div
        initial={{ opacity: 0, y: -4, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -4, scale: 0.98 }}
        transition={{ duration: 0.12 }}
        className={cn(
          "absolute left-0 top-full mt-0.5 min-w-52 rounded-lg border py-1 shadow-2xl z-[9999]",
          settings.blur && settings.glass ? "backdrop-blur-3xl" : "",
          settings.theme === "dark"
            ? "border-white/10 bg-gray-900/90 text-white/95"
            : "border-black/10 bg-white/90 text-black/95"
        )}
      >
        {items.map((item, i) =>
          item.separator ? (
            <div key={i} className={cn("my-1 border-t", settings.theme === "dark" ? "border-white/10" : "border-black/10")} />
          ) : (
            <button
              key={item.label}
              disabled={item.disabled}
              onClick={() => {
                item.action();
                setOpenMenu(null);
                setMenuActive(false);
              }}
              className={cn(
                "flex w-full items-center justify-between px-3.5 py-1 text-left text-xs disabled:opacity-40 transition-colors rounded",
                settings.theme === "dark" 
                  ? "hover:bg-[var(--accent)] hover:text-white" 
                  : "hover:bg-[var(--accent)] hover:text-white"
              )}
            >
              <span>{item.label}</span>
              {item.shortcut && (
                <span className="ml-6 text-[10px] opacity-40 font-mono tracking-widest">{item.shortcut}</span>
              )}
            </button>
          )
        )}
      </motion.div>
    );
  };

  return (
    <>
      {/* Screen Brightness Overlay */}
      <div 
        className="pointer-events-none fixed inset-0 z-[99999] bg-black transition-opacity duration-200"
        style={{ opacity: (100 - brightnessLevel) / 130 }}
      />

      <header
        ref={menuRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-[9000] flex h-7 items-center justify-between px-4 text-[13px] font-normal select-none tracking-wide",
          settings.theme === "dark"
            ? "bg-black/20 text-white/90 border-b border-white/5 shadow-sm"
            : "bg-white/20 text-black/85 border-b border-black/5 shadow-sm",
          settings.blur && settings.glass ? "backdrop-blur-2xl" : ""
        )}
      >
        {/* Left Side Menu */}
        <div className="flex items-center gap-4.5">
          {/* Apple Menu */}
          <div className="relative flex items-center h-full">
            <button
              onClick={() => handleMenuClick("apple")}
              onMouseEnter={() => handleMenuMouseEnter("apple")}
              className={cn(
                "flex items-center h-6 rounded px-2 hover:bg-white/15 transition-colors focus:outline-none",
                openMenu === "apple" && "bg-white/15"
              )}
              aria-label="Apple Menu"
            >
              <FaApple size={15} />
            </button>
            <AnimatePresence>
              {openMenu === "apple" && renderDropdown("apple")}
            </AnimatePresence>
          </div>

          {/* Active App Menu */}
          <div className="relative flex items-center h-full font-semibold">
            <button
              onClick={() => handleMenuClick("app")}
              onMouseEnter={() => handleMenuMouseEnter("app")}
              className={cn(
                "flex items-center h-6 rounded px-2 hover:bg-white/15 transition-colors focus:outline-none",
                openMenu === "app" && "bg-white/15"
              )}
            >
              {appName}
            </button>
            <AnimatePresence>
              {openMenu === "app" && renderDropdown("app")}
            </AnimatePresence>
          </div>

          {/* Standard Menus */}
          {["File", "Edit", "View", "Go", "Window", "Help"].map((menu) => (
            <div key={menu} className="relative flex items-center h-full">
              <button
                onClick={() => handleMenuClick(menu)}
                onMouseEnter={() => handleMenuMouseEnter(menu)}
                className={cn(
                  "flex items-center h-6 rounded px-2 hover:bg-white/15 transition-colors focus:outline-none",
                  openMenu === menu && "bg-white/15"
                )}
              >
                {menu}
              </button>
              <AnimatePresence>
                {openMenu === menu && renderDropdown(menu)}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Right Side Status Bar */}
        <div ref={rightMenuRef} className="flex items-center gap-3.5 relative">
          {/* Wi-Fi Icon */}
          <div className="relative flex items-center">
            <button
              onClick={() => setActiveRightMenu(activeRightMenu === "wifi" ? null : "wifi")}
              className="p-1 hover:bg-white/15 rounded transition-colors"
              title="Wi-Fi"
            >
              <Wifi size={14} className={cn(!wifiEnabled && "opacity-40")} />
            </button>
            <AnimatePresence>
              {activeRightMenu === "wifi" && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className={cn(
                    "absolute right-0 top-full mt-2 w-64 border rounded-xl p-3 shadow-2xl z-[9500]",
                    settings.theme === "dark" ? "bg-gray-900/95 border-white/10 text-white" : "bg-white/95 border-black/10 text-black",
                    settings.blur && "backdrop-blur-2xl"
                  )}
                >
                  <div className="flex items-center justify-between mb-3 border-b pb-2 border-white/10">
                    <span className="font-semibold text-xs">Wi-Fi</span>
                    <input 
                      type="checkbox" 
                      checked={wifiEnabled} 
                      onChange={() => setWifiEnabled(!wifiEnabled)}
                      className="accent-[var(--accent)] cursor-pointer"
                    />
                  </div>
                  <div className="space-y-2 text-xs">
                    {wifiEnabled ? (
                      <>
                        <div className="flex justify-between items-center py-1 hover:bg-white/5 px-1 rounded cursor-pointer text-[var(--accent)] font-medium">
                          <span>Home-5G</span>
                          <span>Connected</span>
                        </div>
                        <div className="flex justify-between items-center py-1 hover:bg-white/5 px-1 rounded cursor-pointer opacity-70">
                          <span>Starlink_Net</span>
                          <span>🔒</span>
                        </div>
                        <div className="flex justify-between items-center py-1 hover:bg-white/5 px-1 rounded cursor-pointer opacity-70">
                          <span>Airport Free Wi-Fi</span>
                          <span>🔒</span>
                        </div>
                      </>
                    ) : (
                      <span className="opacity-50">Wi-Fi is turned off.</span>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bluetooth Icon */}
          <div className="relative flex items-center">
            <button
              onClick={() => setActiveRightMenu(activeRightMenu === "bluetooth" ? null : "bluetooth")}
              className="p-1 hover:bg-white/15 rounded transition-colors"
              title="Bluetooth"
            >
              <Bluetooth size={14} className={cn(!bluetoothEnabled && "opacity-40")} />
            </button>
            <AnimatePresence>
              {activeRightMenu === "bluetooth" && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className={cn(
                    "absolute right-0 top-full mt-2 w-64 border rounded-xl p-3 shadow-2xl z-[9500]",
                    settings.theme === "dark" ? "bg-gray-900/95 border-white/10 text-white" : "bg-white/95 border-black/10 text-black",
                    settings.blur && "backdrop-blur-2xl"
                  )}
                >
                  <div className="flex items-center justify-between mb-3 border-b pb-2 border-white/10">
                    <span className="font-semibold text-xs">Bluetooth</span>
                    <input 
                      type="checkbox" 
                      checked={bluetoothEnabled} 
                      onChange={() => setBluetoothEnabled(!bluetoothEnabled)}
                      className="accent-[var(--accent)] cursor-pointer"
                    />
                  </div>
                  <div className="space-y-2 text-xs">
                    {bluetoothEnabled ? (
                      <>
                        <div className="flex justify-between items-center py-1 hover:bg-white/5 px-1 rounded cursor-pointer font-medium">
                          <span>AirPods Pro</span>
                          <span className="text-[10px] opacity-60">Connected</span>
                        </div>
                        <div className="flex justify-between items-center py-1 hover:bg-white/5 px-1 rounded cursor-pointer opacity-70">
                          <span>Magic Keyboard</span>
                          <span className="text-[10px] opacity-60">Paired</span>
                        </div>
                        <div className="flex justify-between items-center py-1 hover:bg-white/5 px-1 rounded cursor-pointer opacity-70">
                          <span>MX Master 3</span>
                          <span className="text-[10px] opacity-60">Paired</span>
                        </div>
                      </>
                    ) : (
                      <span className="opacity-50">Bluetooth is turned off.</span>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Battery Icon & Percentage */}
          <div className="relative flex items-center">
            <button
              onClick={() => setActiveRightMenu(activeRightMenu === "battery" ? null : "battery")}
              className="flex items-center gap-1 hover:bg-white/15 px-1.5 py-0.5 rounded transition-colors text-xs cursor-default font-medium"
              title="Battery"
            >
              <Battery size={15} />
              <span className="tabular-nums">87%</span>
            </button>
            <AnimatePresence>
              {activeRightMenu === "battery" && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className={cn(
                    "absolute right-0 top-full mt-2 w-56 border rounded-xl p-3 shadow-2xl z-[9500] text-xs",
                    settings.theme === "dark" ? "bg-gray-900/95 border-white/10 text-white" : "bg-white/95 border-black/10 text-black",
                    settings.blur && "backdrop-blur-2xl"
                  )}
                >
                  <p className="font-semibold mb-1">Battery Power Source</p>
                  <p className="opacity-70 mb-2">Power Source: Battery</p>
                  <div className="border-t border-white/10 pt-2 opacity-80">
                    <p className="flex justify-between"><span>Charge:</span> <span>87%</span></p>
                    <p className="flex justify-between"><span>Condition:</span> <span className="text-green-500 font-medium">Normal</span></p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Volume Icon */}
          <div className="relative flex items-center">
            <button
              onClick={() => setActiveRightMenu(activeRightMenu === "volume" ? null : "volume")}
              className="p-1 hover:bg-white/15 rounded transition-colors"
              title="Volume"
            >
              {volumeLevel === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
            <AnimatePresence>
              {activeRightMenu === "volume" && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className={cn(
                    "absolute right-0 top-full mt-2 w-48 border rounded-xl p-3 shadow-2xl z-[9500]",
                    settings.theme === "dark" ? "bg-gray-900/95 border-white/10 text-white" : "bg-white/95 border-black/10 text-black",
                    settings.blur && "backdrop-blur-2xl"
                  )}
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs">
                      <span>Sound Volume</span>
                      <span className="tabular-nums font-semibold">{volumeLevel}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setVolumeLevel(volumeLevel === 0 ? 70 : 0)}>
                        {volumeLevel === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
                      </button>
                      <input 
                        type="range"
                        min="0"
                        max="100"
                        value={volumeLevel}
                        onChange={(e) => setVolumeLevel(Number(e.target.value))}
                        className="w-full accent-[var(--accent)] cursor-pointer h-1 rounded-lg"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Brightness Icon */}
          <div className="relative flex items-center">
            <button
              onClick={() => setActiveRightMenu(activeRightMenu === "brightness" ? null : "brightness")}
              className="p-1 hover:bg-white/15 rounded transition-colors"
              title="Brightness"
            >
              <Sun size={14} />
            </button>
            <AnimatePresence>
              {activeRightMenu === "brightness" && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className={cn(
                    "absolute right-0 top-full mt-2 w-48 border rounded-xl p-3 shadow-2xl z-[9500]",
                    settings.theme === "dark" ? "bg-gray-900/95 border-white/10 text-white" : "bg-white/95 border-black/10 text-black",
                    settings.blur && "backdrop-blur-2xl"
                  )}
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs">
                      <span>Display Brightness</span>
                      <span className="tabular-nums font-semibold">{brightnessLevel}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sun size={14} />
                      <input 
                        type="range"
                        min="10"
                        max="100"
                        value={brightnessLevel}
                        onChange={(e) => setBrightnessLevel(Number(e.target.value))}
                        className="w-full accent-[var(--accent)] cursor-pointer h-1 rounded-lg"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Spotlight Search Icon */}
          <button
            onClick={() => setSpotlightOpen(true)}
            className="p-1 hover:bg-white/15 rounded transition-colors"
            aria-label="Spotlight Search"
          >
            <Search size={14} />
          </button>

          {/* Control Center Icon */}
          <button
            onClick={() => setControlCenterOpen(true)}
            className="p-1 hover:bg-white/15 rounded transition-colors"
            aria-label="Control Center"
          >
            <SlidersHorizontal size={14} />
          </button>

          {/* Notification Center Icon */}
          <button
            onClick={() => setNotificationCenterOpen(true)}
            className="p-1 hover:bg-white/15 rounded transition-colors"
            aria-label="Notification Center"
          >
            <Bell size={14} />
          </button>

          {/* Current Date & Time */}
          <button
            onClick={() => setNotificationCenterOpen(true)}
            className="hover:bg-white/15 px-1.5 py-0.5 rounded transition-colors text-xs font-medium tabular-nums cursor-default"
          >
            {clock.menuBar}
          </button>

          {/* User Avatar */}
          <button
            onClick={() => openApp("about")}
            className="h-5 w-5 overflow-hidden rounded-full ring-1 ring-white/20 transition-transform active:scale-95 cursor-pointer select-none flex items-center justify-center shrink-0"
          >
            {/* Standard img tag avoids external Next.js remote pattern constraints */}
            <img 
              src={profile.profileImage} 
              alt="User" 
              className="h-full w-full object-cover"
              onError={(e) => {
                // fallback avatar if image fails to load
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop";
              }}
            />
          </button>
        </div>
      </header>
    </>
  );
}
