"use client";

import { experiences } from "@/data/experience";
import { AppShell } from "@/components/shared/AppShell";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

export default function ExperienceApp() {
  return (
    <AppShell title="Experience">
      <div className="relative space-y-6 pl-6">
        <div className="absolute left-2 top-2 bottom-2 w-px bg-white/10" />

        {experiences.map((exp, i) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className="relative"
          >
            <div className="absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)]/20 ring-4 ring-gray-900">
              <Briefcase size={14} className="text-[var(--accent)]" />
            </div>

            <div className="ml-4 rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold">{exp.role}</h3>
                  <p className="text-sm text-[var(--accent)]">{exp.company}</p>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs">
                  {exp.period}
                </span>
              </div>
              <p className="mt-2 text-sm opacity-70">{exp.description}</p>
              <ul className="mt-3 space-y-1">
                {exp.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2 text-xs opacity-60"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </AppShell>
  );
}
