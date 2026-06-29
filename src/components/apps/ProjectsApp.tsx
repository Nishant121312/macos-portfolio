"use client";

import { projects } from "@/data/projects";
import { AppShell } from "@/components/shared/AppShell";
import { ProjectCard } from "@/components/shared/ProjectCard";

export default function ProjectsApp() {
  return (
    <AppShell title="Projects">
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </AppShell>
  );
}
