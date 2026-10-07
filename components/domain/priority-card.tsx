import * as React from "react";
import Link from "next/link";
import { AlertCircle, ArrowRight, Target } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { Topic } from "@/types/domain";

export interface PriorityCardProps {
  topic: Topic;
}

export function PriorityCard({ topic }: PriorityCardProps) {
  const priorityVariant =
    topic.currentPriority === "HIGH"
      ? "high"
      : topic.currentPriority === "MEDIUM"
      ? "medium"
      : "low";

  return (
    <Card glow className="p-5 flex flex-col justify-between space-y-3">
      <div className="space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold text-primary">
            {topic.subjectName || "Subject"}
          </span>
          <Badge variant={priorityVariant} className="text-[10px]">
            {topic.currentPriority} Priority
          </Badge>
        </div>

        <div>
          <h3 className="text-base font-bold text-foreground line-clamp-1">
            {topic.name}
          </h3>
          {topic.unit && (
            <p className="text-xs text-muted-foreground mt-0.5">{topic.unit}</p>
          )}
        </div>

        <div className="space-y-1.5 pt-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Quiz Accuracy</span>
            <span className="font-semibold text-foreground">{topic.quizAccuracy}%</span>
          </div>
          <Progress
            value={topic.quizAccuracy}
            indicatorColor={
              topic.quizAccuracy < 60
                ? "bg-rose-500"
                : topic.quizAccuracy < 80
                ? "bg-amber-500"
                : "bg-emerald-500"
            }
          />
        </div>
      </div>

      <div className="pt-3 border-t border-border/40 flex items-center justify-between">
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <Target className="h-3.5 w-3.5 text-primary" /> Confidence: {topic.confidenceLevel}%
        </span>
        <Link
          href={`/quizzes?topicId=${topic.id}`}
          className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
        >
          Practice <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </Card>
  );
}
