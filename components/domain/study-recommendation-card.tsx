import * as React from "react";
import Link from "next/link";
import { Sparkles, Clock, ArrowRight, BookOpen, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { NextActionRecommendation } from "@/types/domain";

export interface StudyRecommendationCardProps {
  recommendation?: NextActionRecommendation | null;
  onStart?: () => void;
  isDemo?: boolean;
}

export function StudyRecommendationCard({
  recommendation,
  onStart,
  isDemo = false,
}: StudyRecommendationCardProps) {
  if (!recommendation) {
    return (
      <Card className="relative overflow-hidden border-primary/30 bg-gradient-to-br from-card via-card to-primary/5 p-6 shadow-md">
        <div className="flex items-center gap-2 mb-3">
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            What Should I Do Next?
          </span>
          <Badge variant="outline" className="ml-auto text-[10px] text-muted-foreground">
            Adaptive Engine
          </Badge>
        </div>

        <div className="my-3 space-y-2">
          <h3 className="text-lg sm:text-xl font-bold text-foreground">
            Academic Context Initializing
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your personalized next-action recommendation will appear here as you add subjects, upload notes, or complete quizzes.
          </p>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3 pt-3 border-t border-border/50 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-primary" />
            <span>Add subjects or notes to get started</span>
          </div>
          <Link href="/subjects" className="ml-auto font-medium text-primary hover:underline flex items-center gap-1">
            Browse Subjects <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </Card>
    );
  }

  const priorityVariant =
    recommendation.priority === "HIGH"
      ? "high"
      : recommendation.priority === "MEDIUM"
      ? "medium"
      : "low";

  return (
    <Card className="relative overflow-hidden border-indigo-500/40 bg-gradient-to-br from-card via-card to-indigo-950/20 p-6 shadow-lg">
      <div className="absolute top-0 right-0 h-32 w-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-500/20 text-indigo-400">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
            What Should I Do Next?
          </span>
        </div>
        <div className="flex items-center gap-2">
          {isDemo && (
            <Badge variant="outline" className="text-[10px] border-indigo-500/30 text-indigo-300">
              Demo Persona
            </Badge>
          )}
          <Badge variant={priorityVariant}>
            {recommendation.priority} Priority
          </Badge>
        </div>
      </div>

      <div className="my-3 space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          {recommendation.action}
        </h2>
        <div className="rounded-lg bg-muted/40 border border-border/60 p-3.5">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1.5">
            <AlertTriangle className="h-3 w-3 text-amber-400" />
            Why this matters now:
          </div>
          <p className="text-sm text-foreground/90 leading-relaxed">
            {recommendation.reason}
          </p>
          {recommendation.sourceContext && (
            <p className="text-xs text-muted-foreground mt-2 border-t border-border/40 pt-1.5 font-mono">
              Source: {recommendation.sourceContext}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-border/60">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4 text-indigo-400" />
          <span>Estimated duration: <strong className="text-foreground">{recommendation.estimatedMinutes} mins</strong></span>
        </div>

        <div className="flex items-center gap-3">
          {recommendation.actionUrl ? (
            <Link href={recommendation.actionUrl}>
              <Button variant="gradient" size="sm" className="gap-2">
                Start Session <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <Button onClick={onStart} variant="gradient" size="sm" className="gap-2">
              Start Session <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
