"use client";

import * as React from "react";
import { Calendar, Clock, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Assignment } from "@/types/domain";

export interface AssignmentCardProps {
  assignment: Assignment;
  onStatusChange?: (assignmentId: string, status: Assignment["status"]) => void;
}

export function AssignmentCard({ assignment, onStatusChange }: AssignmentCardProps) {
  const [formattedDate, setFormattedDate] = React.useState<string>("");
  const [isOverdue, setIsOverdue] = React.useState<boolean>(false);

  React.useEffect(() => {
    const deadlineDate = new Date(assignment.deadline);
    setIsOverdue(deadlineDate.getTime() < Date.now() && assignment.status !== "COMPLETED");
    setFormattedDate(
      deadlineDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }, [assignment.deadline, assignment.status]);

  const priorityVariant =
    assignment.priority === "HIGH"
      ? "high"
      : assignment.priority === "MEDIUM"
      ? "medium"
      : "low";

  return (
    <Card glow className="p-5 flex flex-col justify-between space-y-3">
      <div className="space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {assignment.subjectColor && (
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: assignment.subjectColor }}
              />
            )}
            <span className="text-xs font-medium text-muted-foreground">
              {assignment.subjectName || "General"}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Badge variant={priorityVariant} className="text-[10px]">
              {assignment.priority}
            </Badge>
          </div>
        </div>

        <h3 className="text-base font-bold text-foreground line-clamp-2">
          {assignment.title}
        </h3>

        {assignment.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {assignment.description}
          </p>
        )}
      </div>

      <div className="pt-3 border-t border-border/40 flex items-center justify-between gap-2">
        <div
          className={`flex items-center gap-1.5 text-xs font-medium ${
            isOverdue ? "text-destructive" : "text-muted-foreground"
          }`}
        >
          {isOverdue ? <Clock className="h-3.5 w-3.5" /> : <Calendar className="h-3.5 w-3.5" />}
          <span>{isOverdue ? "Overdue: " : "Due: "}{formattedDate || "Scheduled"}</span>
        </div>

        <button
          type="button"
          onClick={() =>
            onStatusChange?.(
              assignment.id,
              assignment.status === "COMPLETED" ? "IN_PROGRESS" : "COMPLETED"
            )
          }
          className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-md border transition-colors ${
            assignment.status === "COMPLETED"
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              : "bg-muted/60 text-muted-foreground border-border hover:text-foreground"
          }`}
        >
          <CheckCircle2 className="h-3 w-3" />
          <span>{assignment.status === "COMPLETED" ? "Done" : "Mark Done"}</span>
        </button>
      </div>
    </Card>
  );
}
