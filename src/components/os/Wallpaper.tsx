"use client";

import { useOSStore } from "@/store/useOSStore";
import { useWallpaperParallax } from "@/hooks/useGSAPParallax";
import { cn } from "@/lib/utils";

export function Wallpaper() {
  const wallpaper = useOSStore((s) => s.settings.wallpaper);
  const blur = useOSStore((s) => s.settings.blur);
  const animations = useOSStore((s) => s.settings.animations);
  const parallaxRef = useWallpaperParallax(animations);

  const gradientMap: Record<string, string> = {
    "gradient-aurora":
      "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
    "gradient-sunset":
      "linear-gradient(135deg, #ff6b6b 0%, #feca57 50%, #ff9ff3 100%)",
  };

  const isGradient = wallpaper.startsWith("gradient-");
  const bgStyle = isGradient
    ? { background: gradientMap[wallpaper] ?? gradientMap["gradient-aurora"] }
    : {
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };

  return (
    <div
      ref={parallaxRef}
      className={cn(
        "absolute inset-0 transition-all duration-700",
        blur && "scale-105"
      )}
      style={bgStyle}
    >
      <div className="absolute inset-0 bg-black/10" />
    </div>
  );
}
