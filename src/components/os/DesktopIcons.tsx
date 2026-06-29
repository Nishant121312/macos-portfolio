"use client";

import { motion } from "framer-motion";
import { desktopIcons } from "@/data/apps";
import { useOSStore } from "@/store/useOSStore";
import { AppIcon } from "@/components/shared/AppIcon";
import { cn } from "@/lib/utils";

export function DesktopIcon({
  iconId,
  name,
  icon,
  index,
}: {
  iconId: string;
  name: string;
  icon: string;
  index: number;
}) {
  const openDesktopIcon = useOSStore((s) => s.openDesktopIcon);
  const theme = useOSStore((s) => s.settings.theme);

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.05, duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onDoubleClick={() => openDesktopIcon(iconId)}
      className="flex w-20 flex-col items-center gap-1.5 rounded-lg p-2 transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
      aria-label={`Open ${name}`}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 shadow-lg backdrop-blur-sm">
        <AppIcon appId={icon} size={32} />
      </div>
      <span
        className={cn(
          "max-w-full truncate text-center text-xs font-medium drop-shadow-lg",
          theme === "dark" ? "text-white" : "text-white"
        )}
      >
        {name}
      </span>
    </motion.button>
  );
}

export function DesktopIcons() {
  return (
    <div className="absolute right-4 top-10 grid grid-cols-1 gap-2">
      {desktopIcons.map((icon, i) => (
        <DesktopIcon
          key={icon.id}
          iconId={icon.id}
          name={icon.name}
          icon={icon.icon}
          index={i}
        />
      ))}
    </div>
  );
}
