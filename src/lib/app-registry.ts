import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { AppId, AppWindowProps } from "@/types";

type AppComponent = ComponentType<AppWindowProps>;

const FinderApp = dynamic(() => import("@/components/apps/FinderApp"));
const SafariApp = dynamic(() => import("@/components/apps/SafariApp"));
const VSCodeApp = dynamic(() => import("@/components/apps/VSCodeApp"));
const TerminalApp = dynamic(() => import("@/components/apps/TerminalApp"));
const ProjectsApp = dynamic(() => import("@/components/apps/ProjectsApp"));
const AboutApp = dynamic(() => import("@/components/apps/AboutApp"));
const ResumeApp = dynamic(() => import("@/components/apps/ResumeApp"));
const SkillsApp = dynamic(() => import("@/components/apps/SkillsApp"));
const ExperienceApp = dynamic(() => import("@/components/apps/ExperienceApp"));
const ContactApp = dynamic(() => import("@/components/apps/ContactApp"));
const GitHubApp = dynamic(() => import("@/components/apps/GitHubApp"));
const LinkedInApp = dynamic(() => import("@/components/apps/LinkedInApp"));
const LeetCodeApp = dynamic(() => import("@/components/apps/LeetCodeApp"));
const CertificatesApp = dynamic(
  () => import("@/components/apps/CertificatesApp")
);
const ITAssetApp = dynamic(() => import("@/components/apps/ITAssetApp"));
const AIProjectsApp = dynamic(() => import("@/components/apps/AIProjectsApp"));
const PythonProjectsApp = dynamic(
  () => import("@/components/apps/PythonProjectsApp")
);
const PowerBIApp = dynamic(() => import("@/components/apps/PowerBIApp"));
const SettingsApp = dynamic(() => import("@/components/apps/SettingsApp"));
const TrashApp = dynamic(() => import("@/components/apps/TrashApp"));
const MailApp = dynamic(() => import("@/components/apps/MailApp"));
const DownloadsApp = dynamic(() => import("@/components/apps/DownloadsApp"));
const NotesApp = dynamic(() => import("@/components/apps/NotesApp"));
const CalculatorApp = dynamic(() => import("@/components/apps/CalculatorApp"));
const MusicApp = dynamic(() => import("@/components/apps/MusicApp"));
const CalendarApp = dynamic(() => import("@/components/apps/CalendarApp"));

export const appComponents: Record<AppId, AppComponent> = {
  finder: FinderApp,
  safari: SafariApp,
  vscode: VSCodeApp,
  terminal: TerminalApp,
  mail: MailApp,
  projects: ProjectsApp,
  about: AboutApp,
  resume: ResumeApp,
  skills: SkillsApp,
  experience: ExperienceApp,
  contact: ContactApp,
  github: GitHubApp,
  linkedin: LinkedInApp,
  leetcode: LeetCodeApp,
  certificates: CertificatesApp,
  "it-asset": ITAssetApp,
  "ai-projects": AIProjectsApp,
  "python-projects": PythonProjectsApp,
  powerbi: PowerBIApp,
  settings: SettingsApp,
  trash: TrashApp,
  downloads: DownloadsApp,
  notes: NotesApp,
  calculator: CalculatorApp,
  music: MusicApp,
  calendar: CalendarApp,
};
