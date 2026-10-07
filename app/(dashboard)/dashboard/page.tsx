"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sparkles,
  BookOpen,
  Calendar,
  CheckSquare,
  GraduationCap,
  ArrowRight,
  TrendingUp,
  Target,
  Plus,
  Flame,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StudyRecommendationCard } from "@/components/domain/study-recommendation-card";
import { AssignmentCard } from "@/components/domain/assignment-card";
import { PriorityCard } from "@/components/domain/priority-card";
import { AIInsightCard } from "@/components/domain/ai-insight-card";
import { EmptyState } from "@/components/shared/empty-state";
import { LoadingState } from "@/components/shared/loading-state";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth/context";
import { AssignmentRepository } from "@/lib/data/assignment-repository";
import { SubjectRepository } from "@/lib/data/subject-repository";
import { ExamRepository } from "@/lib/data/exam-repository";
import { RecommendationRepository } from "@/lib/data/recommendation-repository";
import type {
  Assignment,
  Topic,
  Exam,
  NextActionRecommendation,
  AIInsight,
} from "@/types/domain";

export default function DashboardPage() {
  const { user, profile, isDemoMode, isLoading: isAuthLoading } = useAuth();

  const [recommendation, setRecommendation] = React.useState<NextActionRecommendation | null>(null);
  const [assignments, setAssignments] = React.useState<Assignment[]>([]);
  const [weakTopics, setWeakTopics] = React.useState<Topic[]>([]);
  const [exams, setExams] = React.useState<Exam[]>([]);
  const [insights, setInsights] = React.useState<AIInsight[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadDashboardData() {
      const activeUserId = user?.id || profile?.id || "00000000-0000-0000-0000-000000000001";
      try {
        setIsLoading(true);
        const [recData, assignData, topicData, examData, insightData] = await Promise.all([
          RecommendationRepository.getNextAction(activeUserId, isDemoMode),
          AssignmentRepository.listByUser(activeUserId, isDemoMode),
          SubjectRepository.listTopics(activeUserId, undefined, isDemoMode),
          ExamRepository.listByUser(activeUserId, isDemoMode),
          RecommendationRepository.listInsights(activeUserId, isDemoMode),
        ]);

        setRecommendation(recData);
        setAssignments(assignData);
        setWeakTopics(topicData.filter((t) => t.currentPriority === "HIGH" || t.quizAccuracy < 70));
        setExams(examData);
        setInsights(insightData);
      } catch {
        // Safe fallback
      } finally {
        setIsLoading(false);
      }
    }

    if (!isAuthLoading) {
      loadDashboardData();
    }
  }, [user, profile, isDemoMode, isAuthLoading]);

  const handleAssignmentStatusChange = (assignmentId: string, newStatus: Assignment["status"]) => {
    setAssignments((prev) =>
      prev.map((a) => (a.id === assignmentId ? { ...a, status: newStatus } : a))
    );
  };

  const studentName = profile?.name || "Student";
  const firstName = studentName.split(" ")[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Greeting Header */}
      <PageHeader
        title={`Good day, ${firstName}`}
        description="Here is your personal academic priority overview and recommended next action for today."
        badge={
          isDemoMode ? (
            <Badge variant="outline" className="border-indigo-500/40 text-indigo-300 bg-indigo-500/10">
              BCA Sem 1 Demo
            </Badge>
          ) : undefined
        }
      >
        <Link href="/subjects">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <Plus className="h-3.5 w-3.5" />
            <span>Add Subject</span>
          </Button>
        </Link>
        <Link href="/planner">
          <Button variant="gradient" size="sm" className="gap-1.5 text-xs shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Plan Today (2h)</span>
          </Button>
        </Link>
      </PageHeader>

      {/* 1. SIGNATURE SECTION: What Should I Do Next? */}
      <section aria-labelledby="recommendation-heading" className="space-y-2">
        <StudyRecommendationCard
          recommendation={recommendation}
          isDemo={isDemoMode}
        />
      </section>

      {/* 2. MAIN 2-COLUMN GRID: Left = Urgent Deadlines & Weak Topics, Right = Exams & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Deadlines & Weak Topics */}
        <div className="lg:col-span-2 space-y-8">
          {/* Upcoming Deadlines */}
          <section className="space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckSquare className="h-4 w-4 text-primary" />
                <h2 className="text-base font-bold text-foreground">
                  Upcoming Assignments &amp; Deadlines
                </h2>
              </div>
              <Link
                href="/assignments"
                className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
              >
                View all ({assignments.length}) <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {isLoading ? (
              <LoadingState type="list" count={2} />
            ) : assignments.length === 0 ? (
              <EmptyState
                icon={CheckSquare}
                title="No upcoming assignments"
                description="Add your first assignment or deadline to start tracking your academic workload."
                actionLabel="Create Assignment"
                onAction={() => {}}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {assignments.slice(0, 4).map((assignment) => (
                  <AssignmentCard
                    key={assignment.id}
                    assignment={assignment}
                    onStatusChange={handleAssignmentStatusChange}
                  />
                ))}
              </div>
            )}
          </section>

          {/* 80/20 Weak Topics & Priorities */}
          <section className="space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-rose-400" />
                <h2 className="text-base font-bold text-foreground">
                  80/20 High Priority Topics
                </h2>
              </div>
              <Link
                href="/quizzes"
                className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
              >
                Take Diagnostic Quiz <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {isLoading ? (
              <LoadingState type="cards" count={2} />
            ) : weakTopics.length === 0 ? (
              <EmptyState
                icon={Target}
                title="No weak topics identified"
                description="As you complete quizzes and review notes, high priority focus areas will appear here."
                actionLabel="Explore Subjects"
                onAction={() => {}}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {weakTopics.slice(0, 4).map((topic) => (
                  <PriorityCard key={topic.id} topic={topic} />
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Right 1 Column: Exam Preparation & AI Insights */}
        <div className="space-y-8">
          {/* Exam Prep Urgency */}
          <section className="space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-indigo-400" />
                <h2 className="text-base font-bold text-foreground">
                  Upcoming Exams
                </h2>
              </div>
              <Link
                href="/exams"
                className="text-xs font-semibold text-primary hover:underline"
              >
                Full Schedule
              </Link>
            </div>

            {exams.length === 0 ? (
              <Card className="p-5 text-center text-xs text-muted-foreground">
                No exams scheduled yet. Add your mid-semesters or finals in Exam Prep.
              </Card>
            ) : (
              <div className="space-y-3">
                {exams.map((exam) => (
                  <Card key={exam.id} glow className="p-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-semibold text-indigo-400">
                        {exam.subjectName}
                      </span>
                      <Badge variant="outline" className="text-[10px]">
                        {new Date(exam.examDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </Badge>
                    </div>
                    <h3 className="text-sm font-bold text-foreground">
                      {exam.title}
                    </h3>
                    {exam.syllabusScope && (
                      <p className="text-[11px] text-muted-foreground line-clamp-2">
                        {exam.syllabusScope}
                      </p>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </section>

          {/* Academic AI Insights */}
          <section className="space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <h2 className="text-base font-bold text-foreground">
                  Academic Insight
                </h2>
              </div>
            </div>

            {insights.length === 0 ? (
              <Card className="p-5 text-center text-xs text-muted-foreground">
                Insights will update automatically as your study habits progress.
              </Card>
            ) : (
              <div className="space-y-3">
                {insights.slice(0, 2).map((insight) => (
                  <AIInsightCard key={insight.id} insight={insight} />
                ))}
              </div>
            )}
          </section>

          {/* Quick Academic Progress Stats */}
          <section className="rounded-xl border border-border/70 bg-card/60 p-5 space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Weekly Retention Progress
              </h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-foreground font-medium">Syllabus Reviewed</span>
                <span className="font-bold text-primary">68%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted/60 overflow-hidden">
                <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />
              </div>
              <p className="text-[11px] text-muted-foreground pt-1">
                2 out of 3 core subjects revised this week.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
