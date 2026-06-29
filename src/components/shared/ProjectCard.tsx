"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  className?: string;
  compact?: boolean;
}

export function ProjectCard({ project, className, compact }: ProjectCardProps) {
  const statusColors = {
    Completed: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    "In Progress": "bg-amber-500/20 text-amber-400 border-amber-500/30",
    Maintained: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  };

  return (
    <motion.article
      layout
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg",
        className
      )}
    >
      <div className="relative h-40 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 400px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <span
          className={cn(
            "absolute right-3 top-3 rounded-full border px-2.5 py-0.5 text-xs font-medium",
            statusColors[project.status]
          )}
        >
          {project.status}
        </span>
      </div>

      <div className={cn("p-4", compact && "p-3")}>
        <h3 className="mb-1 text-base font-semibold text-white">
          {project.title}
        </h3>
        <p className="mb-3 text-sm leading-relaxed text-white/60 line-clamp-2">
          {project.description}
        </p>

        <div className="mb-3 flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-white/10 px-2 py-0.5 text-xs text-white/70"
            >
              {tech}
            </span>
          ))}
        </div>

        {!compact && (
          <ul className="mb-3 space-y-1">
            {project.features.slice(0, 3).map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-white/50">
                <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
                {f}
              </li>
            ))}
          </ul>
        )}

        <div className="flex gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs text-white/80 transition-colors hover:bg-white/20"
            >
              <FaGithub size={14} />
              GitHub
            </a>
          )}
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg bg-[var(--accent)]/20 px-3 py-1.5 text-xs text-[var(--accent)] transition-colors hover:bg-[var(--accent)]/30"
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
