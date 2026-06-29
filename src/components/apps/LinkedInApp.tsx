"use client";

import { about } from "@/data/about";
import { experiences } from "@/data/experience";
import { AppShell } from "@/components/shared/AppShell";
import { Button } from "@/components/ui/button";
import { ExternalLink, MapPin } from "lucide-react";

export default function LinkedInApp() {
  return (
    <AppShell title="LinkedIn">
      <div className="mx-auto max-w-lg">
        <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-blue-600 to-blue-800" />
          <div className="relative px-6 pb-6">
            <div className="absolute -top-10 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-2xl font-bold text-white ring-4 ring-gray-900">
              NC
            </div>
            <div className="pt-12">
              <h2 className="text-xl font-bold">{about.name}</h2>
              <p className="text-sm opacity-70">{about.titles[0]}</p>
              <p className="mt-1 flex items-center gap-1 text-xs opacity-50">
                <MapPin size={12} /> {about.location}
              </p>
            </div>

            <div className="mt-4">
              <h3 className="mb-2 text-sm font-semibold">About</h3>
              <p className="text-xs opacity-60 leading-relaxed">
                {about.intro.slice(0, 200)}...
              </p>
            </div>

            <div className="mt-4">
              <h3 className="mb-2 text-sm font-semibold">Experience</h3>
              {experiences.slice(0, 2).map((e) => (
                <div key={e.id} className="mb-2 text-xs">
                  <p className="font-medium">{e.role}</p>
                  <p className="opacity-50">
                    {e.company} • {e.period}
                  </p>
                </div>
              ))}
            </div>

            <Button
              className="mt-4 w-full"
              onClick={() => window.open(about.linkedin, "_blank")}
            >
              <ExternalLink size={14} />
              Connect on LinkedIn
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
