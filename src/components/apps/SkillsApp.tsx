"use client";

import { skillCategories } from "@/data/skills";
import { AppShell } from "@/components/shared/AppShell";
import { motion } from "framer-motion";

const categoryColors: Record<string, string> = {
  Frontend: "from-blue-500/20 to-cyan-500/20",
  Backend: "from-green-500/20 to-emerald-500/20",
  Databases: "from-purple-500/20 to-pink-500/20",
  Tools: "from-orange-500/20 to-amber-500/20",
  Cloud: "from-sky-500/20 to-indigo-500/20",
};

export default function SkillsApp() {
  return (
    <AppShell title="Skills">
      <div className="grid gap-4 sm:grid-cols-2">
        {skillCategories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-2xl border border-white/10 bg-gradient-to-br ${categoryColors[cat.name] ?? "from-white/5 to-white/10"} p-4`}
          >
            <h3 className="mb-3 font-semibold">{cat.name}</h3>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </AppShell>
  );
}
