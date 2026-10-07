import * as React from "react";
import Link from "next/link";
import { BookOpen, FileText, CheckSquare, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Subject } from "@/types/domain";

export interface SubjectCardProps {
  subject: Subject;
}

export function SubjectCard({ subject }: SubjectCardProps) {
  return (
    <Card glow className="group relative flex flex-col justify-between overflow-hidden p-5">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span
              className="h-3.5 w-3.5 rounded-full ring-2 ring-background shadow-sm"
              style={{ backgroundColor: subject.color || "#6366f1" }}
            />
            {subject.code && (
              <Badge variant="outline" className="text-[11px] font-mono">
                {subject.code}
              </Badge>
            )}
          </div>
          {subject.semester && (
            <span className="text-xs text-muted-foreground">
              Sem {subject.semester}
            </span>
          )}
        </div>

        <div>
          <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
            {subject.name}
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/50 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-muted-foreground/70" />
            <span>{subject.topicCount ?? 0} Topics</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5 text-muted-foreground/70" />
            <span>{subject.noteCount ?? 0} Notes</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckSquare className="h-3.5 w-3.5 text-muted-foreground/70" />
            <span>{subject.assignmentCount ?? 0} Tasks</span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">View Workspace</span>
        <Link
          href={`/subjects?id=${subject.id}`}
          className="flex h-7 w-7 items-center justify-center rounded-md bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all"
        >
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </Card>
  );
}
