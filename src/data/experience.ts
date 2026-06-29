import type { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: "exp-1",
    role: "Full Stack Developer",
    company: "Freelance / Contract",
    period: "2023 — Present",
    description:
      "Building end-to-end web applications, AI solutions, and automation tools for diverse clients across healthcare, sports analytics, and enterprise IT.",
    highlights: [
      "Delivered 7+ production applications",
      "Architected scalable REST APIs",
      "Integrated AI/ML models into web apps",
      "Reduced manual workflows by 60% via automation",
    ],
  },
  {
    id: "exp-2",
    role: "Broadcast Engineer",
    company: "Media & Broadcasting",
    period: "2020 — 2023",
    description:
      "Managed broadcast infrastructure, signal chains, and playout systems while developing automation tools to streamline operations.",
    highlights: [
      "Maintained 99.9% uptime on critical systems",
      "Built MQTT-based monitoring solutions",
      "Automated playout scheduling workflows",
      "Trained team on new broadcast technologies",
    ],
  },
  {
    id: "exp-3",
    role: "Python Developer",
    company: "Various Projects",
    period: "2021 — Present",
    description:
      "Developed data pipelines, web scrapers, and automation scripts for sports analytics, asset management, and business intelligence.",
    highlights: [
      "Built real-time cricket data scraper",
      "Created ETL pipelines for Power BI",
      "Developed AI inference APIs with FastAPI",
      "Open-sourced automation toolkits",
    ],
  },
];
