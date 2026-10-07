"use client";

import * as React from "react";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth/context";
import { AssignmentRepository } from "@/lib/data/assignment-repository";
import { ExamRepository } from "@/lib/data/exam-repository";
import type { Assignment, Exam } from "@/types/domain";

interface TimelineEvent {
  id: string;
  type: "ASSIGNMENT" | "EXAM";
  title: string;
  subject: string;
  formattedDate: string;
  priority?: string;
  status?: string;
}

export default function CalendarPage() {
  const { user, isDemoMode } = useAuth();
  const [assignments, setAssignments] = React.useState<Assignment[]>([]);
  const [exams, setExams] = React.useState<Exam[]>([]);
  const [events, setEvents] = React.useState<TimelineEvent[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadEvents() {
      setIsLoading(true);
      const activeUserId = user?.id || "00000000-0000-0000-0000-000000000001";
      const [assignData, examData] = await Promise.all([
        AssignmentRepository.listByUser(activeUserId, isDemoMode),
        ExamRepository.listByUser(activeUserId, isDemoMode),
      ]);
      setAssignments(assignData);
      setExams(examData);

      const combined: TimelineEvent[] = [
        ...assignData.map((a) => ({
          id: a.id,
          type: "ASSIGNMENT" as const,
          title: a.title,
          subject: a.subjectName || "Academic",
          formattedDate: new Date(a.deadline).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          priority: a.priority,
          status: a.status,
          rawTime: new Date(a.deadline).getTime(),
        })),
        ...examData.map((e) => ({
          id: e.id,
          type: "EXAM" as const,
          title: e.title,
          subject: e.subjectName || "Academic",
          formattedDate: new Date(e.examDate).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          priority: "HIGH",
          status: e.preparationStatus,
          rawTime: new Date(e.examDate).getTime(),
        })),
      ]
        .sort((a, b) => a.rawTime - b.rawTime)
        .map(({ rawTime: _rawTime, ...rest }) => rest);

      setEvents(combined);
      setIsLoading(false);
    }
    loadEvents();
  }, [user, isDemoMode]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <PageHeader
        title="Academic Calendar"
        description="Unified chronological timeline of assignments, deadlines, assessments, and exam milestones."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Timeline */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-border/60">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-primary" />
              <span>Upcoming Milestones ({events.length})</span>
            </h2>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-4 h-20 animate-pulse bg-muted/40" />
              ))}
            </div>
          ) : events.length === 0 ? (
            <Card className="p-8 text-center text-muted-foreground text-sm space-y-2">
              <CalendarIcon className="mx-auto h-8 w-8 text-muted-foreground/60 mb-2" />
              <p className="font-semibold text-foreground">No events scheduled</p>
              <p className="text-xs">Add deadlines or exams to populate your calendar timeline.</p>
            </Card>
          ) : (
            <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-border">
              {events.map((ev) => (
                <div key={ev.id} className="relative group">
                  <span
                    className={`absolute -left-6 top-3.5 h-3 w-3 rounded-full ring-4 ring-background ${
                      ev.type === "EXAM" ? "bg-indigo-500" : "bg-primary"
                    }`}
                  />
                  <Card glow className="p-4 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-primary">
                          {ev.subject}
                        </span>
                        <Badge
                          variant={ev.type === "EXAM" ? "indigo" : "secondary"}
                          className="text-[10px]"
                        >
                          {ev.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{ev.formattedDate}</span>
                      </div>
                    </div>
                    <h3 className="text-sm font-bold text-foreground">
                      {ev.title}
                    </h3>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right 1 Col: Quick Month Overview & Context */}
        <div className="space-y-4">
          <Card className="p-5 space-y-4 bg-card/80">
            <h3 className="text-sm font-bold text-foreground flex items-center justify-between">
              <span>Calendar Context</span>
              <Badge variant="outline" className="text-[10px]">Academic Term</Badge>
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              StudyOS automatically consolidates obligations across all your subjects so you never miss a submission or assessment.
            </p>
            <div className="space-y-2 pt-2 border-t border-border/50 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-indigo-500" /> Exams
                </span>
                <span className="font-bold text-foreground">{exams.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-primary" /> Assignments
                </span>
                <span className="font-bold text-foreground">{assignments.length}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
