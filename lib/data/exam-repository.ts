import { createClient } from "@/lib/supabase/client";
import type { Exam } from "@/types/domain";
import type { ExamInput } from "@/lib/validation/academic";

const DEMO_EXAMS: Exam[] = [
  {
    id: "exam-c-midsem",
    userId: "00000000-0000-0000-0000-000000000001",
    subjectId: "sub-c-programming",
    title: "C Programming Mid-Semester Examination",
    examDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    syllabusScope: "Units 1-3: Variables, Operators, Control Flow, Functions & Arrays",
    preparationStatus: "IN_PROGRESS",
    subjectName: "C Programming",
    subjectColor: "#6366f1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "exam-chem-eval",
    userId: "00000000-0000-0000-0000-000000000001",
    subjectId: "sub-chemistry",
    title: "Applied Chemistry Sessional Assessment",
    examDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    syllabusScope: "Unit 1: Atomic Structure & Unit 2: Electrochemistry",
    preparationStatus: "NOT_STARTED",
    subjectName: "Applied Chemistry",
    subjectColor: "#06b6d4",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export class ExamRepository {
  private static get client() {
    return createClient();
  }

  static async listByUser(userId: string, isDemo = false): Promise<Exam[]> {
    if (isDemo) return DEMO_EXAMS;

    try {
      const supabase = this.client;
      const { data, error } = await supabase
        .from("exams")
        .select("*, subjects(name, color)")
        .eq("user_id", userId)
        .order("exam_date", { ascending: true });

      if (error || !data || (data as unknown[]).length === 0) {
        return [];
      }

      const rows = data as unknown as Array<{
        id: string;
        user_id: string;
        subject_id: string | null;
        title: string;
        exam_date: string;
        syllabus_scope: string | null;
        preparation_status: string;
        subjects: { name?: string; color?: string } | null;
        created_at: string;
        updated_at: string;
      }>;

      return rows.map((item) => ({
        id: item.id,
        userId: item.user_id,
        subjectId: item.subject_id,
        title: item.title,
        examDate: item.exam_date,
        syllabusScope: item.syllabus_scope,
        preparationStatus: item.preparation_status as Exam["preparationStatus"],
        subjectName: item.subjects?.name,
        subjectColor: item.subjects?.color || "#3b82f6",
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      }));
    } catch {
      return [];
    }
  }

  static async create(userId: string, input: ExamInput): Promise<Exam | null> {
    try {
      const supabase = this.client;
      const { data, error } = await supabase
        .from("exams")
        .insert({
          user_id: userId,
          subject_id: input.subjectId || null,
          title: input.title,
          exam_date: input.examDate,
          syllabus_scope: input.syllabusScope || null,
          preparation_status: input.preparationStatus || "NOT_STARTED",
        })
        .select()
        .single();

      if (error || !data) return null;

      const row = data as unknown as {
        id: string;
        user_id: string;
        subject_id: string | null;
        title: string;
        exam_date: string;
        syllabus_scope: string | null;
        preparation_status: string;
        created_at: string;
        updated_at: string;
      };

      return {
        id: row.id,
        userId: row.user_id,
        subjectId: row.subject_id,
        title: row.title,
        examDate: row.exam_date,
        syllabusScope: row.syllabus_scope,
        preparationStatus: row.preparation_status as Exam["preparationStatus"],
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      };
    } catch {
      return null;
    }
  }
}
