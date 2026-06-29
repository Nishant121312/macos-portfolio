"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { useOSStore } from "@/store/useOSStore";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { BootScreen } from "./BootScreen";
import { LoadingScreen } from "./LoadingScreen";
import { LoginScreen } from "./LoginScreen";
import { Desktop } from "./Desktop";
import { cn } from "@/lib/utils";

export function OSExperience() {
  const { bootPhase, setBootPhase, settings } = useOSStore();
  const [hasMounted, setHasMounted] = useState(false);
  useKeyboardShortcuts();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (bootPhase === "boot") {
      const timer = setTimeout(() => setBootPhase("loading"), 2800);
      return () => clearTimeout(timer);
    }
    if (bootPhase === "loading") {
      const timer = setTimeout(() => setBootPhase("login"), 2200);
      return () => clearTimeout(timer);
    }
  }, [bootPhase, setBootPhase]);

  useEffect(() => {
    if (hasMounted) {
      document.documentElement.style.setProperty("--accent", settings.accentColor);
      document.documentElement.classList.toggle("dark", settings.theme === "dark");
      document.documentElement.classList.toggle("light", settings.theme === "light");
    }
  }, [hasMounted, settings.accentColor, settings.theme]);

  const fetchLocationAndWeather = useOSStore((s) => s.fetchLocationAndWeather);
  useEffect(() => {
    if (bootPhase === "desktop") {
      fetchLocationAndWeather();
      const interval = setInterval(fetchLocationAndWeather, 15 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [bootPhase, fetchLocationAndWeather]);

  const activeTheme = hasMounted ? settings.theme : "dark";

  return (
    <div
      className={cn(
        "fixed inset-0 overflow-hidden",
        activeTheme === "dark" ? "bg-black" : "bg-gray-100"
      )}
    >
      <AnimatePresence mode="wait">
        {bootPhase === "boot" && <BootScreen key="boot" />}
        {bootPhase === "loading" && <LoadingScreen key="loading" />}
        {bootPhase === "login" && <LoginScreen key="login" />}
        {bootPhase === "desktop" && <Desktop key="desktop" />}
      </AnimatePresence>

      <Toaster
        position="top-center"
        toastOptions={{
          className: "!bg-gray-900/90 !text-white !backdrop-blur-xl !border !border-white/10",
        }}
      />
    </div>
  );
}
