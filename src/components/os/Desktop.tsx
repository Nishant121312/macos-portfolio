"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { MenuBar } from "./MenuBar";
import { Dock } from "./Dock";
import { Wallpaper } from "./Wallpaper";
import { WindowManager } from "./WindowManager";
import { DesktopIcons } from "./DesktopIcons";
import { useOSStore } from "@/store/useOSStore";
import { cn } from "@/lib/utils";
import { AppSwitcher } from "./AppSwitcher";

const WidgetsPanel = dynamic(() =>
  import("./WidgetsPanel").then((m) => m.WidgetsPanel)
);
const Spotlight = dynamic(() => import("./Spotlight").then((m) => m.Spotlight));
const CommandPalette = dynamic(() =>
  import("./CommandPalette").then((m) => m.CommandPalette)
);
const NotificationCenter = dynamic(() =>
  import("./NotificationCenter").then((m) => m.NotificationCenter)
);
const ControlCenter = dynamic(() =>
  import("./ControlCenter").then((m) => m.ControlCenter)
);
const CursorEffects = dynamic(() =>
  import("./CursorEffects").then((m) => m.CursorEffects)
);
const ContextMenu = dynamic(() =>
  import("./ContextMenu").then((m) => m.ContextMenu)
);

export function Desktop() {
  const [hasMounted, setHasMounted] = useState(false);
  const theme = useOSStore((s) => s.settings.theme);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const activeTheme = hasMounted ? theme : "dark";

  return (
    <div
      className={cn(
        "fixed inset-0 overflow-hidden select-none",
        activeTheme === "dark" ? "text-white" : "text-gray-900"
      )}
    >
      <Wallpaper />
      <MenuBar />
      <WindowManager />
      <DesktopIcons />
      <WidgetsPanel />
      <Dock />
      <Spotlight />
      <CommandPalette />
      <NotificationCenter />
      <ControlCenter />
      <CursorEffects />
      <ContextMenu />
      <AppSwitcher />
    </div>
  );
}
