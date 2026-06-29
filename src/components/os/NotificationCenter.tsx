"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useOSStore } from "@/store/useOSStore";

export function NotificationCenter() {
  const {
    notificationCenterOpen,
    setNotificationCenterOpen,
    notifications,
    markNotificationRead,
  } = useOSStore();

  return (
    <AnimatePresence>
      {notificationCenterOpen && (
        <motion.div
          className="fixed inset-0 z-[9400]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setNotificationCenterOpen(false)}
        >
          <motion.div
            className="absolute right-2 top-8 w-80 overflow-hidden rounded-2xl border border-white/10 bg-gray-900/90 shadow-2xl backdrop-blur-2xl"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <h3 className="text-sm font-semibold">Notifications</h3>
              <button
                onClick={() => setNotificationCenterOpen(false)}
                className="rounded-lg p-1 hover:bg-white/10"
              >
                <X size={14} />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto p-2">
              {notifications.map((n) => (
                <button
                  key={n.id}
                  onClick={() => markNotificationRead(n.id)}
                  className={`mb-1 w-full rounded-xl p-3 text-left transition-colors hover:bg-white/10 ${
                    !n.read ? "bg-white/5" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium">{n.title}</p>
                    {!n.read && (
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-white/50">{n.message}</p>
                  <p className="mt-1 text-xs text-white/30">{n.time}</p>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
