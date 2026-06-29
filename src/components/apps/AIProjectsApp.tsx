"use client";

import { projects } from "@/data/projects";
import { AppShell } from "@/components/shared/AppShell";
import { ProjectCard } from "@/components/shared/ProjectCard";

export default function AIProjectsApp() {
  const aiProjects = projects.filter(
    (p) => p.category === "AI/ML" || p.id === "ai-xray"
  );

  return (
    <AppShell title="AI Projects">
      <div className="grid gap-4 sm:grid-cols-2">
        {aiProjects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </AppShell>
  );
}
