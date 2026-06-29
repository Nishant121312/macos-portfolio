"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { about } from "@/data/about";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { experiences } from "@/data/experience";
import { useOSStore } from "@/store/useOSStore";
import { AppShell } from "@/components/shared/AppShell";
import type { TerminalLine } from "@/types";

const BANNER = `
 ███╗   ██╗██╗███████╗██╗  ██╗ █████╗ ███╗   ██╗████████╗
 ████╗  ██║██║██╔════╝██║  ██║██╔══██╗████╗  ██║╚══██╔══╝
 ██╔██╗ ██║██║███████╗███████║███████║██╔██╗ ██║   ██║
 ██║╚██╗██║██║╚════██║██╔══██║██╔══██║██║╚██╗██║   ██║
 ██║ ╚████║██║███████║██║  ██║██║  ██║██║ ╚████║   ██║
 ╚═╝  ╚═══╝╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝
`;

const JOKES = [
  "Why do programmers prefer dark mode? Because light attracts bugs!",
  "A SQL query walks into a bar, walks up to two tables and asks... 'Can I join you?'",
  "There are only 10 types of people: those who understand binary and those who don't.",
  "Why did the developer go broke? Because he used up all his cache.",
  "How many programmers does it take to change a light bulb? None, it's a hardware problem.",
];

const FILES: Record<string, string> = {
  "about.txt": about.intro,
  "readme.md": "# Portfolio OS\nWelcome to Nishant Singh Chauhan's interactive portfolio!",
  "projects.json": JSON.stringify(
    projects.map((p) => ({ title: p.title, status: p.status })),
    null,
    2
  ),
};

export default function TerminalApp() {
  const [lines, setLines] = useState<TerminalLine[]>([
  { type: "system", content: "Portfolio Terminal v1.0 — Type 'help' for commands" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { updateSettings, settings } = useOSStore();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const typeOutput = useCallback(
    async (text: string, type: TerminalLine["type"] = "output") => {
      setIsTyping(true);
      const chars = text.split("");
      let current = "";
      for (const char of chars) {
        current += char;
        setLines((prev) => {
          const last = prev[prev.length - 1];
          if (last?.type === type && last.content.startsWith(current.slice(0, -1))) {
            return [...prev.slice(0, -1), { type, content: current }];
          }
          return [...prev, { type, content: current }];
        });
        await new Promise((r) => setTimeout(r, 8));
      }
      setIsTyping(false);
    },
    []
  );

  const addLine = (content: string, type: TerminalLine["type"] = "output") => {
    setLines((prev) => [...prev, { type, content }]);
  };

  const processCommand = async (cmd: string) => {
    const trimmed = cmd.trim();
    const [command, ...args] = trimmed.split(" ");
    const arg = args.join(" ");

    addLine(`nishant@portfolio ~ % ${trimmed}`, "input");

    switch (command.toLowerCase()) {
      case "help":
        await typeOutput(`Available commands:
  about       — About me
  skills      — Technical skills
  projects    — List projects
  resume      — Resume summary
  experience  — Work experience
  contact     — Contact info
  github      — GitHub profile
  linkedin    — LinkedIn profile
  clear       — Clear terminal
  whoami      — Current user
  date        — Current date/time
  pwd         — Print working directory
  ls          — List files
  cat <file>  — Read file
  theme       — Toggle dark/light mode
  neofetch    — System info
  history     — Command history
  sudo        — Try it 😉
  joke        — Random joke
  music       — Now playing
  banner      — ASCII banner`);
        break;

      case "about":
        await typeOutput(`${about.name}\n${about.titles.join(" | ")}\n\n${about.intro}`);
        break;

      case "skills":
        await typeOutput(
          skillCategories
            .map((c) => `\n[${c.name}]\n  ${c.skills.join(", ")}`)
            .join("\n")
        );
        break;

      case "projects":
        await typeOutput(
          projects
            .map(
              (p, i) =>
                `${i + 1}. ${p.title} [${p.status}]\n   ${p.techStack.join(", ")}`
            )
            .join("\n\n")
        );
        break;

      case "resume":
        await typeOutput(
          `RESUME — ${about.name}\n${"=".repeat(40)}\n${about.titles[0]}\n\nEXPERIENCE:\n${experiences.map((e) => `• ${e.role} @ ${e.company} (${e.period})`).join("\n")}\n\nPROJECTS: ${projects.length} completed\nSKILLS: ${skillCategories.flatMap((c) => c.skills).length} technologies`
        );
        break;

      case "experience":
        await typeOutput(
          experiences
            .map(
              (e) =>
                `\n${e.role} — ${e.company}\n${e.period}\n${e.description}\n${e.highlights.map((h) => `  • ${h}`).join("\n")}`
            )
            .join("\n")
        );
        break;

      case "contact":
        await typeOutput(
          `Email:    ${about.email}\nLocation: ${about.location}\nGitHub:   ${about.github}\nLinkedIn: ${about.linkedin}\nLeetCode: ${about.leetcode}`
        );
        break;

      case "github":
        await typeOutput(`Opening ${about.github}`);
        window.open(about.github, "_blank");
        break;

      case "linkedin":
        await typeOutput(`Opening ${about.linkedin}`);
        window.open(about.linkedin, "_blank");
        break;

      case "clear":
        setLines([]);
        break;

      case "whoami":
        addLine(about.name.toLowerCase().replace(" ", "."));
        break;

      case "date":
        addLine(new Date().toString());
        break;

      case "pwd":
        addLine("/Users/nishant/portfolio");
        break;

      case "ls":
        addLine(Object.keys(FILES).join("  "));
        break;

      case "cat":
        if (!arg) {
          addLine("Usage: cat <filename>", "error");
        } else if (FILES[arg]) {
          await typeOutput(FILES[arg]);
        } else {
          addLine(`cat: ${arg}: No such file`, "error");
        }
        break;

      case "theme":
        updateSettings({
          theme: settings.theme === "dark" ? "light" : "dark",
        });
        addLine(`Theme switched to ${settings.theme === "dark" ? "light" : "dark"} mode`);
        break;

      case "neofetch":
        await typeOutput(`${BANNER}
nishant@portfolio
─────────────
OS: Portfolio OS x64
Host: Next.js 15
Kernel: React 19
Uptime: ${Math.floor(performance.now() / 60000)} min
Shell: portfolio-terminal 1.0
Theme: ${settings.theme}
Projects: ${projects.length}
Skills: ${skillCategories.flatMap((c) => c.skills).length}`);
        break;

      case "history":
        addLine(history.map((h, i) => `  ${i + 1}  ${h}`).join("\n") || "No history");
        break;

      case "sudo":
        addLine("Nice try! You don't have sudo privileges here 😄", "error");
        break;

      case "joke":
        addLine(JOKES[Math.floor(Math.random() * JOKES.length)]);
        break;

      case "music":
        addLine("🎵 Now Playing: Coding Flow — Lo-Fi Beats [▶]");
        break;

      case "banner":
        addLine(BANNER);
        break;

      case "":
        break;

      default:
        addLine(`command not found: ${command}. Type 'help' for available commands.`, "error");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    setHistory((h) => [...h, input]);
    setHistoryIndex(-1);
    await processCommand(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
      setHistoryIndex(newIndex);
      if (history[history.length - 1 - newIndex]) {
        setInput(history[history.length - 1 - newIndex]);
      }
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const newIndex = historyIndex > 0 ? historyIndex - 1 : -1;
      setHistoryIndex(newIndex);
      setInput(newIndex === -1 ? "" : history[history.length - 1 - newIndex]);
    }
  };

  const lineColors = {
    input: "text-green-400",
    output: "text-gray-300",
    error: "text-red-400",
    system: "text-blue-400",
  };

  return (
    <AppShell noPadding>
      <div
        className="flex h-full flex-col bg-[#1a1a2e] font-mono text-sm"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex-1 overflow-auto p-4">
          {lines.map((line, i) => (
            <pre
              key={i}
              className={`whitespace-pre-wrap mb-1 ${lineColors[line.type]}`}
            >
              {line.content}
            </pre>
          ))}
          <div ref={bottomRef} />
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-white/10 px-4 py-2"
        >
          <span className="text-green-400 shrink-0">❯</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-gray-200"
            autoFocus
            spellCheck={false}
          />
        </form>
      </div>
    </AppShell>
  );
}
