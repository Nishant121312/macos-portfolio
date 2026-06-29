"use client";

import { projects } from "@/data/projects";
import { AppShell } from "@/components/shared/AppShell";
import { ProjectCard } from "@/components/shared/ProjectCard";

export default function PythonProjectsApp() {
  const pythonProjects = projects.filter((p) =>
    p.techStack.some((t) => t.toLowerCase().includes("python"))
  );

  return (
    <AppShell title="Python Projects">
      <div className="grid gap-4 sm:grid-cols-2">
        {pythonProjects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </AppShell>
  );
}
