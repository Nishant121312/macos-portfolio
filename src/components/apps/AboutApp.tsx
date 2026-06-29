"use client";

import Image from "next/image";
import { Award, Briefcase, Code2, GraduationCap, MapPin, Route } from "lucide-react";
import { about, education } from "@/data/about";
import { experiences } from "@/data/experience";
import { skillCategories } from "@/data/skills";
import { certificates } from "@/data/certificates";
import { AppShell } from "@/components/shared/AppShell";
import { cn } from "@/lib/utils";
import type { AppWindowProps } from "@/types";

const sidebarSections = [
  "Profile",
  "Introduction",
  "Education",
  "Experience",
  "Skills",
  "Journey",
  "Certificates",
  "Technologies",
];

export default function AboutApp(_props: AppWindowProps) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AppShell noPadding>
      <div className="flex h-full">
        <aside className="hidden w-44 shrink-0 border-r border-white/10 bg-white/5 p-3 sm:block">
          <p className="mb-2 px-2 text-xs font-semibold uppercase opacity-40">About</p>
          {sidebarSections.map((s) => (
            <button
              key={s}
              onClick={() => scrollTo(s.toLowerCase())}
              className="flex w-full rounded-lg px-2 py-1.5 text-left text-xs hover:bg-white/10 transition-colors"
            >
              {s}
            </button>
          ))}
        </aside>

        <div className="flex-1 overflow-auto">
          <section id="profile" className="border-b border-white/10 p-6">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl shadow-xl ring-2 ring-white/10">
                <Image src={about.avatar} alt={about.name} fill className="object-cover" priority />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{about.name}</h1>
                <div className="mt-2 flex flex-wrap gap-2">
                  {about.titles.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-[var(--accent)]/20 px-3 py-1 text-xs text-[var(--accent)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <p className="mt-2 flex items-center gap-1 text-sm opacity-60">
                  <MapPin size={14} /> {about.location}
                </p>
                <p className="mt-3 rounded-lg bg-white/5 px-3 py-2 text-sm">
                  <Briefcase size={14} className="mr-1 inline text-[var(--accent)]" />
                  <strong>Current:</strong> {about.currentPosition}
                </p>
              </div>
            </div>
          </section>

          <section id="introduction" className="border-b border-white/10 p-6">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
              Professional Introduction
            </h2>
            <p className="whitespace-pre-line text-sm leading-relaxed opacity-75">{about.intro}</p>
          </section>

          <section id="education" className="border-b border-white/10 p-6">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
              <GraduationCap size={18} className="text-[var(--accent)]" /> Education
            </h2>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="font-medium">{education.degree}</p>
              <p className="text-sm text-[var(--accent)]">{education.institution}</p>
              <p className="mt-1 text-xs opacity-50">{education.period}</p>
              <p className="mt-2 text-sm opacity-70">{education.description}</p>
            </div>
          </section>

          <section id="experience" className="border-b border-white/10 p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <Briefcase size={18} className="text-[var(--accent)]" /> Experience
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="flex flex-wrap justify-between gap-2">
                    <div>
                      <p className="font-medium">{exp.role}</p>
                      <p className="text-sm text-[var(--accent)]">{exp.company}</p>
                    </div>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs">{exp.period}</span>
                  </div>
                  <p className="mt-2 text-sm opacity-70">{exp.description}</p>
                  <ul className="mt-2 space-y-1">
                    {exp.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-xs opacity-60">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section id="skills" className="border-b border-white/10 p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <Code2 size={18} className="text-[var(--accent)]" /> Skills
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {skillCategories.map((cat) => (
                <div key={cat.name} className="rounded-xl bg-white/5 p-3">
                  <p className="mb-2 text-sm font-medium">{cat.name}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((s) => (
                      <span key={s} className="rounded-md bg-white/10 px-2 py-0.5 text-xs">{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="journey" className="border-b border-white/10 p-6">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
              <Route size={18} className="text-[var(--accent)]" /> Journey
            </h2>
            <p className="whitespace-pre-line text-sm leading-relaxed opacity-75">{about.journey}</p>
          </section>

          <section id="certificates" className="border-b border-white/10 p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <Award size={18} className="text-[var(--accent)]" /> Certificates
            </h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className={cn(
                    "rounded-lg border border-white/10 bg-gradient-to-br from-yellow-500/10 to-amber-500/5 p-3"
                  )}
                >
                  <p className="text-sm font-medium">{cert.title}</p>
                  <p className="text-xs opacity-60">{cert.issuer}</p>
                  <p className="text-xs opacity-40">{cert.date}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="technologies" className="p-6 pb-8">
            <h2 className="mb-4 text-lg font-semibold">Technologies</h2>
            <div className="flex flex-wrap gap-2">
              {skillCategories.flatMap((c) => c.skills).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-1 text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
