export type BootPhase = "boot" | "loading" | "login" | "desktop";

export type ThemeMode = "dark" | "light";

export type AppId =
  | "finder"
  | "safari"
  | "vscode"
  | "terminal"
  | "mail"
  | "projects"
  | "about"
  | "resume"
  | "skills"
  | "experience"
  | "contact"
  | "github"
  | "linkedin"
  | "leetcode"
  | "certificates"
  | "it-asset"
  | "ai-projects"
  | "python-projects"
  | "powerbi"
  | "settings"
  | "trash"
  | "downloads"
  | "notes"
  | "calculator"
  | "music"
  | "calendar";

export type DesktopIconId = "about" | "resume" | "contact" | "github" | "linkedin" | "notes" | "calculator";

export interface WindowBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface WindowPayload {
  url?: string;
  title?: string;
  mode?: "compose" | "view" | "github" | "linkedin" | "resume";
}

export interface WindowState {
  id: string;
  appId: AppId;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  minimized: boolean;
  maximized: boolean;
  zIndex: number;
  closing?: boolean;
  preMaximizeBounds?: WindowBounds;
  payload?: WindowPayload;
}

export interface AppWindowProps {
  windowId?: string;
  payload?: WindowPayload;
}

export interface AppDefinition {
  id: AppId;
  name: string;
  icon: string;
  color: string;
  dock?: boolean;
  desktop?: boolean;
  defaultSize?: { width: number; height: number };
}

export interface DesktopIconDefinition {
  id: DesktopIconId;
  name: string;
  icon: string;
  action: "app" | "safari";
  appId?: AppId;
  url?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  github?: string;
  liveDemo?: string;
  features: string[];
  status: "Completed" | "In Progress" | "Maintained";
  category: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  description: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
}

export interface FinderItem {
  id: string;
  name: string;
  type: "folder" | "file";
  icon: string;
  appId?: AppId;
  safariUrl?: string;
  children?: FinderItem[];
}

export interface VSCodeFile {
  name: string;
  language: string;
  content: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface LocationState {
  city: string;
  state: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

export interface WeatherState {
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  sunrise: string;
  sunset: string;
  icon: string;
  tempMax: number;
  tempMin: number;
}

export interface OSSettings {
  wallpaper: string;
  accentColor: string;
  theme: ThemeMode;
  animations: boolean;
  sound: boolean;
  blur: boolean;
  glass: boolean;
  dockMagnification: boolean;
  cursorGlow: boolean;
  mouseTrail: boolean;
  dockPosition: "bottom" | "left" | "right";
  dockSize: number;
  transparency: number;
}

export interface TerminalLine {
  type: "input" | "output" | "error" | "system";
  content: string;
}

export interface SafariTab {
  id: string;
  title: string;
  url: string;
}

export interface MenuAction {
  label: string;
  shortcut?: string;
  action: () => void;
  disabled?: boolean;
  separator?: boolean;
}
