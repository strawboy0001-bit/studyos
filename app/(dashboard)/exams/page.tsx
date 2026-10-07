"use client";

import * as React from "react";
import { GraduationCap, Plus, Calendar, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth/context";
import { ExamRepository } from "@/lib/data/exam-repository";
import type { Exam } from "@/types/domain";

export default function ExamsPage() {
  const { user, isDemoMode } = useAuth();
  const [exams, setExams] = React.useState<Exam[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [nowTime, setNowTime] = React.useState<number>(0);

  React.useEffect(() => {
    setNowTime(Date.now());
    async function loadExams() {
      setIsLoading(true);
      const activeUserId = user?.id || "00000000-0000-0000-0000-000000000001";
      const data = await ExamRepository.listByUser(activeUserId, isDemoMode);
      setExams(data);
      setIsLoading(false);
    }
    loadExams();
  }, [user, isDemoMode]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <PageHeader
        title="Exam Preparation Hub"
        description="Track semester finals, mid-term assessments, syllabus coverage, and readiness status."
      >
        <Button variant="gradient" size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" />
          <span>Add Exam Date</span>
        </Button>
      </PageHeader>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-pulse">
          {[1, 2].map((i) => (
            <Card key={i} className="p-6 h-40 bg-muted/40" />
          ))}
        </div>
      ) : exams.length === 0 ? (
        <EmptyState
          icon={GraduationCap}
          title="No upcoming exams scheduled"
          description="Add your upcoming mid-semester or final exam dates so StudyOS can calculate accurate revision timelines."
          actionLabel="Add First Exam"
          onAction={() => {}}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {exams.map((exam) => {
            const daysLeft = nowTime
              ? Math.ceil((new Date(exam.examDate).getTime() - nowTime) / (1000 * 60 * 60 * 24))
              : 7;

            return (
              <Card key={exam.id} glow className="p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-primary">
                      {exam.subjectName}
                    </span>
                    <Badge
                      variant={daysLeft <= 7 ? "high" : "medium"}
                      className="text-xs"
                    >
                      {daysLeft > 0 ? `${daysLeft} Days Remaining` : "Today"}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-bold text-foreground">
                    {exam.title}
                  </h3>

                  {exam.syllabusScope && (
                    <div className="rounded-lg bg-muted/40 border border-border/50 p-3 text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground block mb-1">
                        Syllabus Scope:
                      </span>
                      {exam.syllabusScope}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-border/40 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="h-4 w-4 text-indigo-400" />
                    <span>
                      {new Date(exam.examDate).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                    <span>Revision Plan</span>
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
