import { createClient } from "@/lib/supabase/client";
import type { Assignment } from "@/types/domain";
import type { AssignmentInput } from "@/lib/validation/academic";

const DEMO_ASSIGNMENTS: Assignment[] = [
  {
    id: "assign-pattern-c",
    userId: "00000000-0000-0000-0000-000000000001",
    subjectId: "sub-c-programming",
    title: "Implement Pattern Printing with Nested Loops",
    description: "Write C programs to print diamond, Floyd triangle, and Pascal triangle patterns using nested while and for loops.",
    deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "HIGH",
    status: "IN_PROGRESS",
    subjectName: "C Programming",
    subjectColor: "#6366f1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "assign-chem-lab",
    userId: "00000000-0000-0000-0000-000000000001",
    subjectId: "sub-chemistry",
    title: "Lab Report: Acid-Base Titration Analysis",
    description: "Submit 3-page typed report including titration curve graphs and neutralization calculations.",
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "MEDIUM",
    status: "NOT_STARTED",
    subjectName: "Applied Chemistry",
    subjectColor: "#06b6d4",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "assign-math-set",
    userId: "00000000-0000-0000-0000-000000000001",
    subjectId: "sub-maths",
    title: "Problem Set 3: Propositional Logic and Truth Tables",
    description: "Solve problems 1-15 on equivalence laws and tautology proofs.",
    deadline: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "LOW",
    status: "NOT_STARTED",
    subjectName: "Discrete Mathematics",
    subjectColor: "#8b5cf6",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export class AssignmentRepository {
  private static get client() {
    return createClient();
  }

  static async listByUser(userId: string, isDemo = false): Promise<Assignment[]> {
    if (isDemo) return DEMO_ASSIGNMENTS;

    try {
      const supabase = this.client;
      const { data, error } = await supabase
        .from("assignments")
        .select("*, subjects(name, color)")
        .eq("user_id", userId)
        .order("deadline", { ascending: true });

      if (error || !data || (data as unknown[]).length === 0) {
        return [];
      }

      const rows = data as unknown as Array<{
        id: string;
        user_id: string;
        subject_id: string | null;
        title: string;
        description: string | null;
        deadline: string;
        priority: string;
        status: string;
        subjects: { name?: string; color?: string } | null;
        created_at: string;
        updated_at: string;
      }>;

      return rows.map((item) => ({
        id: item.id,
        userId: item.user_id,
        subjectId: item.subject_id,
        title: item.title,
        description: item.description,
        deadline: item.deadline,
        priority: item.priority as Assignment["priority"],
        status: item.status as Assignment["status"],
        subjectName: item.subjects?.name,
        subjectColor: item.subjects?.color || "#3b82f6",
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      }));
    } catch {
      return [];
    }
  }

  static async create(userId: string, input: AssignmentInput): Promise<Assignment | null> {
    try {
      const supabase = this.client;
      const { data, error } = await supabase
        .from("assignments")
        .insert({
          user_id: userId,
          subject_id: input.subjectId || null,
          title: input.title,
          description: input.description || null,
          deadline: input.deadline,
          priority: input.priority || "MEDIUM",
          status: input.status || "NOT_STARTED",
        })
        .select()
        .single();

      if (error || !data) return null;

      const row = data as unknown as {
        id: string;
        user_id: string;
        subject_id: string | null;
        title: string;
        description: string | null;
        deadline: string;
        priority: string;
        status: string;
        created_at: string;
        updated_at: string;
      };

      return {
        id: row.id,
        userId: row.user_id,
        subjectId: row.subject_id,
        title: row.title,
        description: row.description,
        deadline: row.deadline,
        priority: row.priority as Assignment["priority"],
        status: row.status as Assignment["status"],
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      };
    } catch {
      return null;
    }
  }
}
