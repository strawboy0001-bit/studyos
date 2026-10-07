import { createClient } from "@/lib/supabase/client";
import type { UserProfile } from "@/types/domain";
import type { UpdateProfileInput } from "@/lib/validation/auth";

export class ProfileRepository {
  private static get client() {
    return createClient();
  }

  static async getById(userId: string): Promise<UserProfile | null> {
    const supabase = this.client;
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error || !data) return null;

    const row = data as unknown as {
      id: string;
      name: string;
      email: string;
      college: string | null;
      course: string | null;
      year: number | null;
      semester: number | null;
      created_at: string;
      updated_at: string;
    };

    return {
      id: row.id,
      name: row.name,
      email: row.email,
      college: row.college,
      course: row.course,
      year: row.year,
      semester: row.semester,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  static async update(userId: string, input: UpdateProfileInput): Promise<UserProfile | null> {
    const supabase = this.client;
    const { data, error } = await supabase
      .from("profiles")
      .update({
        name: input.name,
        college: input.college || null,
        course: input.course || null,
        year: input.year || null,
        semester: input.semester || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)
      .select()
      .single();

    if (error || !data) return null;

    const row = data as unknown as {
      id: string;
      name: string;
      email: string;
      college: string | null;
      course: string | null;
      year: number | null;
      semester: number | null;
      created_at: string;
      updated_at: string;
    };

    return {
      id: row.id,
      name: row.name,
      email: row.email,
      college: row.college,
      course: row.course,
      year: row.year,
      semester: row.semester,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}
