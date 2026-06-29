"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { about } from "@/data/about";
import { useOSStore } from "@/store/useOSStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function LoginScreen() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);
  const setBootPhase = useOSStore((s) => s.setBootPhase);

  const handleLogin = () => {
    if (password === "portfolio" || password === "") {
      setBootPhase("desktop");
    } else {
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(20px)" }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <motion.div
        className="relative z-10 flex w-full max-w-sm flex-col items-center px-6"
        animate={shaking ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="mb-4 flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-4xl font-bold text-white shadow-2xl ring-4 ring-white/20"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, ease: [0.36, 0.07, 0.19, 0.97] }}
        >
          <Image
            src={about.avatar}
            alt={about.name}
            width={112}
            height={112}
            className="h-full w-full object-cover"
          />
        </motion.div>

        <motion.h2
          className="mb-1 text-xl font-semibold text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {about.name}
        </motion.h2>

        <motion.p
          className="mb-6 text-sm text-white/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Enter password to unlock
        </motion.p>

        <motion.div
          className="w-full space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Input
            type="password"
            placeholder="Password (hint: portfolio)"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            onKeyDown={handleKeyDown}
            className={error ? "border-red-500/50 ring-red-500/30" : ""}
          />
          {error && (
            <p className="text-center text-xs text-red-400">
              Incorrect password. Try &quot;portfolio&quot;
            </p>
          )}
          <Button onClick={handleLogin} className="w-full" size="lg">
            Log In
          </Button>
        </motion.div>

        <motion.p
          className="mt-6 text-xs text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Press Enter or click Log In • Leave empty to continue
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
