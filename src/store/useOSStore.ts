import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  AppId,
  BootPhase,
  Notification,
  OSSettings,
  WindowPayload,
  WindowState,
  LocationState,
  WeatherState,
} from "@/types";
import { defaultWallpaper } from "@/data/wallpapers";
import { getAppDefinition, desktopIcons } from "@/data/apps";
import { about } from "@/data/about";
import { generateId } from "@/lib/utils";

interface OpenAppOptions {
  payload?: WindowPayload;
  title?: string;
  forceNew?: boolean;
}

interface OSStore {
  bootPhase: BootPhase;
  setBootPhase: (phase: BootPhase) => void;

  windows: WindowState[];
  activeWindowId: string | null;
  highestZIndex: number;

  openApp: (appId: AppId, options?: OpenAppOptions) => void;
  openSafari: (url: string, title?: string) => void;
  openDesktopIcon: (iconId: string) => void;
  closeWindow: (id: string) => void;
  finalizeClose: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  minimizeAllWindows: () => void;
  updateWindowPosition: (
    id: string,
    x: number,
    y: number,
    width: number,
    height: number
  ) => void;
  updateWindowPayload: (id: string, payload: WindowPayload) => void;

  settings: OSSettings;
  updateSettings: (settings: Partial<OSSettings>) => void;

  spotlightOpen: boolean;
  setSpotlightOpen: (open: boolean) => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  notificationCenterOpen: boolean;
  setNotificationCenterOpen: (open: boolean) => void;
  controlCenterOpen: boolean;
  setControlCenterOpen: (open: boolean) => void;

  notifications: Notification[];
  markNotificationRead: (id: string) => void;

  runningApps: AppId[];
  dockBounce: AppId | null;

  location: LocationState | null;
  weather: WeatherState | null;
  loadingLocation: boolean;
  loadingWeather: boolean;
  fetchLocationAndWeather: () => Promise<void>;
}

const defaultSettings: OSSettings = {
  wallpaper: defaultWallpaper,
  accentColor: "#007AFF",
  theme: "dark",
  animations: true,
  sound: false,
  blur: true,
  glass: true,
  dockMagnification: true,
  cursorGlow: true,
  mouseTrail: false,
  dockPosition: "bottom",
  dockSize: 64,
  transparency: 80,
};

const initialNotifications: Notification[] = [
  {
    id: "n1",
    title: "Welcome",
    message: "Welcome to Nishant's Portfolio OS! Double-click desktop icons to open apps.",
    time: "Just now",
    read: false,
  },
  {
    id: "n2",
    title: "Tip",
    message: "Press ⌘K for Command Palette or ⌘Space for Spotlight Search.",
    time: "1 min ago",
    read: false,
  },
];

const MULTI_INSTANCE_APPS: AppId[] = ["safari"];

function resolveSafariMode(url: string): WindowPayload["mode"] {
  if (url.includes("github.com")) return "github";
  if (url.includes("linkedin.com")) return "linkedin";
  if (url.includes("resume") || url.endsWith(".pdf")) return "resume";
  return "view";
}

function resolveSafariTitle(url: string, title?: string): string {
  if (title) return title;
  if (url.includes("github.com")) return "GitHub — Safari";
  if (url.includes("linkedin.com")) return "LinkedIn — Safari";
  return "Safari";
}

export const useOSStore = create<OSStore>()(
  persist(
    (set, get) => ({
      bootPhase: "boot",
      setBootPhase: (phase) => set({ bootPhase: phase }),

      windows: [],
      activeWindowId: null,
      highestZIndex: 100,

      openApp: (appId, options = {}) => {
        const { windows, highestZIndex, runningApps } = get();
        const { payload, title, forceNew } = options;

        if (appId === "github") {
          get().openSafari(about.github, "GitHub");
          return;
        }
        if (appId === "linkedin") {
          get().openSafari(about.linkedin, "LinkedIn");
          return;
        }

        if (!forceNew && !MULTI_INSTANCE_APPS.includes(appId)) {
          const existing = windows.find(
            (w) => w.appId === appId && !w.minimized && !w.closing
          );
          if (existing) {
            const newZ = highestZIndex + 1;
            set({
              activeWindowId: existing.id,
              highestZIndex: newZ,
              windows: windows.map((w) =>
                w.id === existing.id
                  ? {
                      ...w,
                      zIndex: newZ,
                      minimized: false,
                      payload: payload ?? w.payload,
                      title: title ?? w.title,
                    }
                  : w
              ),
            });
            return;
          }
        }

        const app = getAppDefinition(appId);
        if (!app) return;

        const newZ = highestZIndex + 1;
        const visibleWindows = windows.filter((w) => !w.closing);
        const offset = visibleWindows.length * 28;
        const newWindow: WindowState = {
          id: generateId(),
          appId,
          title: title ?? app.name,
          x: 60 + offset,
          y: 40 + offset,
          width: app.defaultSize?.width ?? 700,
          height: app.defaultSize?.height ?? 500,
          minimized: false,
          maximized: false,
          zIndex: newZ,
          payload,
        };

        set({
          windows: [...windows, newWindow],
          activeWindowId: newWindow.id,
          highestZIndex: newZ,
          runningApps: runningApps.includes(appId)
            ? runningApps
            : [...runningApps, appId],
          dockBounce: appId,
        });

        setTimeout(() => set({ dockBounce: null }), 600);
      },

      openSafari: (url, title) => {
        const mode = resolveSafariMode(url);
        get().openApp("safari", {
          forceNew: true,
          title: resolveSafariTitle(url, title),
          payload: { url, mode, title: resolveSafariTitle(url, title) },
        });
      },

      openDesktopIcon: (iconId) => {
        const icon = desktopIcons.find((i) => i.id === iconId);
        if (!icon) return;

        if (icon.action === "safari" && icon.url) {
          get().openSafari(icon.url, icon.name);
        } else if (icon.appId) {
          const payload =
            icon.appId === "contact" ? { mode: "compose" as const } : undefined;
          get().openApp(icon.appId, { payload });
        }
      },

      closeWindow: (id) => {
        const { settings, windows } = get();
        if (settings.animations) {
          set({
            windows: windows.map((w) =>
              w.id === id ? { ...w, closing: true } : w
            ),
          });
          setTimeout(() => get().finalizeClose(id), 250);
        } else {
          get().finalizeClose(id);
        }
      },

      finalizeClose: (id) => {
        const { windows, activeWindowId } = get();
        const filtered = windows.filter((w) => w.id !== id);
        const closedApp = windows.find((w) => w.id === id);
        const stillRunning = closedApp
          ? filtered.some((w) => w.appId === closedApp.appId)
          : false;

        set({
          windows: filtered,
          activeWindowId:
            activeWindowId === id
              ? filtered.length > 0
                ? filtered[filtered.length - 1].id
                : null
              : activeWindowId,
          runningApps: stillRunning
            ? get().runningApps
            : get().runningApps.filter((a) => a !== closedApp?.appId),
        });
      },

      focusWindow: (id) => {
        const { windows, highestZIndex } = get();
        const newZ = highestZIndex + 1;
        set({
          activeWindowId: id,
          highestZIndex: newZ,
          windows: windows.map((w) =>
            w.id === id ? { ...w, zIndex: newZ, minimized: false } : w
          ),
        });
      },

      minimizeWindow: (id) => {
        const { windows, activeWindowId } = get();
        const remaining = windows.filter(
          (w) => w.id !== id && !w.minimized && !w.closing
        );
        set({
          windows: windows.map((w) =>
            w.id === id ? { ...w, minimized: true } : w
          ),
          activeWindowId:
            activeWindowId === id
              ? remaining.length > 0
                ? remaining[remaining.length - 1].id
                : null
              : activeWindowId,
        });
      },

      minimizeAllWindows: () => {
        const { windows } = get();
        windows.forEach((w) => {
          if (!w.minimized) get().minimizeWindow(w.id);
        });
      },

      maximizeWindow: (id) => {
        const win = get().windows.find((w) => w.id === id);
        if (!win || win.maximized) return;
        set({
          windows: get().windows.map((w) =>
            w.id === id
              ? {
                  ...w,
                  maximized: true,
                  preMaximizeBounds: {
                    x: w.x,
                    y: w.y,
                    width: w.width,
                    height: w.height,
                  },
                }
              : w
          ),
        });
      },

      restoreWindow: (id) => {
        const win = get().windows.find((w) => w.id === id);
        if (!win?.preMaximizeBounds) {
          set({
            windows: get().windows.map((w) =>
              w.id === id ? { ...w, maximized: false } : w
            ),
          });
          return;
        }
        const bounds = win.preMaximizeBounds;
        set({
          windows: get().windows.map((w) =>
            w.id === id
              ? {
                  ...w,
                  maximized: false,
                  x: bounds.x,
                  y: bounds.y,
                  width: bounds.width,
                  height: bounds.height,
                  preMaximizeBounds: undefined,
                }
              : w
          ),
        });
      },

      updateWindowPosition: (id, x, y, width, height) => {
        set({
          windows: get().windows.map((w) =>
            w.id === id ? { ...w, x, y, width, height } : w
          ),
        });
      },

      updateWindowPayload: (id, payload) => {
        set({
          windows: get().windows.map((w) =>
            w.id === id ? { ...w, payload: { ...w.payload, ...payload } } : w
          ),
        });
      },

      settings: defaultSettings,
      updateSettings: (partial) =>
        set({ settings: { ...get().settings, ...partial } }),

      spotlightOpen: false,
      setSpotlightOpen: (open) => set({ spotlightOpen: open }),
      commandPaletteOpen: false,
      setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
      notificationCenterOpen: false,
      setNotificationCenterOpen: (open) =>
        set({ notificationCenterOpen: open }),
      controlCenterOpen: false,
      setControlCenterOpen: (open) => set({ controlCenterOpen: open }),

      notifications: initialNotifications,
      markNotificationRead: (id) =>
        set({
          notifications: get().notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        }),

      runningApps: [],
      dockBounce: null,

      location: null,
      weather: null,
      loadingLocation: false,
      loadingWeather: false,

      fetchLocationAndWeather: async () => {
        set({ loadingLocation: true, loadingWeather: true });
        
        const fetchWeather = async (lat: number, lon: number) => {
          try {
            const weatherRes = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=sunrise,sunset&timezone=auto`
            );
            if (!weatherRes.ok) throw new Error("Weather fetch failed");
            const data = await weatherRes.json();
            const current = data.current;
            const daily = data.daily;
            
            const code = current.weather_code;
            let condition = "Clear";
            let icon = "Sun";
            if (code === 0) { condition = "Clear"; icon = "Sun"; }
            else if (code >= 1 && code <= 3) { condition = "Partly Cloudy"; icon = "CloudSun"; }
            else if (code === 45 || code === 48) { condition = "Foggy"; icon = "CloudFog"; }
            else if (code >= 51 && code <= 55) { condition = "Drizzle"; icon = "CloudDrizzle"; }
            else if (code >= 61 && code <= 65) { condition = "Rainy"; icon = "CloudRain"; }
            else if (code >= 71 && code <= 75) { condition = "Snowy"; icon = "CloudSnow"; }
            else if (code >= 80 && code <= 82) { condition = "Showers"; icon = "CloudRainWind"; }
            else if (code === 95) { condition = "Thunderstorm"; icon = "CloudLightning"; }

            const formatHourMin = (isoString?: string) => {
              if (!isoString) return "";
              const date = new Date(isoString);
              return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            };

            const weather: WeatherState = {
              temp: Math.round(current.temperature_2m),
              condition,
              humidity: Math.round(current.relative_humidity_2m),
              windSpeed: Math.round(current.wind_speed_10m),
              feelsLike: Math.round(current.apparent_temperature),
              sunrise: formatHourMin(daily.sunrise?.[0]),
              sunset: formatHourMin(daily.sunset?.[0]),
              icon,
              tempMax: daily.temperature_2m_max ? Math.round(daily.temperature_2m_max[0]) : Math.round(current.temperature_2m + 3),
              tempMin: daily.temperature_2m_min ? Math.round(daily.temperature_2m_min[0]) : Math.round(current.temperature_2m - 4),
            };
            set({ weather, loadingWeather: false });
          } catch (e) {
            console.error("Failed to fetch weather", e);
            set({ loadingWeather: false });
          }
        };

        const fetchReverseGeocode = async (lat: number, lon: number) => {
          try {
            const res = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
            );
            if (!res.ok) throw new Error("Geocoding failed");
            const data = await res.json();
            const location: LocationState = {
              city: data.city || data.locality || "Unknown City",
              state: data.principalSubdivision || "Unknown State",
              country: data.countryName || "Unknown Country",
              latitude: lat,
              longitude: lon,
            };
            set({ location, loadingLocation: false });
          } catch (e) {
            console.error("Failed to reverse geocode", e);
            set({
              location: { city: "City", state: "State", country: "Country", latitude: lat, longitude: lon },
              loadingLocation: false
            });
          }
        };

        const fallbackIpLocation = async () => {
          try {
            const ipRes = await fetch("https://ipapi.co/json/");
            if (!ipRes.ok) throw new Error("IP geolocation failed");
            const ipData = await ipRes.json();
            const lat = ipData.latitude;
            const lon = ipData.longitude;
            if (lat && lon) {
              set({
                location: {
                  city: ipData.city || "Unknown City",
                  state: ipData.region || "Unknown Region",
                  country: ipData.country_name || "Unknown Country",
                  latitude: lat,
                  longitude: lon,
                },
                loadingLocation: false,
              });
              await fetchWeather(lat, lon);
            } else {
              throw new Error("Invalid lat/lon from IP");
            }
          } catch (e) {
            console.error("Fallback IP location failed", e);
            set({
              location: { city: "Cupertino", state: "California", country: "United States", latitude: 37.323, longitude: -122.032 },
              loadingLocation: false,
            });
            await fetchWeather(37.323, -122.032);
          }
        };

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              await Promise.all([
                fetchReverseGeocode(latitude, longitude),
                fetchWeather(latitude, longitude),
              ]);
            },
            async (err) => {
              console.warn("Geolocation prompt failed, falling back to IP", err);
              await fallbackIpLocation();
            },
            { timeout: 8000 }
          );
        } else {
          await fallbackIpLocation();
        }
      },

      //runningApps: [],
      //dockBounce: null,
    }),
    {
      name: "portfolio-os-settings",
      partialize: (state) => ({ settings: state.settings }),
    }
  )
);
