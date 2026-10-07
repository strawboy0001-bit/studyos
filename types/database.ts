export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
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
        Insert: {
          id: string;
          name: string;
          email: string;
          college?: string | null;
          course?: string | null;
          year?: number | null;
          semester?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          college?: string | null;
          course?: string | null;
          year?: number | null;
          semester?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      subjects: {
        Row: {
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
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          code?: string | null;
          color?: string | null;
          semester?: number | null;
          is_archived?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          code?: string | null;
          color?: string | null;
          semester?: number | null;
          is_archived?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "subjects_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      topics: {
        Row: {
          id: string;
          subject_id: string;
          user_id: string;
          name: string;
          unit: string | null;
          importance: string;
          current_priority: string;
          quiz_accuracy: number;
          confidence_level: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          subject_id: string;
          user_id: string;
          name: string;
          unit?: string | null;
          importance?: string;
          current_priority?: string;
          quiz_accuracy?: number;
          confidence_level?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          subject_id?: string;
          user_id?: string;
          name?: string;
          unit?: string | null;
          importance?: string;
          current_priority?: string;
          quiz_accuracy?: number;
          confidence_level?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "topics_subject_id_fkey";
            columns: ["subject_id"];
            isOneToOne: false;
            referencedRelation: "subjects";
            referencedColumns: ["id"];
          }
        ];
      };
      notes: {
        Row: {
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
        Insert: {
          id?: string;
          user_id: string;
          subject_id?: string | null;
          topic_id?: string | null;
          title: string;
          content?: string;
          tags?: string[];
          is_pinned?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          subject_id?: string | null;
          topic_id?: string | null;
          title?: string;
          content?: string;
          tags?: string[];
          is_pinned?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      note_files: {
        Row: {
          id: string;
          note_id: string | null;
          user_id: string;
          file_name: string;
          file_type: string;
          file_size: number;
          storage_path: string;
          extracted_text: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          note_id?: string | null;
          user_id: string;
          file_name: string;
          file_type: string;
          file_size: number;
          storage_path: string;
          extracted_text?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          note_id?: string | null;
          user_id?: string;
          file_name?: string;
          file_type?: string;
          file_size?: number;
          storage_path?: string;
          extracted_text?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      assignments: {
        Row: {
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
        Insert: {
          id?: string;
          user_id: string;
          subject_id?: string | null;
          title: string;
          description?: string | null;
          deadline: string;
          priority?: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          subject_id?: string | null;
          title?: string;
          description?: string | null;
          deadline?: string;
          priority?: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      exams: {
        Row: {
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
        Insert: {
          id?: string;
          user_id: string;
          subject_id?: string | null;
          title: string;
          exam_date: string;
          syllabus_scope?: string | null;
          preparation_status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          subject_id?: string | null;
          title?: string;
          exam_date?: string;
          syllabus_scope?: string | null;
          preparation_status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      flashcard_decks: {
        Row: {
          id: string;
          user_id: string;
          subject_id: string | null;
          topic_id: string | null;
          title: string;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          subject_id?: string | null;
          topic_id?: string | null;
          title: string;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          subject_id?: string | null;
          topic_id?: string | null;
          title?: string;
          description?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      flashcards: {
        Row: {
          id: string;
          deck_id: string;
          user_id: string;
          card_type: string;
          front: string;
          back: string;
          confidence_score: number;
          last_reviewed_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          deck_id: string;
          user_id: string;
          card_type?: string;
          front: string;
          back: string;
          confidence_score?: number;
          last_reviewed_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          deck_id?: string;
          user_id?: string;
          card_type?: string;
          front?: string;
          back?: string;
          confidence_score?: number;
          last_reviewed_at?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      quizzes: {
        Row: {
          id: string;
          user_id: string;
          subject_id: string | null;
          topic_id: string | null;
          title: string;
          question_count: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          subject_id?: string | null;
          topic_id?: string | null;
          title: string;
          question_count?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          subject_id?: string | null;
          topic_id?: string | null;
          title?: string;
          question_count?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      quiz_questions: {
        Row: {
          id: string;
          quiz_id: string;
          user_id: string;
          topic_id: string | null;
          question_text: string;
          question_type: string;
          options: Json;
          correct_answer: string;
          explanation: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          quiz_id: string;
          user_id: string;
          topic_id?: string | null;
          question_text: string;
          question_type?: string;
          options?: Json;
          correct_answer: string;
          explanation?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          quiz_id?: string;
          user_id?: string;
          topic_id?: string | null;
          question_text?: string;
          question_type?: string;
          options?: Json;
          correct_answer?: string;
          explanation?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      quiz_attempts: {
        Row: {
          id: string;
          quiz_id: string;
          user_id: string;
          score: number;
          total_questions: number;
          answers: Json;
          completed_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          quiz_id: string;
          user_id: string;
          score: number;
          total_questions: number;
          answers?: Json;
          completed_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          quiz_id?: string;
          user_id?: string;
          score?: number;
          total_questions?: number;
          answers?: Json;
          completed_at?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      study_sessions: {
        Row: {
          id: string;
          user_id: string;
          subject_id: string | null;
          topic_id: string | null;
          duration_minutes: number;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          subject_id?: string | null;
          topic_id?: string | null;
          duration_minutes: number;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          subject_id?: string | null;
          topic_id?: string | null;
          duration_minutes?: number;
          notes?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      study_plans: {
        Row: {
          id: string;
          user_id: string;
          plan_date: string;
          available_minutes: number;
          items: Json;
          is_completed: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          plan_date: string;
          available_minutes: number;
          items?: Json;
          is_completed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          plan_date?: string;
          available_minutes?: number;
          items?: Json;
          is_completed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      ai_insights: {
        Row: {
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
        };
        Insert: {
          id?: string;
          user_id: string;
          category: string;
          title: string;
          content: string;
          priority?: string;
          action_label?: string | null;
          action_url?: string | null;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          category?: string;
          title?: string;
          content?: string;
          priority?: string;
          action_label?: string | null;
          action_url?: string | null;
          is_read?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          title: string;
          message: string;
          link: string | null;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: string;
          title: string;
          message: string;
          link?: string | null;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: string;
          title?: string;
          message?: string;
          link?: string | null;
          is_read?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
