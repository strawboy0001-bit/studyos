"use client";

import * as React from "react";
import { Sparkles, Send, BookOpen, AlertCircle, Bot, MessageSquare } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AssistantPage() {
  const [input, setInput] = React.useState("");

  const quickPrompts = [
    "What should I study today?",
    "What topics am I weakest at?",
    "Explain loops from my C Programming notes.",
    "What assignments are due this week?",
    "I have 1 hour before my next lecture.",
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <PageHeader
        title="AI Academic Copilot"
        description="Grounded academic assistant powered by your course notes, syllabus, and quiz history."
      >
        <Badge variant="outline" className="border-indigo-500/40 text-indigo-300 bg-indigo-500/10">
          Phase 1 Interface Shell
        </Badge>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Chat Shell */}
        <div className="lg:col-span-2 flex flex-col h-[520px] rounded-xl border border-border bg-card/70 overflow-hidden shadow-lg">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* Assistant Welcome Message */}
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-sm shrink-0">
                <Bot className="h-4 w-4" />
              </div>
              <div className="space-y-2 max-w-lg">
                <div className="rounded-2xl rounded-tl-none bg-muted/60 border border-border/50 p-4 text-xs sm:text-sm text-foreground leading-relaxed">
                  <p className="font-semibold text-primary mb-1">StudyOS Academic Copilot</p>
                  Hello! I am your personal academic assistant. Once connected to your course materials, I can explain difficult concepts from your uploaded notes, test your weak areas, or organize your study sessions.
                </div>
                <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-300 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>
                    Note: Live LLM inference and note grounding will be fully activated in Phase 4.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Prompts */}
          <div className="px-4 py-2 bg-muted/30 border-t border-border/40 flex items-center gap-2 overflow-x-auto no-scrollbar">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setInput(p)}
                className="whitespace-nowrap rounded-full bg-card border border-border/80 px-2.5 py-1 text-[11px] text-muted-foreground hover:text-foreground hover:border-primary transition-colors shrink-0"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-4 border-t border-border bg-card">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setInput("");
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about your syllabus, notes, or priorities…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="h-10 flex-1 rounded-lg border border-input bg-card/60 px-3.5 text-xs sm:text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              />
              <Button type="submit" variant="gradient" size="sm" className="h-10 px-4">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Right 1 Col: Grounding Rules & Boundaries */}
        <div className="space-y-4">
          <Card className="p-5 space-y-3 bg-card/80">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-400" />
              <h3 className="text-sm font-bold text-foreground">
                Grounded AI Architecture
              </h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              StudyOS assistants strictly prioritize student-provided notes and verified syllabus units before general web answers.
            </p>
            <div className="space-y-2 pt-2 border-t border-border/50 text-xs text-muted-foreground">
              <div className="flex items-center gap-2 text-foreground font-medium">
                <span className="text-emerald-400">✓</span> Grounded in your notes
              </div>
              <div className="flex items-center gap-2 text-foreground font-medium">
                <span className="text-emerald-400">✓</span> No fabricated citations
              </div>
              <div className="flex items-center gap-2 text-foreground font-medium">
                <span className="text-emerald-400">✓</span> Confirmation for new records
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
