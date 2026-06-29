"use client";

import { about } from "@/data/about";
import { AppShell } from "@/components/shared/AppShell";
import { Button } from "@/components/ui/button";
import { ExternalLink, Trophy, Target } from "lucide-react";

const stats = [
  { label: "Problems Solved", value: "350+", icon: Target },
  { label: "Contest Rating", value: "1650", icon: Trophy },
  { label: "Easy", value: "120" },
  { label: "Medium", value: "180" },
  { label: "Hard", value: "50" },
];

export default function LeetCodeApp() {
  return (
    <AppShell title="LeetCode">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-6 flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-orange-500/20 text-3xl">
          🧮
        </div>
        <h2 className="text-xl font-bold">{about.name}</h2>
        <p className="text-sm opacity-60">LeetCode Profile</p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-white/10 bg-white/5 p-3"
            >
              {s.icon && <s.icon size={16} className="mx-auto mb-1 text-orange-400" />}
              <p className="text-lg font-bold">{s.value}</p>
              <p className="text-xs opacity-50">{s.label}</p>
            </div>
          ))}
        </div>

        <Button
          className="mt-6 w-full"
          onClick={() => window.open(about.leetcode, "_blank")}
        >
          <ExternalLink size={14} />
          View on LeetCode
        </Button>
      </div>
    </AppShell>
  );
}
