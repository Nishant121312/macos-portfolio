"use client";

import { useState, useEffect } from "react";
import { AppShell } from "@/components/shared/AppShell";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, X, Calendar as CalendarIcon, Save } from "lucide-react";
import toast from "react-hot-toast";
import { AnimatePresence } from "framer-motion";

interface DateNote {
  dateKey: string; // YYYY-MM-DD
  text: string;
}

export default function CalendarApp() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");
  const [allNotes, setAllNotes] = useState<Record<string, string>>({});

  // Load calendar notes
  useEffect(() => {
    const saved = localStorage.getItem("portfolio-calendar-notes");
    if (saved) {
      try {
        setAllNotes(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Grid details
  const startDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDateClick = (dayNum: number) => {
    const key = `${year}-${(month + 1).toString().padStart(2, "0")}-${dayNum.toString().padStart(2, "0")}`;
    setSelectedDateKey(key);
    setNoteText(allNotes[key] || "");
  };

  const saveNote = () => {
    if (!selectedDateKey) return;
    const updated = { ...allNotes };
    if (noteText.trim() === "") {
      delete updated[selectedDateKey];
      toast.success("Note cleared");
    } else {
      updated[selectedDateKey] = noteText;
      toast.success("Calendar note saved");
    }
    setAllNotes(updated);
    localStorage.setItem("portfolio-calendar-notes", JSON.stringify(updated));
    setSelectedDateKey(null);
  };

  const getDayDetails = (dayNum: number) => {
    const key = `${year}-${(month + 1).toString().padStart(2, "0")}-${dayNum.toString().padStart(2, "0")}`;
    const hasNote = !!allNotes[key];
    const today = new Date();
    const isToday = today.getDate() === dayNum && today.getMonth() === month && today.getFullYear() === year;
    return { hasNote, isToday, key };
  };

  return (
    <AppShell noPadding>
      <div className="h-full flex flex-col bg-[#1e1e1e] text-white">
        {/* Navigation Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-white/5 shrink-0 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <CalendarIcon className="text-red-500" size={18} />
            <h2 className="text-base font-semibold tracking-tight">
              {months[month]} {year}
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 hover:bg-white/10 rounded transition-colors text-zinc-400 hover:text-white"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-2.5 py-0.5 text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded font-medium transition-all"
            >
              Today
            </button>
            <button
              onClick={handleNextMonth}
              className="p-1.5 hover:bg-white/10 rounded transition-colors text-zinc-400 hover:text-white"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Days grid headers */}
        <div className="grid grid-cols-7 text-center text-xs py-2 bg-white/[0.01] border-b border-white/5 font-semibold text-zinc-500 tracking-wide select-none">
          {days.map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>

        {/* Days grid body */}
        <div className="flex-1 grid grid-cols-7 grid-rows-6 p-2 gap-1 bg-[#1a1a1a] overflow-auto select-none">
          {/* Previous month empty days */}
          {Array.from({ length: startDay }).map((_, i) => {
            const dayNum = daysInPrevMonth - startDay + i + 1;
            return (
              <div
                key={`prev-${i}`}
                className="p-2 rounded-lg opacity-25 text-xs text-right cursor-not-allowed"
              >
                {dayNum}
              </div>
            );
          })}

          {/* Current month days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const { isToday, hasNote } = getDayDetails(dayNum);
            return (
              <button
                key={`day-${dayNum}`}
                onClick={() => handleDateClick(dayNum)}
                className={cn(
                  "p-2 rounded-lg text-xs relative flex flex-col items-end justify-between hover:bg-white/5 border border-transparent transition-all focus:outline-none",
                  isToday && "bg-red-500/10 border-red-500/30 text-white font-bold"
                )}
              >
                <span className={cn(
                  "h-5 w-5 rounded-full flex items-center justify-center tabular-nums text-right",
                  isToday && "bg-red-500 text-white"
                )}>
                  {dayNum}
                </span>

                {/* Has event note marker */}
                {hasNote && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 absolute bottom-2 left-2 animate-pulse" />
                )}
              </button>
            );
          })}

          {/* Next month padding days */}
          {Array.from({ length: 42 - (startDay + daysInMonth) }).map((_, i) => {
            const dayNum = i + 1;
            return (
              <div
                key={`next-${i}`}
                className="p-2 rounded-lg opacity-25 text-xs text-right cursor-not-allowed"
              >
                {dayNum}
              </div>
            );
          })}
        </div>

        {/* Note Editor Overlay Popup */}
        <AnimatePresence>
          {selectedDateKey && (
            <div className="fixed inset-0 z-[9600] flex items-center justify-center bg-black/60 backdrop-blur-xs">
              <div
                className={cn(
                  "w-full max-w-sm rounded-2xl border p-5 shadow-2xl relative",
                  "bg-neutral-900 border-white/10"
                )}
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/10">
                  <div className="flex items-center gap-1.5">
                    <CalendarIcon size={16} className="text-red-500" />
                    <span className="font-semibold text-xs tracking-wide">
                      Notes for {new Date(selectedDateKey).toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedDateKey(null)}
                    className="p-1 hover:bg-white/10 rounded transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>

                {/* Body */}
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-3 text-xs outline-none focus:ring-1 focus:ring-[var(--accent)] resize-none placeholder:opacity-40 text-white leading-relaxed"
                  placeholder="Add tasks, reminders, or journal items..."
                />

                {/* Footer Controls */}
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => setSelectedDateKey(null)}
                    className="px-3 py-1.5 rounded-lg border border-white/10 text-xs hover:bg-white/5 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveNote}
                    className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-xs text-white font-medium flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                  >
                    <Save size={13} />
                    <span>Save Note</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </AppShell>
  );
}
