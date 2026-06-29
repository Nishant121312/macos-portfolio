"use client";

import { useState } from "react";
import { about } from "@/data/about";
import { AppShell } from "@/components/shared/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail, MapPin, Phone, Send, Inbox, PenLine } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AppWindowProps } from "@/types";

export default function ContactApp({ payload }: AppWindowProps) {
  const [view, setView] = useState<"inbox" | "compose">(
    payload?.mode === "compose" ? "compose" : "compose"
  );
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Invalid email address";
    if (!form.message.trim()) next.message = "Message is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the errors below");
      return;
    }
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    toast.success("Message sent! I'll get back to you soon.");
    setForm({ name: "", email: "", phone: "", message: "" });
    setErrors({});
    setSending(false);
  };

  return (
    <AppShell noPadding>
      <div className="flex h-full">
        <aside className="w-44 shrink-0 border-r border-white/10 bg-white/5 p-2">
          <button
            onClick={() => setView("compose")}
            className={cn(
              "mb-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
              view === "compose" ? "bg-[var(--accent)]/20 font-medium" : "hover:bg-white/10"
            )}
          >
            <PenLine size={16} /> Compose
          </button>
          <button
            onClick={() => setView("inbox")}
            className={cn(
              "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
              view === "inbox" ? "bg-[var(--accent)]/20 font-medium" : "hover:bg-white/10"
            )}
          >
            <Inbox size={16} /> Contact Info
          </button>
        </aside>

        <div className="flex-1 overflow-auto p-6">
          {view === "compose" ? (
            <div className="mx-auto max-w-lg">
              <h2 className="mb-1 text-xl font-bold">New Message</h2>
              <p className="mb-6 text-sm opacity-50">To: {about.name} &lt;{about.email}&gt;</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs opacity-60">Your Name *</label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Doe"
                    className={errors.name ? "border-red-500/50" : ""}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-xs opacity-60">Email *</label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@email.com"
                    className={errors.email ? "border-red-500/50" : ""}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-xs opacity-60">Phone</label>
                  <Input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs opacity-60">Message *</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Write your message..."
                    rows={5}
                    className={cn(
                      "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm backdrop-blur-sm outline-none focus:ring-2 focus:ring-[var(--accent)]",
                      errors.message && "border-red-500/50"
                    )}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-400">{errors.message}</p>
                  )}
                </div>
                <Button type="submit" disabled={sending} className="w-full">
                  <Send size={14} />
                  {sending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          ) : (
            <div className="mx-auto max-w-md space-y-6">
              <h2 className="text-xl font-bold">Contact Information</h2>
              <div className="space-y-4 text-sm">
                <p className="flex items-center gap-3 opacity-80">
                  <Mail size={18} className="shrink-0 text-[var(--accent)]" />
                  <a href={`mailto:${about.email}`} className="hover:text-[var(--accent)]">
                    {about.email}
                  </a>
                </p>
                <p className="flex items-center gap-3 opacity-80">
                  <Phone size={18} className="shrink-0 text-[var(--accent)]" />
                  {about.phone}
                </p>
                <p className="flex items-center gap-3 opacity-80">
                  <MapPin size={18} className="shrink-0 text-[var(--accent)]" />
                  {about.location}
                </p>
                <a
                  href={about.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 opacity-80 hover:text-[var(--accent)] transition-colors"
                >
                  <FaGithub size={18} /> GitHub Profile
                </a>
                <a
                  href={about.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 opacity-80 hover:text-[var(--accent)] transition-colors"
                >
                  <FaLinkedin size={18} /> LinkedIn Profile
                </a>
              </div>
              <Button onClick={() => setView("compose")} className="w-full">
                <PenLine size={14} /> Compose Message
              </Button>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
