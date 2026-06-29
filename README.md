# Portfolio OS

An interactive, macOS Sonoma-inspired portfolio website built with Next.js 15, React 19, and TypeScript. Experience a full operating system interface with boot animation, login screen, draggable windows, dock, menu bar, and functional applications.

![Portfolio OS](https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80)

## Features

- **Boot Experience** — Apple-style boot animation → loading screen → login → desktop
- **Window System** — Draggable, resizable, minimizable windows with z-index management
- **macOS Dock** — Magnification animation, bounce effects, running indicators
- **Menu Bar** — Clock, battery, WiFi, Bluetooth, theme toggle, spotlight, notifications
- **Applications** — Finder, Safari, VS Code, Terminal, Mail, Settings, and 15+ portfolio apps
- **Working Terminal** — 20+ commands with typing animation
- **VS Code Simulator** — Syntax-highlighted portfolio source files
- **Widgets** — Clock, Weather, Calendar, Notes, Music
- **Command Palette** — `⌘K` quick navigation
- **Spotlight Search** — `⌘Space` global search
- **Settings** — Wallpaper changer, accent colors, theme, animations, blur
- **Fully Responsive** — Desktop, laptop, tablet, and mobile layouts

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 15 | App Router, SSR, optimization |
| React 19 | UI framework |
| TypeScript | Type safety |
| Tailwind CSS 4 | Styling |
| Framer Motion | UI animations |
| GSAP | Advanced animations |
| Zustand | Global state management |
| React RND | Draggable/resizable windows |
| Radix UI | Accessible primitives |
| React Hot Toast | Notifications |
| Lucide + React Icons | Icon library |

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/nishantchauhan/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Login

- Password: `portfolio` (or leave empty and click Log In)

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `⌘K` / `Ctrl+K` | Command Palette |
| `⌘Space` / `Ctrl+Space` | Spotlight Search |
| `⌘W` / `Ctrl+W` | Close Window |
| `⌘M` / `Ctrl+M` | Minimize Window |
| `⌘D` / `Ctrl+D` | Show Desktop |
| `⌘⇧T` / `Ctrl+Shift+T` | Toggle Theme |
| `⌘N` / `Ctrl+N` | Notifications |

## Terminal Commands

```
help, about, skills, projects, resume, experience, contact
github, linkedin, clear, whoami, date, pwd, ls, cat
theme, neofetch, history, sudo, joke, music, banner
```

## Project Structure

```
src/
├── app/                  # Next.js App Router
├── components/
│   ├── apps/             # Application windows (Finder, Safari, etc.)
│   ├── os/               # OS shell (Dock, MenuBar, Windows)
│   ├── shared/           # Reusable components
│   ├── ui/               # Shadcn-style UI primitives
│   └── widgets/          # Desktop widgets
├── data/                 # Portfolio content & configuration
├── hooks/                # Custom React hooks
├── lib/                  # Utilities & app registry
├── store/                # Zustand global state
└── types/                # TypeScript interfaces
```

## Deployment

### Vercel (Recommended)

```bash
npm run build
```

Deploy to [Vercel](https://vercel.com) — zero configuration required.

```bash
npx vercel
```

### Manual Build

```bash
npm run build
npm start
```

## Customization

- **Content**: Edit files in `src/data/` (about, projects, skills, experience)
- **Wallpapers**: Add URLs in `src/data/wallpapers.ts`
- **Apps**: Configure in `src/data/apps.ts`
- **Accent Color**: Change in Settings app or `src/store/useOSStore.ts`
- **Contact Info**: Update `src/data/about.ts`

## Performance

- Lazy-loaded application components via `next/dynamic`
- Optimized images with `next/image`
- Persistent settings with Zustand middleware
- Reduced motion support for accessibility

## License

MIT © Nishant Chauhan
