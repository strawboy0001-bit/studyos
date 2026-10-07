"use client";

import * as React from "react";
import { Plus, FileText, Search, Upload, Tag, BookOpen } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { NoteCard } from "@/components/domain/note-card";
import { EmptyState } from "@/components/shared/empty-state";
import { LoadingState } from "@/components/shared/loading-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useAuth } from "@/lib/auth/context";
import { NoteRepository } from "@/lib/data/note-repository";
import { SubjectRepository } from "@/lib/data/subject-repository";
import type { Note, Subject } from "@/types/domain";

export default function NotesPage() {
  const { user, isDemoMode } = useAuth();
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [subjects, setSubjects] = React.useState<Subject[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedSubjectFilter, setSelectedSubjectFilter] = React.useState<string>("ALL");
  const [isLoading, setIsLoading] = React.useState(true);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedNote, setSelectedNote] = React.useState<Note | null>(null);

  // Form state
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [subjectId, setSubjectId] = React.useState("");
  const [tagInput, setTagInput] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const fetchNotes = React.useCallback(async () => {
    setIsLoading(true);
    const activeUserId = user?.id || "00000000-0000-0000-0000-000000000001";
    const [notesData, subjectsData] = await Promise.all([
      NoteRepository.listByUser(activeUserId, isDemoMode),
      SubjectRepository.listByUser(activeUserId, isDemoMode),
    ]);
    setNotes(notesData);
    setSubjects(subjectsData);
    if (subjectsData.length > 0 && !subjectId) {
      setSubjectId(subjectsData[0].id);
    }
    setIsLoading(false);
  }, [user, isDemoMode, subjectId]);

  React.useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    const activeUserId = user?.id || "00000000-0000-0000-0000-000000000001";
    const tags = tagInput
      .split(",")
      .map((t) => t.trim().toLowerCase())
      .filter((t) => t.length > 0);

    const sub = subjects.find((s) => s.id === subjectId);

    const newNote = await NoteRepository.create(activeUserId, {
      title: title.trim(),
      content: content.trim(),
      subjectId: subjectId || undefined,
      tags,
    });

    if (newNote) {
      setNotes((prev) => [{ ...newNote, subjectName: sub?.name }, ...prev]);
    } else {
      // Local append fallback
      setNotes((prev) => [
        {
          id: `note-${Date.now()}`,
          userId: activeUserId,
          subjectId: subjectId || null,
          title: title.trim(),
          content: content.trim(),
          tags,
          isPinned: false,
          subjectName: sub?.name || "General",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        ...prev,
      ]);
    }

    setTitle("");
    setContent("");
    setTagInput("");
    setIsSubmitting(false);
    setIsDialogOpen(false);
  };

  const filteredNotes = notes.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSubject =
      selectedSubjectFilter === "ALL" || n.subjectId === selectedSubjectFilter;

    return matchesSearch && matchesSubject;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <PageHeader
        title="Notes &amp; Academic Materials"
        description="Write notes, organize topics by syllabus units, and attach lecture summaries."
      >
        <Button
          onClick={() => setIsDialogOpen(true)}
          variant="gradient"
          size="sm"
          className="gap-1.5"
        >
          <Plus className="h-4 w-4" />
          <span>New Note</span>
        </Button>
      </PageHeader>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search notes, concepts, tags…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-full rounded-lg border border-border bg-card/60 pl-9 pr-3 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>

        {subjects.length > 0 && (
          <select
            value={selectedSubjectFilter}
            onChange={(e) => setSelectedSubjectFilter(e.target.value)}
            className="h-9 rounded-lg border border-border bg-card/60 px-3 text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary w-full sm:w-auto"
          >
            <option value="ALL">All Subjects</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Notes Grid */}
      {isLoading ? (
        <LoadingState type="cards" count={3} />
      ) : filteredNotes.length === 0 ? (
        <EmptyState
          icon={FileText}
          title={searchQuery ? "No matching notes found" : "Your notes will appear here"}
          description={
            searchQuery
              ? "Try adjusting your search terms or filter."
              : "Add a note or upload your lecture slides (PDF, PPTX, TXT) to start building your academic context."
          }
          actionLabel="Create First Note"
          onAction={() => setIsDialogOpen(true)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onSelect={(n) => setSelectedNote(n)}
            />
          ))}
        </div>
      )}

      {/* Note Reader Modal */}
      {selectedNote && (
        <Dialog open={!!selectedNote} onOpenChange={() => setSelectedNote(null)}>
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              {selectedNote.subjectName && (
                <span className="text-xs font-semibold text-primary">
                  {selectedNote.subjectName}
                </span>
              )}
              {selectedNote.topicName && (
                <span className="text-xs text-muted-foreground">
                  • {selectedNote.topicName}
                </span>
              )}
            </div>
            <DialogTitle>{selectedNote.title}</DialogTitle>
          </DialogHeader>
          <div className="py-2 text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed max-h-[60vh] overflow-y-auto">
            {selectedNote.content}
          </div>
          {selectedNote.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/50">
              {selectedNote.tags.map((t, idx) => (
                <span key={idx} className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                  #{t}
                </span>
              ))}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedNote(null)}>
              Close
            </Button>
          </DialogFooter>
        </Dialog>
      )}

      {/* Create Note Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogHeader>
          <DialogTitle>Create Academic Note</DialogTitle>
          <DialogDescription>
            Record important definitions, lecture concepts, or formulas.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleCreateNote} className="space-y-4 py-2">
          <Input
            label="Note Title"
            placeholder="e.g. Asymptotic Notations &amp; Big-O Analysis"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {subjects.length > 0 && (
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Subject
              </label>
              <select
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                className="h-10 w-full rounded-lg border border-input bg-card/60 px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              >
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.code || "Course"})
                  </option>
                ))}
              </select>
            </div>
          )}

          <Textarea
            label="Note Content"
            placeholder="Write your study notes or paste lecture summaries here…"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
          />

          <Input
            label="Tags (comma-separated)"
            placeholder="algorithms, complexity, unit1"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
          />

          <div className="rounded-lg border border-dashed border-border/70 p-3 text-center text-xs text-muted-foreground">
            <Upload className="mx-auto h-4 w-4 mb-1 text-muted-foreground/80" />
            <span>File processing (PDF, PPTX, TXT) pipeline supported</span>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="gradient" isLoading={isSubmitting}>
              Save Note
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
}
