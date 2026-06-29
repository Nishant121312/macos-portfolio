"use client";

import { projects } from "@/data/projects";
import { AppShell } from "@/components/shared/AppShell";
import { ProjectCard } from "@/components/shared/ProjectCard";

export default function ITAssetApp() {
  const project = projects.find((p) => p.id === "it-asset")!;

  return (
    <AppShell title="IT Asset Management">
      <ProjectCard project={project} />
    </AppShell>
  );
}
