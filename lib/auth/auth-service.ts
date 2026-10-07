import { createClient } from "@/lib/supabase/client";
import type { LoginInput, SignupInput, ForgotPasswordInput } from "@/lib/validation/auth";

export interface AuthResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export class AuthService {
  private static get client() {
    return createClient();
  }

  /**
   * Signs in user with email and password
   */
  static async login(credentials: LoginInput): Promise<AuthResponse<{ userId: string; email: string }>> {
    try {
      const supabase = this.client;
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        return {
          success: false,
          error: error.message || "Invalid email or password",
        };
      }

      if (!data.user) {
        return {
          success: false,
          error: "No user returned from authentication",
        };
      }

      return {
        success: true,
        data: {
          userId: data.user.id,
          email: data.user.email || credentials.email,
        },
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : "An unexpected login error occurred";
      return { success: false, error: message };
    }
  }

  /**
   * Signs up a new student account
   */
  static async signup(payload: SignupInput): Promise<AuthResponse<{ userId: string; email: string }>> {
    try {
      const supabase = this.client;
      const { data, error } = await supabase.auth.signUp({
        email: payload.email,
        password: payload.password,
        options: {
          data: {
            name: payload.name,
            college: payload.college || null,
            course: payload.course || null,
            semester: payload.semester || null,
          },
        },
      });

      if (error) {
        return {
          success: false,
          error: error.message || "Could not complete signup",
        };
      }

      if (!data.user) {
        return {
          success: false,
          error: "No user account was created",
        };
      }

      return {
        success: true,
        data: {
          userId: data.user.id,
          email: data.user.email || payload.email,
        },
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : "An unexpected signup error occurred";
      return { success: false, error: message };
    }
  }

  /**
   * Logs out the current session
   */
  static async logout(): Promise<AuthResponse<void>> {
    try {
      const supabase = this.client;
      const { error } = await supabase.auth.signOut();
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : "An unexpected logout error occurred";
      return { success: false, error: message };
    }
  }

  /**
   * Initiates password recovery
   */
  static async forgotPassword(payload: ForgotPasswordInput): Promise<AuthResponse<void>> {
    try {
      const supabase = this.client;
      const redirectTo = typeof window !== "undefined"
        ? `${window.location.origin}/auth/callback?next=/settings`
        : undefined;

      const { error } = await supabase.auth.resetPasswordForEmail(payload.email, {
        redirectTo,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not send reset password email";
      return { success: false, error: message };
    }
  }
}
