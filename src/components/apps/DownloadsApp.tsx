"use client";

import { AppShell } from "@/components/shared/AppShell";
import { Download, FileText, ImageIcon, File } from "lucide-react";

const downloads = [
  { name: "Nishant_Chauhan_Resume.pdf", size: "245 KB", type: "pdf", date: "Today" },
  { name: "project-screenshot.png", size: "1.2 MB", type: "image", date: "Yesterday" },
  { name: "portfolio-source.zip", size: "4.8 MB", type: "zip", date: "Jun 28" },
  { name: "certificate-aws.pdf", size: "180 KB", type: "pdf", date: "Jun 15" },
];

const typeIcons: Record<string, React.ReactNode> = {
  pdf: <FileText size={20} className="text-red-400" />,
  image: <ImageIcon size={20} className="text-blue-400" aria-hidden />,
  zip: <File size={20} className="text-yellow-400" />,
};

export default function DownloadsApp() {
  return (
    <AppShell title="Downloads">
      <div className="space-y-1">
        {downloads.map((file) => (
          <div
            key={file.name}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-white/5 transition-colors"
          >
            {typeIcons[file.type] ?? <File size={20} />}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm">{file.name}</p>
              <p className="text-xs opacity-40">
                {file.size} — {file.date}
              </p>
            </div>
            <button className="rounded-lg p-2 hover:bg-white/10 transition-colors">
              <Download size={14} />
            </button>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
