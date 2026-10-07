import { createClient } from "@/lib/supabase/client";
import type { Subject, Topic } from "@/types/domain";
import type { SubjectInput } from "@/lib/validation/academic";

const DEMO_SUBJECTS: Subject[] = [
  {
    id: "sub-c-programming",
    userId: "00000000-0000-0000-0000-000000000001",
    name: "C Programming",
    code: "CS101",
    color: "#6366f1",
    semester: 1,
    isArchived: false,
    topicCount: 4,
    noteCount: 8,
    assignmentCount: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "sub-chemistry",
    userId: "00000000-0000-0000-0000-000000000001",
    name: "Applied Chemistry",
    code: "CH102",
    color: "#06b6d4",
    semester: 1,
    isArchived: false,
    topicCount: 3,
    noteCount: 5,
    assignmentCount: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "sub-environment",
    userId: "00000000-0000-0000-0000-000000000001",
    name: "Environmental Studies",
    code: "EV103",
    color: "#10b981",
    semester: 1,
    isArchived: false,
    topicCount: 3,
    noteCount: 4,
    assignmentCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "sub-english",
    userId: "00000000-0000-0000-0000-000000000001",
    name: "Technical English",
    code: "EN104",
    color: "#f59e0b",
    semester: 1,
    isArchived: false,
    topicCount: 2,
    noteCount: 3,
    assignmentCount: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "sub-maths",
    userId: "00000000-0000-0000-0000-000000000001",
    name: "Discrete Mathematics",
    code: "MA105",
    color: "#8b5cf6",
    semester: 1,
    isArchived: false,
    topicCount: 5,
    noteCount: 7,
    assignmentCount: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const DEMO_TOPICS: Topic[] = [
  {
    id: "topic-loops",
    subjectId: "sub-c-programming",
    userId: "00000000-0000-0000-0000-000000000001",
    name: "Loops and Iterations",
    unit: "Unit 2: Control Structures",
    importance: "HIGH",
    currentPriority: "HIGH",
    quizAccuracy: 55,
    confidenceLevel: 45,
    subjectName: "C Programming",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "topic-pointers",
    subjectId: "sub-c-programming",
    userId: "00000000-0000-0000-0000-000000000001",
    name: "Pointers & Dynamic Memory",
    unit: "Unit 4: Memory",
    importance: "HIGH",
    currentPriority: "MEDIUM",
    quizAccuracy: 72,
    confidenceLevel: 65,
    subjectName: "C Programming",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "topic-atomic",
    subjectId: "sub-chemistry",
    userId: "00000000-0000-0000-0000-000000000001",
    name: "Atomic Structure & Bonding",
    unit: "Unit 1: Fundamentals",
    importance: "MEDIUM",
    currentPriority: "MEDIUM",
    quizAccuracy: 80,
    confidenceLevel: 75,
    subjectName: "Applied Chemistry",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export class SubjectRepository {
  private static get client() {
    return createClient();
  }

  static async listByUser(userId: string, isDemo = false): Promise<Subject[]> {
    if (isDemo) return DEMO_SUBJECTS;

    try {
      const supabase = this.client;
      const { data, error } = await supabase
        .from("subjects")
        .select("*")
        .eq("user_id", userId)
        .eq("is_archived", false)
        .order("created_at", { ascending: false });

      if (error || !data || (data as unknown[]).length === 0) {
        return [];
      }

      const rows = data as unknown as Array<{
        id: string;
        user_id: string;
        name: string;
        code: string | null;
        color: string | null;
        semester: number | null;
        is_archived: boolean;
        created_at: string;
        updated_at: string;
      }>;

      return rows.map((item) => ({
        id: item.id,
        userId: item.user_id,
        name: item.name,
        code: item.code,
        color: item.color || "#3b82f6",
        semester: item.semester,
        isArchived: item.is_archived,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      }));
    } catch {
      return [];
    }
  }

  static async listTopics(userId: string, subjectId?: string, isDemo = false): Promise<Topic[]> {
    if (isDemo) {
      if (subjectId) {
        return DEMO_TOPICS.filter((t) => t.subjectId === subjectId);
      }
      return DEMO_TOPICS;
    }

    try {
      const supabase = this.client;
      let query = supabase.from("topics").select("*, subjects(name)").eq("user_id", userId);

      if (subjectId) {
        query = query.eq("subject_id", subjectId);
      }

      const { data, error } = await query.order("created_at", { ascending: false });

      if (error || !data) return [];

      const rows = data as unknown as Array<{
        id: string;
        subject_id: string;
        user_id: string;
        name: string;
        unit: string | null;
        importance: string;
        current_priority: string;
        quiz_accuracy: number;
        confidence_level: number;
        subjects: { name?: string } | null;
        created_at: string;
        updated_at: string;
      }>;

      return rows.map((t) => ({
        id: t.id,
        subjectId: t.subject_id,
        userId: t.user_id,
        name: t.name,
        unit: t.unit,
        importance: t.importance as Topic["importance"],
        currentPriority: t.current_priority as Topic["currentPriority"],
        quizAccuracy: Number(t.quiz_accuracy),
        confidenceLevel: t.confidence_level,
        subjectName: t.subjects?.name || "",
        createdAt: t.created_at,
        updatedAt: t.updated_at,
      }));
    } catch {
      return [];
    }
  }

  static async create(userId: string, input: SubjectInput): Promise<Subject | null> {
    try {
      const supabase = this.client;
      const { data, error } = await supabase
        .from("subjects")
        .insert({
          user_id: userId,
          name: input.name,
          code: input.code || null,
          color: input.color || "#3b82f6",
          semester: input.semester || null,
        })
        .select()
        .single();

      if (error || !data) return null;

      const row = data as unknown as {
        id: string;
        user_id: string;
        name: string;
        code: string | null;
        color: string | null;
        semester: number | null;
        is_archived: boolean;
        created_at: string;
        updated_at: string;
      };

      return {
        id: row.id,
        userId: row.user_id,
        name: row.name,
        code: row.code,
        color: row.color || "#3b82f6",
        semester: row.semester,
        isArchived: row.is_archived,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      };
    } catch {
      return null;
    }
  }
}
