"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Search, Edit3 } from "lucide-react";
import { AppShell } from "@/components/shared/AppShell";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
}

export default function NotesApp() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Load notes on mount
  useEffect(() => {
    const saved = localStorage.getItem("portfolio-notes");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Note[];
        setNotes(parsed);
        if (parsed.length > 0) {
          setActiveNoteId(parsed[0].id);
        }
      } catch (e) {
        console.error("Failed to parse notes", e);
      }
    } else {
      // Default initial notes
      const initial: Note[] = [
        {
          id: "1",
          title: "Welcome to Notes! 📝",
          content: "This is a fully functional Notes App resembling macOS Notes.\n\nKey features:\n- Create notes with the compose button\n- Auto-saves changes directly to LocalStorage\n- Search notes using the search bar\n- Delete notes when they are no longer needed\n\nEnjoy writing down your thoughts!",
          updatedAt: new Date().toLocaleString(),
        },
        {
          id: "2",
          title: "Ideas & Project Tasks 💡",
          content: "- Optimize landing page load speed\n- Rebuild the macOS dock magnification curves\n- Add geolocation-based weather forecasts\n- Hook up actual Apple Music playlists",
          updatedAt: new Date().toLocaleString(),
        },
      ];
      setNotes(initial);
      setActiveNoteId("1");
      localStorage.setItem("portfolio-notes", JSON.stringify(initial));
    }
  }, []);

  // Save notes helper
  const saveNotes = (updatedNotes: Note[]) => {
    setNotes(updatedNotes);
    localStorage.setItem("portfolio-notes", JSON.stringify(updatedNotes));
  };

  const createNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "New Note",
      content: "",
      updatedAt: new Date().toLocaleString(),
    };
    const updated = [newNote, ...notes];
    saveNotes(updated);
    setActiveNoteId(newNote.id);
  };

  const updateActiveNote = (fields: Partial<Note>) => {
    if (!activeNoteId) return;
    const updated = notes.map((n) => {
      if (n.id === activeNoteId) {
        return {
          ...n,
          ...fields,
          updatedAt: new Date().toLocaleString(),
        };
      }
      return n;
    });
    
    // Sort updated notes so that recently modified is at top
    const activeNote = updated.find((n) => n.id === activeNoteId);
    let reordered = updated;
    if (activeNote) {
      reordered = [activeNote, ...updated.filter((n) => n.id !== activeNoteId)];
    }
    
    saveNotes(reordered);
  };

  const deleteNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const filtered = notes.filter((n) => n.id !== id);
    saveNotes(filtered);
    
    if (activeNoteId === id) {
      setActiveNoteId(filtered.length > 0 ? filtered[0].id : null);
    }
    toast.success("Note deleted");
  };

  const activeNote = notes.find((n) => n.id === activeNoteId) || null;
  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppShell noPadding>
      <div className="flex h-full text-white/90">
        {/* Notes Sidebar */}
        <aside className="w-56 shrink-0 border-r border-white/10 bg-black/10 flex flex-col h-full">
          {/* Toolbar */}
          <div className="p-3 border-b border-white/5 flex items-center justify-between gap-2 shrink-0">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 opacity-40" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 pl-8 pr-2.5 py-1 text-[11px] rounded outline-none border border-transparent focus:border-white/10 placeholder:opacity-50"
              />
            </div>
            <button
              onClick={createNote}
              className="p-1 hover:bg-white/10 rounded transition-colors text-amber-500"
              title="New Note"
            >
              <Edit3 size={15} />
            </button>
          </div>

          {/* Notes List */}
          <div className="flex-1 overflow-y-auto p-1.5 space-y-1">
            {filteredNotes.map((note) => {
              const isActive = note.id === activeNoteId;
              // Snip lines for preview
              const previewText = note.content
                ? note.content.split("\n").filter(Boolean)[0] || "No additional text"
                : "No additional text";
              return (
                <div
                  key={note.id}
                  onClick={() => setActiveNoteId(note.id)}
                  className={cn(
                    "p-2.5 rounded-lg cursor-default select-none relative group transition-all duration-150",
                    isActive 
                      ? "bg-amber-500/20 border border-amber-500/30 text-white" 
                      : "hover:bg-white/5 border border-transparent text-white/70"
                  )}
                >
                  <div className="pr-5 font-semibold text-xs truncate">
                    {note.title || "Untitled"}
                  </div>
                  <div className="flex items-center justify-between mt-1 text-[10px] opacity-50 gap-2">
                    <span className="shrink-0">{note.updatedAt.split(",")[0]}</span>
                    <span className="truncate">{previewText}</span>
                  </div>
                  <button
                    onClick={(e) => deleteNote(note.id, e)}
                    className="absolute right-2 top-2.5 p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-white/10 hover:text-red-400 transition-all"
                    title="Delete Note"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              );
            })}
            {filteredNotes.length === 0 && (
              <div className="text-center py-8 text-xs opacity-40">No notes found</div>
            )}
          </div>
        </aside>

        {/* Note Editor Pane */}
        <div className="flex-1 flex flex-col bg-white/[0.02] h-full overflow-hidden">
          {activeNote ? (
            <div className="flex-1 flex flex-col p-6 overflow-hidden">
              {/* Note Header / Meta */}
              <div className="text-center text-[10px] opacity-40 select-none shrink-0 mb-4 tracking-wide font-mono">
                {activeNote.updatedAt}
              </div>

              {/* Title Input */}
              <input
                type="text"
                value={activeNote.title}
                onChange={(e) => updateActiveNote({ title: e.target.value })}
                className="w-full bg-transparent text-lg font-bold border-none outline-none mb-3 placeholder:opacity-40 tracking-tight"
                placeholder="Title"
              />

              {/* Note Body editor */}
              <textarea
                value={activeNote.content}
                onChange={(e) => updateActiveNote({ content: e.target.value })}
                className="w-full flex-1 bg-transparent border-none outline-none resize-none text-xs leading-relaxed opacity-85 placeholder:opacity-30 whitespace-pre-wrap font-sans"
                placeholder="Start writing..."
              />
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-xs opacity-30 select-none">
              Select a note or create a new one
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
