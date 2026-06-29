"use client";

import { useState, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Plus,
  Share,
  Star,
  X,
} from "lucide-react";
import Image from "next/image";
import { about } from "@/data/about";
import { projects } from "@/data/projects";
import { githubRepos } from "@/data/github-repos";
import { skillCategories } from "@/data/skills";
import { experiences } from "@/data/experience";
import { useOSStore } from "@/store/useOSStore";
import { AppShell } from "@/components/shared/AppShell";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { cn } from "@/lib/utils";
import type { AppWindowProps, SafariTab } from "@/types";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { generateId } from "@/lib/utils";

const BOOKMARKS = [
  { label: "Portfolio", url: about.portfolio },
  { label: "GitHub", url: about.github },
  { label: "LinkedIn", url: about.linkedin },
  { label: "Resume", url: "/resume.pdf" },
];

const PORTFOLIO_PAGES = [
  { id: "home", label: "Home", url: about.portfolio },
  { id: "about", label: "About", url: "portfolio://about" },
  { id: "projects", label: "Projects", url: "portfolio://projects" },
  { id: "skills", label: "Skills", url: "portfolio://skills" },
  { id: "contact", label: "Contact", url: "portfolio://contact" },
];

function GitHubProfileView() {
  const pinned = githubRepos.slice(0, 6);

  return (
    <div className="h-full overflow-auto bg-[#0d1117] text-white">
      <div className="border-b border-[#30363d] bg-[#161b22] px-6 py-8">
        <div className="mx-auto flex max-w-4xl gap-6">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full ring-2 ring-[#30363d]">
            <Image src={about.avatar} alt={about.name} fill className="object-cover" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{about.name}</h1>
            <p className="text-[#8b949e]">@{about.githubUsername}</p>
            <p className="text-[#8b949e]">{about.titles[0]}</p>
            <p className="mt-2 max-w-xl text-sm text-[#c9d1d9]">
              {about.intro.slice(0, 180)}...
            </p>
            <div className="mt-3 flex gap-4 text-sm text-[#8b949e]">
              <span>📍 {about.location}</span>
              <a
                href={about.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#58a6ff] hover:underline"
              >
                {about.github.replace("https://", "")}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-6">
        <h2 className="mb-4 text-lg font-semibold">Repositories</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {pinned.map((repo) => (
            <a
              key={repo.id}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-[#30363d] bg-[#161b22] p-4 transition-colors hover:border-[#58a6ff]"
            >
              <div className="flex items-center gap-2 text-[#58a6ff]">
                <FaGithub size={14} />
                <span className="font-medium">{repo.name}</span>
              </div>
              <p className="mt-2 text-xs text-[#8b949e] line-clamp-2">{repo.description}</p>
              <div className="mt-3 flex gap-3 text-xs text-[#8b949e]">
                <span className="rounded-full bg-[#58a6ff]/20 px-2 py-0.5">{repo.language}</span>
                <span>★ {repo.stars}</span>
                <span>⑂ {repo.forks}</span>
              </div>
            </a>
          ))}
        </div>

        <h2 className="mb-4 mt-8 text-lg font-semibold">Contribution Activity</h2>
        <div className="rounded-lg border border-[#30363d] bg-[#161b22] p-4">
          <div className="flex flex-wrap gap-1">
            {Array.from({ length: 52 * 7 }).map((_, i) => {
              const intensity = (i * 7 + 13) % 5;
              const colors = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];
              return (
                <div
                  key={i}
                  className="h-2.5 w-2.5 rounded-sm"
                  style={{ backgroundColor: colors[intensity] }}
                />
              );
            })}
          </div>
          <p className="mt-3 text-xs text-[#8b949e]">
            {(projects.length * 47 + 120)} contributions in the last year
          </p>
        </div>
      </div>
    </div>
  );
}


function AppleMusicView() {
  const [playlistId, setPlaylistId] = useState("pl.2f0c688e15cc49f4931a0e167e411425"); // Lo-Fi Beats
  const [miniPlayer, setMiniPlayer] = useState(false);

  const playlists = [
    { name: "Lo-Fi Beats", id: "pl.2f0c688e15cc49f4931a0e167e411425" },
    { name: "Today's Hits", id: "pl.f7296719e7424cc48375cc9e63ab9ef9" },
    { name: "Deep Focus", id: "pl.d3dc122b51204d1ba5256e29df05164f" },
    { name: "Chill Mix", id: "pl.77258385012544e3b1c6e114299b9cf9" }
  ];

  return (
    <div className={cn("h-full bg-[#1c1c1e] text-white flex flex-col sm:flex-row", miniPlayer ? "justify-center items-center" : "")}>
      {!miniPlayer && (
        <aside className="w-full sm:w-44 bg-black/20 border-b sm:border-b-0 sm:border-r border-white/10 p-3 space-y-3 shrink-0">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2">Discover</p>
          <div className="space-y-0.5">
            <button className="flex w-full text-left text-xs font-semibold px-2 py-1.5 rounded-lg bg-white/10 text-white">Listen Now</button>
            <button className="flex-none sm:flex w-full text-left text-xs font-medium px-2 py-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5">Browse</button>
            <button className="flex-none sm:flex w-full text-left text-xs font-medium px-2 py-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5">Radio</button>
          </div>
          
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2 pt-1.5">Playlists</p>
          <div className="space-y-0.5 flex flex-row sm:flex-col overflow-x-auto sm:overflow-x-visible gap-1 sm:gap-0 pb-2 sm:pb-0">
            {playlists.map((pl) => (
              <button 
                key={pl.id}
                onClick={() => setPlaylistId(pl.id)}
                className={cn(
                  "flex text-left text-xs px-2 py-1.5 rounded-lg truncate shrink-0 sm:w-full",
                  playlistId === pl.id ? "bg-rose-500/20 text-rose-400 font-medium" : "text-zinc-400 hover:text-white hover:bg-white/5"
                )}
              >
                {pl.name}
              </button>
            ))}
          </div>
        </aside>
      )}

      <div className="flex-1 flex flex-col h-full overflow-hidden p-4 sm:p-6 gap-3">
        {!miniPlayer && (
          <div className="flex justify-between items-center shrink-0">
            <h1 className="text-base font-bold tracking-tight text-rose-500 flex items-center gap-1.5">
              <span className="text-xl"></span> Music
            </h1>
            <button 
              onClick={() => setMiniPlayer(true)}
              className="text-[11px] bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              Mini Player
            </button>
          </div>
        )}

        {miniPlayer && (
          <div className="w-full flex justify-end shrink-0 -mb-1">
            <button 
              onClick={() => setMiniPlayer(false)}
              className="text-[10px] text-rose-400 hover:underline"
            >
              Exit Mini Player
            </button>
          </div>
        )}

        <div className="flex-1 flex justify-center items-center">
          <div className={cn("w-full h-full max-w-2xl bg-black/40 rounded-xl overflow-hidden border border-white/10 shadow-2xl relative", miniPlayer ? "max-h-[150px] max-w-[360px]" : "max-h-[460px]")}>
            <iframe
              allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
              frameBorder="0"
              height="100%"
              style={{ width: "100%", height: "100%", background: "transparent" }}
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
              src={`https://embed.music.apple.com/us/playlist/${playlistId}`}
              className="rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}


function LinkedInProfileView() {
  return (
    <div className="h-full overflow-auto bg-[#f3f2ef] text-[#191919]">
      <div className="mx-auto max-w-2xl">
        <div className="overflow-hidden rounded-b-lg bg-white shadow-sm">
          <div className="h-32 bg-gradient-to-r from-[#0a66c2] to-[#004182]" />
          <div className="relative px-6 pb-6">
            <div className="absolute -top-12 h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-[#0a66c2]">
              <Image src={about.avatar} alt={about.name} fill className="object-cover" />
            </div>
            <div className="pt-14">
              <h1 className="text-xl font-bold">{about.name}</h1>
              <p className="text-sm">{about.titles[0]}</p>
              <p className="text-xs text-[#666]">{about.location}</p>
              <a
                href={about.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#0a66c2] px-4 py-1.5 text-sm text-white hover:bg-[#004182]"
              >
                <FaLinkedin size={14} /> Open on LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-2 rounded-lg bg-white p-6 shadow-sm">
          <h2 className="font-semibold">About</h2>
          <p className="mt-2 text-sm text-[#666] leading-relaxed">{about.intro}</p>
        </div>

        <div className="mt-2 rounded-lg bg-white p-6 shadow-sm">
          <h2 className="font-semibold">Experience</h2>
          {experiences.map((e) => (
            <div key={e.id} className="mt-4 border-t border-[#eee] pt-4 first:mt-2 first:border-0 first:pt-0">
              <p className="font-medium text-sm">{e.role}</p>
              <p className="text-sm text-[#666]">{e.company}</p>
              <p className="text-xs text-[#999]">{e.period}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PortfolioPageView({ pageId }: { pageId: string }) {
  switch (pageId) {
    case "home":
      return (
        <div className="py-12 text-center">
          <h1 className="mb-2 text-3xl font-bold">{about.name}</h1>
          <p className="mb-4 text-lg opacity-60">{about.titles[0]}</p>
          <p className="mx-auto max-w-lg text-sm leading-relaxed opacity-50">
            {about.intro.slice(0, 280)}...
          </p>
        </div>
      );
    case "about":
      return (
        <div className="mx-auto max-w-2xl px-6 py-8">
          <h2 className="mb-4 text-2xl font-bold">About</h2>
          <p className="whitespace-pre-line text-sm leading-relaxed opacity-70">{about.intro}</p>
        </div>
      );
    case "projects":
      return (
        <div className="grid gap-4 p-4 sm:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} compact />
          ))}
        </div>
      );
    case "skills":
      return (
        <div className="grid gap-4 p-6 sm:grid-cols-2">
          {skillCategories.map((cat) => (
            <div key={cat.name} className="rounded-xl bg-white/5 p-4">
              <h3 className="mb-2 font-semibold">{cat.name}</h3>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((s) => (
                  <span key={s} className="rounded-md bg-white/10 px-2 py-0.5 text-xs">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    case "contact":
      return (
        <div className="mx-auto max-w-md py-12 text-center">
          <h2 className="mb-6 text-2xl font-bold">Contact</h2>
          <div className="space-y-2 text-sm">
            <p>📧 {about.email}</p>
            <p>📞 {about.phone}</p>
            <p>📍 {about.location}</p>
          </div>
        </div>
      );
    case "resume":
      return (
        <div className="p-8 text-center">
          <p className="text-sm opacity-60">Open the Resume app from desktop for full PDF preview.</p>
        </div>
      );
    default:
      return null;
  }
}

function resolvePageId(url: string): string {
  if (url.startsWith("portfolio://")) return url.replace("portfolio://", "");
  if (url === about.portfolio) return "home";
  return "home";
}

export default function SafariApp({ payload }: AppWindowProps) {
  const initialUrl = payload?.url ?? about.portfolio;
  const [tabs, setTabs] = useState<SafariTab[]>([
    { id: generateId(), title: payload?.title ?? "Portfolio", url: initialUrl },
  ]);
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);
  const [history, setHistory] = useState<string[][]>([[initialUrl]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [addressInput, setAddressInput] = useState(initialUrl);
  const theme = useOSStore((s) => s.settings.theme);
  const { openApp } = useOSStore();

  const activeTab = tabs.find((t) => t.id === activeTabId) ?? tabs[0];
  const activeUrl = activeTab.url;

  const navigate = useCallback(
    (url: string, title?: string) => {
      setTabs((prev) =>
        prev.map((t) =>
          t.id === activeTabId ? { ...t, url, title: title ?? t.title } : t
        )
      );
      setAddressInput(url);
      setHistory((prev) => {
        const tabHistory = prev[0] ?? [];
        const next = [...tabHistory.slice(0, historyIndex + 1), url];
        return [next];
      });
      setHistoryIndex((i) => i + 1);
    },
    [activeTabId, historyIndex]
  );

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const url = history[0][newIndex];
      setHistoryIndex(newIndex);
      setTabs((prev) =>
        prev.map((t) => (t.id === activeTabId ? { ...t, url } : t))
      );
      setAddressInput(url);
    }
  };

  const goForward = () => {
    const tabHistory = history[0] ?? [];
    if (historyIndex < tabHistory.length - 1) {
      const newIndex = historyIndex + 1;
      const url = tabHistory[newIndex];
      setHistoryIndex(newIndex);
      setTabs((prev) =>
        prev.map((t) => (t.id === activeTabId ? { ...t, url } : t))
      );
      setAddressInput(url);
    }
  };

  const refresh = () => navigate(activeUrl);

  const addTab = () => {
    const tab: SafariTab = {
      id: generateId(),
      title: "New Tab",
      url: about.portfolio,
    };
    setTabs((prev) => [...prev, tab]);
    setActiveTabId(tab.id);
    setAddressInput(about.portfolio);
  };

  const closeTab = (id: string) => {
    if (tabs.length === 1) return;
    const idx = tabs.findIndex((t) => t.id === id);
    const next = tabs.filter((t) => t.id !== id);
    setTabs(next);
    if (activeTabId === id) {
      setActiveTabId(next[Math.max(0, idx - 1)].id);
    }
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let url = addressInput.trim();
    if (!url.startsWith("http") && !url.startsWith("portfolio://")) {
      url = `https://${url}`;
    }
    navigate(url);
  };

  const renderContent = () => {
    if (activeUrl.includes("github.com")) return <GitHubProfileView />;
    if (activeUrl.includes("linkedin.com")) return <LinkedInProfileView />;
    if (activeUrl.includes("music.apple.com")) return <AppleMusicView />;
    if (activeUrl.includes("resume") || activeUrl.endsWith(".pdf") || activeUrl === "portfolio://resume") {
      return (
        <div className="flex h-full flex-col">
          <iframe
            src={about.resumeUrl}
            title="Resume"
            className="h-full w-full bg-white"
          />
        </div>
      );
    }
    const pageId = resolvePageId(activeUrl);
    return <PortfolioPageView pageId={pageId} />;
  };

  return (
    <AppShell noPadding>
      <div
        className={cn(
          "flex items-center gap-2 border-b px-3 py-2",
          theme === "dark" ? "border-white/10 bg-white/5" : "border-black/10"
        )}
      >
        <button
          onClick={goBack}
          disabled={historyIndex <= 0}
          className="rounded p-1 hover:bg-white/10 disabled:opacity-30"
          aria-label="Back"
        >
          <ChevronLeft size={14} />
        </button>
        <button
          onClick={goForward}
          disabled={historyIndex >= (history[0]?.length ?? 1) - 1}
          className="rounded p-1 hover:bg-white/10 disabled:opacity-30"
          aria-label="Forward"
        >
          <ChevronRight size={14} />
        </button>
        <button onClick={refresh} className="rounded p-1 hover:bg-white/10" aria-label="Refresh">
          <RotateCw size={14} />
        </button>
        <form onSubmit={handleAddressSubmit} className="flex-1">
          <input
            value={addressInput}
            onChange={(e) => setAddressInput(e.target.value)}
            className="w-full rounded-lg bg-white/10 px-3 py-1 text-xs outline-none focus:ring-1 focus:ring-[var(--accent)]"
          />
        </form>
        <button
          onClick={() => setShowBookmarks(!showBookmarks)}
          className={cn("rounded p-1 hover:bg-white/10", showBookmarks && "bg-white/10")}
          aria-label="Bookmarks"
        >
          <Star size={14} />
        </button>
        <button onClick={addTab} className="rounded p-1 hover:bg-white/10" aria-label="New tab">
          <Plus size={14} />
        </button>
        <button
          onClick={() => navigator.clipboard?.writeText(activeUrl)}
          className="rounded p-1 hover:bg-white/10"
          aria-label="Share"
        >
          <Share size={14} />
        </button>
      </div>

      {showBookmarks && (
        <div className="flex gap-2 border-b px-3 py-2">
          {BOOKMARKS.map((b) => (
            <button
              key={b.url}
              onClick={() => navigate(b.url, b.label)}
              className="rounded-full bg-white/10 px-3 py-1 text-xs hover:bg-white/20"
            >
              {b.label}
            </button>
          ))}
        </div>
      )}

      <div className="flex border-b overflow-x-auto">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={cn(
              "flex items-center gap-1 border-r px-3 py-1.5 text-xs cursor-pointer shrink-0",
              tab.id === activeTabId
                ? "bg-white/10 text-white"
                : "opacity-50 hover:opacity-80"
            )}
            onClick={() => {
              setActiveTabId(tab.id);
              setAddressInput(tab.url);
            }}
          >
            <span className="max-w-24 truncate">{tab.title}</span>
            {tabs.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeTab(tab.id);
                }}
                className="rounded p-0.5 hover:bg-white/20"
              >
                <X size={10} />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap border-b">
        {PORTFOLIO_PAGES.map((p) => (
          <button
            key={p.id}
            onClick={() => navigate(p.url, p.label)}
            className={cn(
              "border-b-2 px-4 py-2 text-xs transition-colors",
              resolvePageId(activeUrl) === p.id
                ? "border-[var(--accent)] text-[var(--accent)]"
                : "border-transparent opacity-50 hover:opacity-80"
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-auto">{renderContent()}</div>
    </AppShell>
  );
}
