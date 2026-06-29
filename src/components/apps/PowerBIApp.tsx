"use client";

import { projects } from "@/data/projects";
import { AppShell } from "@/components/shared/AppShell";
import { ProjectCard } from "@/components/shared/ProjectCard";

export default function PowerBIApp() {
  const project = projects.find((p) => p.id === "powerbi")!;

  return (
    <AppShell title="Power BI Dashboard">
      <ProjectCard project={project} />
    </AppShell>
  );
}
