import { createClient } from "@/lib/supabase/client";
import type { Note } from "@/types/domain";
import type { NoteInput } from "@/lib/validation/academic";

const DEMO_NOTES: Note[] = [
  {
    id: "note-loops-c",
    userId: "00000000-0000-0000-0000-000000000001",
    subjectId: "sub-c-programming",
    topicId: "topic-loops",
    title: "Control Flow: While, Do-While, and For Loops",
    content:
      "A comprehensive summary of iteration constructs in C programming. For loop is counter-controlled whereas while is condition-controlled. Always check loop boundary termination to avoid infinite loops and off-by-one errors.",
    tags: ["loops", "c-lang", "control-flow"],
    isPinned: true,
    subjectName: "C Programming",
    topicName: "Loops and Iterations",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "note-bohr-model",
    userId: "00000000-0000-0000-0000-000000000001",
    subjectId: "sub-chemistry",
    topicId: "topic-atomic",
    title: "Bohr Model and Quantum Numbers",
    content:
      "Notes covering principal quantum number (n), azimuthal (l), magnetic (m), and spin (s). Explains Pauli exclusion principle, Aufbau principle, and Hund's rule for electron configuration.",
    tags: ["chemistry", "atomic-structure"],
    isPinned: false,
    subjectName: "Applied Chemistry",
    topicName: "Atomic Structure & Bonding",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export class NoteRepository {
  private static get client() {
    return createClient();
  }

  static async listByUser(userId: string, isDemo = false): Promise<Note[]> {
    if (isDemo) return DEMO_NOTES;

    try {
      const supabase = this.client;
      const { data, error } = await supabase
        .from("notes")
        .select("*, subjects(name), topics(name)")
        .eq("user_id", userId)
        .order("is_pinned", { ascending: false })
        .order("created_at", { ascending: false });

      if (error || !data || (data as unknown[]).length === 0) {
        return [];
      }

      const rows = data as unknown as Array<{
        id: string;
        user_id: string;
        subject_id: string | null;
        topic_id: string | null;
        title: string;
        content: string;
        tags: string[];
        is_pinned: boolean;
        subjects: { name?: string } | null;
        topics: { name?: string } | null;
        created_at: string;
        updated_at: string;
      }>;

      return rows.map((item) => ({
        id: item.id,
        userId: item.user_id,
        subjectId: item.subject_id,
        topicId: item.topic_id,
        title: item.title,
        content: item.content || "",
        tags: item.tags || [],
        isPinned: item.is_pinned,
        subjectName: item.subjects?.name,
        topicName: item.topics?.name,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      }));
    } catch {
      return [];
    }
  }

  static async create(userId: string, input: NoteInput): Promise<Note | null> {
    try {
      const supabase = this.client;
      const { data, error } = await supabase
        .from("notes")
        .insert({
          user_id: userId,
          subject_id: input.subjectId || null,
          topic_id: input.topicId || null,
          title: input.title,
          content: input.content || "",
          tags: input.tags || [],
          is_pinned: input.isPinned || false,
        })
        .select()
        .single();

      if (error || !data) return null;

      const row = data as unknown as {
        id: string;
        user_id: string;
        subject_id: string | null;
        topic_id: string | null;
        title: string;
        content: string;
        tags: string[];
        is_pinned: boolean;
        created_at: string;
        updated_at: string;
      };

      return {
        id: row.id,
        userId: row.user_id,
        subjectId: row.subject_id,
        topicId: row.topic_id,
        title: row.title,
        content: row.content,
        tags: row.tags,
        isPinned: row.is_pinned,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      };
    } catch {
      return null;
    }
  }
}
