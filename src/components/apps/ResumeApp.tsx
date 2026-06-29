"use client";

import { useRef } from "react";
import { Download, Printer, Eye } from "lucide-react";
import { AppShell } from "@/components/shared/AppShell";
import { Button } from "@/components/ui/button";
import { about } from "@/data/about";
import toast from "react-hot-toast";

export default function ResumeApp() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = about.resumeUrl;
    a.download = "Nishant_Singh_Chauhan_Resume.pdf";
    a.click();
    toast.success("Resume downloaded");
  };

  const handlePrint = () => {
    const iframe = iframeRef.current;
    if (iframe?.contentWindow) {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    } else {
      window.open(about.resumeUrl, "_blank")?.print();
    }
  };

  const handlePreview = () => {
    iframeRef.current?.scrollIntoView({ behavior: "smooth" });
    toast.success("Resume preview loaded");
  };

  const handleOpenNewTab = () => {
    window.open(about.resumeUrl, "_blank");
  };

  return (
    <AppShell noPadding>
      <div className="flex h-full flex-col">
        <div className="flex flex-wrap items-center gap-2 border-b border-white/10 px-4 py-2">
          <Button size="sm" onClick={handleDownload}>
            <Download size={14} /> Download Resume
          </Button>
          <Button size="sm" variant="secondary" onClick={handlePreview}>
            <Eye size={14} /> Preview Resume
          </Button>
          <Button size="sm" variant="secondary" onClick={handlePrint}>
            <Printer size={14} /> Print Resume
          </Button>
          <Button size="sm" variant="ghost" onClick={handleOpenNewTab}>
            Open in New Tab
          </Button>
        </div>

        <div className="flex-1 bg-[#525659] p-4">
          <div className="mx-auto h-full max-w-3xl overflow-hidden rounded-lg shadow-2xl">
            <iframe
              ref={iframeRef}
              src={about.resumeUrl}
              title="Nishant Singh Chauhan — Resume"
              className="h-full w-full bg-white"
            />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
