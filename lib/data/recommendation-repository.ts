import { createClient } from "@/lib/supabase/client";
import type { NextActionRecommendation, AIInsight } from "@/types/domain";

const DEMO_RECOMMENDATION: NextActionRecommendation = {
  action: "Revise C Programming — Loops and Iterations",
  subject: "C Programming",
  topic: "Loops and Iterations",
  reason:
    "Your recent quiz score was 55%, this topic is marked HIGH priority, and your Mid-Semester exam is in 7 days.",
  estimatedMinutes: 30,
  priority: "HIGH",
  sourceContext: "Unit 2: Control Structures — Uploaded Lecture Notes",
  actionUrl: "/subjects",
};

const DEMO_INSIGHTS: AIInsight[] = [
  {
    id: "insight-1",
    userId: "00000000-0000-0000-0000-000000000001",
    category: "RECOMMENDATION",
    title: "Focus on Loops Before Pointers",
    content: "Understanding loop boundary conditions will make multi-dimensional arrays and pointer arithmetic significantly easier to master.",
    priority: "HIGH",
    actionLabel: "Open C Notes",
    actionUrl: "/notes",
    isRead: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "insight-2",
    userId: "00000000-0000-0000-0000-000000000001",
    category: "PROGRESS",
    title: "Strong Performance in Discrete Math",
    content: "You scored 85% on your last logic quiz. Keep reviewing once weekly to maintain retention.",
    priority: "LOW",
    actionLabel: null,
    actionUrl: null,
    isRead: true,
    createdAt: new Date().toISOString(),
  },
];

export class RecommendationRepository {
  private static get client() {
    return createClient();
  }

  static async getNextAction(userId: string, isDemo = false): Promise<NextActionRecommendation | null> {
    if (isDemo) return DEMO_RECOMMENDATION;

    // For new real users in Phase 1 without enough history, return null so the clean empty state renders
    return null;
  }

  static async listInsights(userId: string, isDemo = false): Promise<AIInsight[]> {
    if (isDemo) return DEMO_INSIGHTS;

    try {
      const supabase = this.client;
      const { data, error } = await supabase
        .from("ai_insights")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error || !data || (data as unknown[]).length === 0) return [];

      const rows = data as unknown as Array<{
        id: string;
        user_id: string;
        category: string;
        title: string;
        content: string;
        priority: string;
        action_label: string | null;
        action_url: string | null;
        is_read: boolean;
        created_at: string;
      }>;

      return rows.map((item) => ({
        id: item.id,
        userId: item.user_id,
        category: item.category as AIInsight["category"],
        title: item.title,
        content: item.content,
        priority: item.priority as AIInsight["priority"],
        actionLabel: item.action_label,
        actionUrl: item.action_url,
        isRead: item.is_read,
        createdAt: item.created_at,
      }));
    } catch {
      return [];
    }
  }
}
