import * as React from "react";
import { Pin, Tag, BookOpen, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Note } from "@/types/domain";

export interface NoteCardProps {
  note: Note;
  onSelect?: (note: Note) => void;
}

export function NoteCard({ note, onSelect }: NoteCardProps) {
  return (
    <Card
      glow
      onClick={() => onSelect?.(note)}
      className="group cursor-pointer flex flex-col justify-between p-5 space-y-3"
    >
      <div className="space-y-2.5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            {note.subjectName && (
              <Badge variant="secondary" className="text-[11px]">
                {note.subjectName}
              </Badge>
            )}
            {note.topicName && (
              <span className="text-xs text-muted-foreground line-clamp-1">
                • {note.topicName}
              </span>
            )}
          </div>
          {note.isPinned && (
            <Pin className="h-3.5 w-3.5 text-primary fill-primary/30 shrink-0" />
          )}
        </div>

        <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {note.title}
        </h3>

        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
          {note.content || "No content preview available."}
        </p>
      </div>

      <div className="space-y-2 pt-2 border-t border-border/40">
        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1">
            <Tag className="h-3 w-3 text-muted-foreground/60 mr-0.5" />
            {note.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] font-medium bg-muted/60 text-muted-foreground px-1.5 py-0.5 rounded"
              >
                #{tag}
              </span>
            ))}
            {note.tags.length > 3 && (
              <span className="text-[10px] text-muted-foreground">
                +{note.tags.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>Updated recently</span>
          </div>
          <span className="text-primary group-hover:underline flex items-center gap-1">
            <BookOpen className="h-3 w-3" /> Read
          </span>
        </div>
      </div>
    </Card>
  );
}
