"use client";

import { useState } from "react";
import { AppShell } from "@/components/shared/AppShell";
import { useOSStore } from "@/store/useOSStore";
import { Play, Disc, ExternalLink, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MusicApp() {
  const { openSafari } = useOSStore();
  const [hasSubscription, setHasSubscription] = useState<boolean | null>(null);

  const handleLaunchPlayer = () => {
    // Open Apple Music inside our Safari window
    openSafari("https://music.apple.com", "Apple Music");
  };

  return (
    <AppShell noPadding>
      <div className="h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#1b0a1c] to-[#0d050f] text-white p-6">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="relative inline-flex items-center justify-center">
            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl animate-pulse" />
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-4xl shadow-xl ring-2 ring-white/10 relative z-10">
              <Headphones size={40} className="text-white" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-bold tracking-tight">Apple Music Experience</h1>
            <p className="text-xs text-white/50 leading-relaxed">
              Unlock a real streaming audio experience. Play tracks directly within our simulated Safari browser or launch the web player.
            </p>
          </div>

          {hasSubscription === null ? (
            <div className="bg-white/5 rounded-2xl p-5 border border-white/10 space-y-4">
              <p className="text-xs font-semibold">Do you have an active Apple Music subscription?</p>
              <div className="flex gap-3 justify-center">
                <Button 
                  onClick={() => setHasSubscription(true)}
                  className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-medium px-5"
                >
                  Yes, I do
                </Button>
                <Button 
                  onClick={() => setHasSubscription(false)}
                  variant="secondary"
                  className="text-xs font-medium px-5"
                >
                  No, I don't
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-white/5 rounded-2xl p-5 border border-white/10 space-y-4">
              {hasSubscription ? (
                <>
                  <p className="text-xs text-green-400 font-medium">✓ Ready to Stream Full Tracks</p>
                  <p className="text-[11px] opacity-75 leading-relaxed">
                    We will launch Apple Music inside Safari. You will be able to log in to your Apple ID to stream your libraries and play full songs.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-xs text-amber-400 font-medium">Stream Previews & Ambient Beats</p>
                  <p className="text-[11px] opacity-75 leading-relaxed">
                    We will load a playlist in Safari. You can stream 30-second previews of any Apple Music track, or play lo-fi tracks.
                  </p>
                </>
              )}
              
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleLaunchPlayer}
                  className="w-full py-2 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl text-xs font-semibold hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <Play size={13} fill="white" />
                  <span>Launch Apple Music in Safari</span>
                </button>
                <button
                  onClick={() => window.open("https://music.apple.com", "_blank")}
                  className="w-full py-2 border border-white/10 bg-white/5 rounded-xl text-xs font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-1.5 opacity-60 hover:opacity-100"
                >
                  <span>Open web site in new browser tab</span>
                  <ExternalLink size={12} />
                </button>
              </div>
              
              <button 
                onClick={() => setHasSubscription(null)}
                className="text-[10px] opacity-40 hover:underline"
              >
                Change subscription choice
              </button>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
