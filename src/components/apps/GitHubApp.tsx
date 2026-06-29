"use client";

import { about } from "@/data/about";
import { githubRepos } from "@/data/github-repos";
import { AppShell } from "@/components/shared/AppShell";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star, GitFork } from "lucide-react";

export default function GitHubApp() {
  return (
    <AppShell title="GitHub">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">@{about.githubUsername}</h2>
          <p className="text-sm opacity-60">{about.name} — {about.titles[0]}</p>
        </div>
        <Button size="sm" onClick={() => window.open(about.github, "_blank")}>
          <ExternalLink size={14} />
          View Profile
        </Button>
      </div>

      <div className="grid gap-3">
        {githubRepos.map((repo) => (
          <div
            key={repo.id}
            className="rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-[var(--accent)]">{repo.name}</h3>
                <p className="mt-1 text-xs opacity-60 line-clamp-2">{repo.description}</p>
              </div>
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 rounded-lg p-2 hover:bg-white/10"
                aria-label={`Open ${repo.name} on GitHub`}
              >
                <ExternalLink size={14} />
              </a>
            </div>
            <div className="mt-2 flex items-center gap-4 text-xs opacity-50">
              <span className="flex items-center gap-1">
                <Star size={12} /> {repo.stars}
              </span>
              <span className="flex items-center gap-1">
                <GitFork size={12} /> {repo.forks}
              </span>
              <span>{repo.language}</span>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
