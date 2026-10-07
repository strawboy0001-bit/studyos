"use client";

import * as React from "react";
import { Layers, Plus, Sparkles, BookOpen, RotateCw, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth/context";

interface Deck {
  id: string;
  title: string;
  subject: string;
  topic: string;
  cardCount: number;
  masteryPercentage: number;
}

const DEMO_DECKS: Deck[] = [
  {
    id: "deck-c-loops",
    title: "C Programming Control Structures & Loop Invariants",
    subject: "C Programming",
    topic: "Loops and Iterations",
    cardCount: 12,
    masteryPercentage: 58,
  },
  {
    id: "deck-chem-atomic",
    title: "Quantum Numbers & Electronic Configuration",
    subject: "Applied Chemistry",
    topic: "Atomic Structure",
    cardCount: 15,
    masteryPercentage: 80,
  },
];

export default function FlashcardsPage() {
  const { isDemoMode } = useAuth();
  const decks = isDemoMode ? DEMO_DECKS : [];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <PageHeader
        title="Active Recall Flashcards"
        description="Strengthen topic retention through spaced repetition and self-assessment."
      >
        <Button variant="gradient" size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" />
          <span>New Deck</span>
        </Button>
      </PageHeader>

      {decks.length === 0 ? (
        <EmptyState
          icon={Layers}
          title="No flashcard decks yet"
          description="Create your first flashcard deck or generate active recall questions from your uploaded notes."
          actionLabel="Create Deck"
          onAction={() => {}}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {decks.map((deck) => (
            <Card key={deck.id} glow className="p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-primary">
                    {deck.subject}
                  </span>
                  <Badge variant="secondary" className="text-[10px]">
                    {deck.cardCount} Cards
                  </Badge>
                </div>
                <h3 className="text-base font-bold text-foreground">
                  {deck.title}
                </h3>
                <p className="text-xs text-muted-foreground">{deck.topic}</p>

                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Mastery Level</span>
                    <span className="font-semibold text-foreground">{deck.masteryPercentage}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted/60 overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{ width: `${deck.masteryPercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-border/40 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Spaced Review</span>
                <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                  <RotateCw className="h-3.5 w-3.5" />
                  <span>Review Deck</span>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
