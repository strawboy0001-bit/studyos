"use client";

import * as React from "react";
import { HelpCircle, Plus, Sparkles, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth/context";

interface QuizItem {
  id: string;
  title: string;
  subject: string;
  topic: string;
  questionCount: number;
  lastScore?: number;
}

const DEMO_QUIZZES: QuizItem[] = [
  {
    id: "quiz-c-loops",
    title: "Loops & Iterations Quick Check",
    subject: "C Programming",
    topic: "Loops and Iterations",
    questionCount: 10,
    lastScore: 55,
  },
  {
    id: "quiz-chem-bonding",
    title: "Atomic Bonding & Quantum Concepts",
    subject: "Applied Chemistry",
    topic: "Atomic Structure & Bonding",
    questionCount: 10,
    lastScore: 80,
  },
];

export default function QuizzesPage() {
  const { isDemoMode } = useAuth();
  const quizzes = isDemoMode ? DEMO_QUIZZES : [];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <PageHeader
        title="Adaptive Quizzes &amp; Diagnostics"
        description="Test your understanding. Incorrect answers feed directly into the 80/20 priority engine."
      >
        <Button variant="gradient" size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" />
          <span>New Quiz</span>
        </Button>
      </PageHeader>

      {/* Adaptive Loop Explainer Card */}
      <Card className="p-4 sm:p-5 border-indigo-500/30 bg-indigo-500/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 shrink-0">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Adaptive Learning Connection
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Taking a quiz evaluates your topic mastery. Scoring below 70% automatically promotes that topic to HIGH priority on your dashboard.
            </p>
          </div>
        </div>
      </Card>

      {quizzes.length === 0 ? (
        <EmptyState
          icon={HelpCircle}
          title="No quizzes generated yet"
          description="Create a diagnostic quiz for any subject or topic to discover your knowledge gaps."
          actionLabel="Create Diagnostic Quiz"
          onAction={() => {}}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {quizzes.map((quiz) => (
            <Card key={quiz.id} glow className="p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-primary">
                    {quiz.subject}
                  </span>
                  <Badge variant="secondary" className="text-[10px]">
                    {quiz.questionCount} Questions
                  </Badge>
                </div>

                <h3 className="text-base font-bold text-foreground">
                  {quiz.title}
                </h3>
                <p className="text-xs text-muted-foreground">{quiz.topic}</p>

                {quiz.lastScore !== undefined && (
                  <div className="rounded-lg bg-muted/50 border border-border/50 p-2.5 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Latest Score:</span>
                    <span
                      className={`font-bold ${
                        quiz.lastScore < 60
                          ? "text-rose-400"
                          : quiz.lastScore < 80
                          ? "text-amber-400"
                          : "text-emerald-400"
                      }`}
                    >
                      {quiz.lastScore}% (Diagnostic recorded)
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-border/40 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">5-10 mins</span>
                <Button size="sm" variant="gradient" className="gap-1.5 text-xs">
                  <span>Start Quiz</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
