"use client";

import * as React from "react";
import { Clock, Sparkles, CheckCircle2, RotateCcw, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth/context";

interface PlanItem {
  id: string;
  durationMinutes: number;
  subject: string;
  task: string;
  reason: string;
  isCompleted: boolean;
}

const DEMO_2HR_PLAN: PlanItem[] = [
  {
    id: "plan-1",
    durationMinutes: 30,
    subject: "C Programming",
    task: "Loops & Iterations: Nested while loops & boundary checks",
    reason: "Quiz score was 55% • Mid-Sem exam in 7 days",
    isCompleted: false,
  },
  {
    id: "plan-2",
    durationMinutes: 30,
    subject: "Applied Chemistry",
    task: "Atomic Structure: Bohr model & quantum orbital rules",
    reason: "Upcoming sessional assessment",
    isCompleted: false,
  },
  {
    id: "plan-3",
    durationMinutes: 20,
    subject: "Flashcard Review",
    task: "Active Recall: 12 Loop invariants flashcards",
    reason: "Reinforce key syntax and termination conditions",
    isCompleted: false,
  },
  {
    id: "plan-4",
    durationMinutes: 25,
    subject: "Environmental Studies",
    task: "Ecosystems & Biodiversity summary reading",
    reason: "Unit 2 lecture follow-up",
    isCompleted: false,
  },
  {
    id: "plan-5",
    durationMinutes: 15,
    subject: "Diagnostic Quiz",
    task: "Take 5-question check on C conditional branching",
    reason: "Verify concept mastery after revision",
    isCompleted: false,
  },
];

export default function PlannerPage() {
  const { isDemoMode } = useAuth();
  const [minutes, setMinutes] = React.useState<number>(120);
  const [planItems, setPlanItems] = React.useState<PlanItem[]>(isDemoMode ? DEMO_2HR_PLAN : []);

  const toggleComplete = (id: string) => {
    setPlanItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  const completedMinutes = planItems
    .filter((i) => i.isCompleted)
    .reduce((acc, i) => acc + i.durationMinutes, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <PageHeader
        title="Time-Budgeted Study Planner"
        description="Tell StudyOS how much time you have, and get an optimized, priority-ranked study itinerary."
      />

      {/* Time Budget Selector Bar */}
      <Card className="p-6 bg-gradient-to-br from-card to-indigo-950/20 border-indigo-500/30 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">
                Set Available Study Time Today
              </h2>
              <p className="text-xs text-muted-foreground">
                StudyOS allocates focused intervals based on your highest urgency topics.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {[30, 60, 90, 120, 180].map((m) => (
              <Button
                key={m}
                type="button"
                size="sm"
                variant={minutes === m ? "gradient" : "outline"}
                onClick={() => {
                  setMinutes(m);
                  if (!isDemoMode) {
                    setPlanItems([]);
                  }
                }}
                className="text-xs"
              >
                {m < 60 ? `${m}m` : `${m / 60}h`}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Generated Study Itinerary */}
      {planItems.length === 0 ? (
        <Card className="p-10 text-center border-dashed border-border/80 bg-card/40 space-y-3">
          <Sparkles className="mx-auto h-8 w-8 text-muted-foreground/60" />
          <h3 className="text-base font-bold text-foreground">
            Study Planner Foundation Ready
          </h3>
          <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
            Personalized study time budgets are created from your enrolled subjects, pending assignments, and weak quiz topics.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPlanItems(DEMO_2HR_PLAN)}
            className="text-xs border-indigo-500/30 text-indigo-300"
          >
            Load 2-Hour Demo Itinerary
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1 text-xs text-muted-foreground">
            <span>
              Itinerary Progress: <strong className="text-foreground">{completedMinutes} / {minutes} mins</strong>
            </span>
            <span>{planItems.filter((i) => i.isCompleted).length} of {planItems.length} blocks completed</span>
          </div>

          <div className="space-y-3">
            {planItems.map((item, idx) => (
              <Card
                key={item.id}
                glow
                className={`p-4 transition-all ${
                  item.isCompleted ? "opacity-60 bg-muted/30 border-border/40" : "bg-card"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start sm:items-center gap-3">
                    <button
                      type="button"
                      onClick={() => toggleComplete(item.id)}
                      className={`flex h-6 w-6 items-center justify-center rounded-full border shrink-0 transition-colors ${
                        item.isCompleted
                          ? "bg-emerald-500 border-emerald-500 text-white"
                          : "border-border hover:border-primary"
                      }`}
                    >
                      {item.isCompleted && <CheckCircle2 className="h-4 w-4" />}
                    </button>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-[10px] font-mono">
                          {item.durationMinutes}m
                        </Badge>
                        <span className="text-xs font-semibold text-primary">
                          {item.subject}
                        </span>
                      </div>
                      <h4 className={`text-sm font-bold ${item.isCompleted ? "line-through text-muted-foreground" : "text-foreground"}`}>
                        {item.task}
                      </h4>
                      <p className="text-[11px] text-muted-foreground">
                        Why: {item.reason}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs text-muted-foreground shrink-0 self-end sm:self-center">
                    Step {idx + 1}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
