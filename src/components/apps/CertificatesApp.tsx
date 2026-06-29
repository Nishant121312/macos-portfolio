"use client";

import { certificates } from "@/data/certificates";
import { AppShell } from "@/components/shared/AppShell";
import { Award, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function CertificatesApp() {
  return (
    <AppShell title="Certificates">
      <div className="grid gap-3 sm:grid-cols-2">
        {certificates.map((cert, i) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            className="group rounded-xl border border-white/10 bg-gradient-to-br from-yellow-500/10 to-amber-500/5 p-4 transition-colors hover:border-yellow-500/30"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-yellow-500/20">
                <Award size={20} className="text-yellow-400" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-sm">{cert.title}</h3>
                <p className="text-xs opacity-60">{cert.issuer}</p>
                <p className="mt-1 text-xs opacity-40">{cert.date}</p>
                {cert.credentialId && (
                  <p className="mt-1 text-xs font-mono opacity-30">
                    ID: {cert.credentialId}
                  </p>
                )}
              </div>
              <ExternalLink
                size={14}
                className="opacity-0 group-hover:opacity-50 transition-opacity"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </AppShell>
  );
}
