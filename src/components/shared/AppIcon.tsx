"use client";

import {
  FaApple,
  FaGithub,
  FaLinkedin,
  FaPython,
  FaRegFilePdf,
  FaTrash,
} from "react-icons/fa";
import { SiLeetcode, SiSafari } from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import {
  Folder,
  FolderOpen,
  Mail,
  Settings,
  Terminal,
  User,
  Briefcase,
  Code2,
  Award,
  Contact,
  Download,
  Sparkles,
  Monitor,
  FileText,
  Image as ImageIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { AppId } from "@/types";

interface AppIconProps {
  appId: AppId | string;
  size?: number;
  className?: string;
}

const iconMap: Record<string, React.ReactNode> = {
  finder: <FolderOpen className="text-blue-400" />,
  safari: <SiSafari className="text-sky-400" />,
  vscode: <VscCode className="text-blue-500" />,
  terminal: <Terminal className="text-gray-300" />,
  mail: <Mail className="text-blue-400" />,
  projects: <Briefcase className="text-purple-400" />,
  about: <User className="text-pink-400" />,
  resume: <FaRegFilePdf className="text-red-400" />,
  skills: <Code2 className="text-emerald-400" />,
  experience: <Briefcase className="text-amber-400" />,
  contact: <Contact className="text-cyan-400" />,
  github: <FaGithub className="text-white" />,
  linkedin: <FaLinkedin className="text-blue-500" />,
  leetcode: <SiLeetcode className="text-orange-400" />,
  certificates: <Award className="text-yellow-400" />,
  "it-asset": <Monitor className="text-indigo-400" />,
  ai: <Sparkles className="text-purple-400" />,
  "ai-projects": <Sparkles className="text-purple-400" />,
  python: <FaPython className="text-blue-400" />,
  "python-projects": <FaPython className="text-blue-400" />,
  powerbi: <Monitor className="text-yellow-400" />,
  settings: <Settings className="text-gray-400" />,
  trash: <FaTrash className="text-gray-400" />,
  downloads: <Download className="text-green-400" />,
  apple: <FaApple className="text-white" />,
  "folder-blue": <Folder className="text-blue-400" />,
  "folder-yellow": <Folder className="text-yellow-400" />,
  "folder-purple": <Folder className="text-purple-400" />,
  "folder-green": <Folder className="text-green-400" />,
  "folder-red": <Folder className="text-red-400" />,
  "folder-orange": <Folder className="text-orange-400" />,
  pdf: <FaRegFilePdf className="text-red-400" />,
  doc: <FileText className="text-blue-300" />,
  gallery: <ImageIcon className="text-purple-300" aria-hidden />,
};

export function AppIcon({ appId, size = 24, className }: AppIconProps) {
  const icon = iconMap[appId] ?? <Folder className="text-blue-400" />;

  return (
    <span
      className={cn("inline-flex items-center justify-center", className)}
      style={{ width: size, height: size, fontSize: size * 0.85 }}
    >
      {icon}
    </span>
  );
}
