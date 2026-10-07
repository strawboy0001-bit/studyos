import * as React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Lightbulb, AlertTriangle, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { AIInsight } from "@/types/domain";

export interface AIInsightCardProps {
  insight: AIInsight;
}

export function AIInsightCard({ insight }: AIInsightCardProps) {
  const getIcon = () => {
    switch (insight.category) {
      case "WEAK_TOPIC":
        return <AlertTriangle className="h-4 w-4 text-rose-400" />;
      case "PROGRESS":
        return <TrendingUp className="h-4 w-4 text-emerald-400" />;
      default:
        return <Lightbulb className="h-4 w-4 text-amber-400" />;
    }
  };

  return (
    <Card glow className="p-5 flex flex-col justify-between space-y-3 bg-gradient-to-br from-card to-primary/5">
      <div className="space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-muted text-foreground">
              {getIcon()}
            </div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {insight.category.replace("_", " ")}
            </span>
          </div>
          <Badge
            variant={
              insight.priority === "HIGH"
                ? "high"
                : insight.priority === "MEDIUM"
                ? "medium"
                : "low"
            }
            className="text-[10px]"
          >
            {insight.priority}
          </Badge>
        </div>

        <h3 className="text-base font-bold text-foreground">
          {insight.title}
        </h3>

        <p className="text-xs text-muted-foreground leading-relaxed">
          {insight.content}
        </p>
      </div>

      {insight.actionLabel && insight.actionUrl && (
        <div className="pt-2 border-t border-border/40">
          <Link
            href={insight.actionUrl}
            className="text-xs font-medium text-primary hover:underline flex items-center gap-1.5"
          >
            <span>{insight.actionLabel}</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      )}
    </Card>
  );
}
