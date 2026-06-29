"use client";

import { useState } from "react";
import { useOSStore } from "@/store/useOSStore";
import { AppShell } from "@/components/shared/AppShell";
import { cn } from "@/lib/utils";
import type { AppWindowProps } from "@/types";

export default function MailApp({ payload }: AppWindowProps) {
  const [view, setView] = useState<"inbox" | "compose">(
    payload?.mode === "compose" ? "compose" : "inbox"
  );
  const theme = useOSStore((s) => s.settings.theme);
  const { openApp } = useOSStore();

  const emails = [
    {
      id: 1,
      from: "recruiter@techcorp.com",
      subject: "Full Stack Developer Opportunity",
      preview: "Hi Nishant, we came across your portfolio and would love to connect...",
      time: "2h ago",
    },
    {
      id: 2,
      from: "github-noreply@github.com",
      subject: "[portfolio] New star on your repository",
      preview: "Someone starred your repository portfolio-os...",
      time: "5h ago",
    },
    {
      id: 3,
      from: "newsletter@dev.to",
      subject: "Weekly Dev Digest — Top Articles",
      preview: "This week's most popular developer articles...",
      time: "1d ago",
    },
  ];

  return (
    <AppShell noPadding>
      <div className="flex h-full">
        <aside
          className={cn(
            "w-48 shrink-0 border-r p-2",
            theme === "dark" ? "border-white/10" : "border-black/10"
          )}
        >
          <button
            onClick={() => openApp("contact", { payload: { mode: "compose" } })}
            className="mb-2 flex w-full items-center gap-2 rounded-lg bg-[var(--accent)]/20 px-3 py-2 text-sm font-medium hover:bg-[var(--accent)]/30"
          >
            Compose
          </button>
          <button
            onClick={() => setView("inbox")}
            className={cn(
              "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
              view === "inbox" ? "bg-white/10 font-medium" : "opacity-60 hover:bg-white/10"
            )}
          >
            Inbox
          </button>
        </aside>

        <div className="flex-1 overflow-auto">
          {view === "inbox" ? (
            emails.map((email) => (
              <button
                key={email.id}
                className="flex w-full items-start gap-3 border-b border-white/5 px-4 py-3 text-left hover:bg-white/5 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-medium">{email.from}</span>
                    <span className="shrink-0 text-xs opacity-40">{email.time}</span>
                  </div>
                  <p className="truncate text-sm">{email.subject}</p>
                  <p className="truncate text-xs opacity-50">{email.preview}</p>
                </div>
              </button>
            ))
          ) : (
            <div className="p-6 text-center text-sm opacity-60">
              Opening Contact compose...
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
