"use client";

import {
  Sun,
  CloudSun,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudRainWind,
  CloudLightning,
  Cloud,
  Droplets,
  Wind,
} from "lucide-react";
import { useOSStore } from "@/store/useOSStore";
import { cn } from "@/lib/utils";

export function WeatherWidget() {
  const theme = useOSStore((s) => s.settings.theme);
  const location = useOSStore((s) => s.location);
  const weather = useOSStore((s) => s.weather);
  const loadingLocation = useOSStore((s) => s.loadingLocation);
  const loadingWeather = useOSStore((s) => s.loadingWeather);

  // Icon mapping
  const renderWeatherIcon = (iconName: string, size = 32) => {
    const props = { size, className: "text-amber-500 shrink-0" };
    switch (iconName) {
      case "Sun": return <Sun {...props} className="text-yellow-400 shrink-0" />;
      case "CloudSun": return <CloudSun {...props} className="text-zinc-300 shrink-0" />;
      case "CloudFog": return <CloudFog {...props} className="text-zinc-400 shrink-0" />;
      case "CloudDrizzle": return <CloudDrizzle {...props} className="text-blue-300 shrink-0" />;
      case "CloudRain": return <CloudRain {...props} className="text-blue-400 shrink-0" />;
      case "CloudSnow": return <CloudSnow {...props} className="text-blue-200 shrink-0" />;
      case "CloudRainWind": return <CloudRainWind {...props} className="text-blue-500 shrink-0" />;
      case "CloudLightning": return <CloudLightning {...props} className="text-yellow-500 shrink-0" />;
      default: return <Cloud {...props} className="text-zinc-400 shrink-0" />;
    }
  };

  const isLoading = loadingLocation || loadingWeather || !weather || !location;

  return (
    <div
      className={cn(
        "w-48 rounded-2xl border p-4 shadow-xl backdrop-blur-2xl transition-all duration-300 select-none",
        theme === "dark"
          ? "border-white/10 bg-black/30 text-white"
          : "border-black/10 bg-white/30 text-black"
      )}
    >
      {isLoading ? (
        <div className="space-y-2 animate-pulse">
          <div className="flex justify-between items-center">
            <div className="space-y-1.5 flex-1">
              <div className="h-6 w-16 bg-white/10 rounded" />
              <div className="h-3.5 w-24 bg-white/10 rounded" />
            </div>
            <div className="h-8 w-8 bg-white/10 rounded-full" />
          </div>
          <div className="h-3 w-32 bg-white/10 rounded pt-1" />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-2xl font-light tabular-nums leading-none">{weather.temp}°C</p>
              <p className="text-[11px] font-semibold opacity-70 truncate max-w-[90px] mt-1.5" title={`${location.city}, ${location.state}`}>
                {location.city}
              </p>
            </div>
            {renderWeatherIcon(weather.icon)}
          </div>
          <div className="mt-2.5 space-y-1 text-[10px] opacity-60">
            <p className="truncate font-medium">
              {weather.condition} • H:{weather.tempMax}° L:{weather.tempMin}°
            </p>
            <div className="flex items-center justify-between opacity-80 pt-0.5">
              <span className="flex items-center gap-0.5">
                <Droplets size={10} /> {weather.humidity}%
              </span>
              <span className="flex items-center gap-0.5">
                <Wind size={10} /> {weather.windSpeed} km/h
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
