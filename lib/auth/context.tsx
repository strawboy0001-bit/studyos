"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import type { UserProfile } from "@/types/domain";

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isDemoMode: boolean;
  loginAsDemo: () => void;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_PROFILE: UserProfile = {
  id: "00000000-0000-0000-0000-000000000001",
  name: "Surya Demo",
  email: "demo.student@studyos.local",
  college: "National Institute of Technology",
  course: "BCA",
  year: 1,
  semester: 1,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);

  const supabase = createClient();

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (!error && data) {
        setProfile({
          id: data.id,
          name: data.name,
          email: data.email,
          college: data.college,
          course: data.course,
          year: data.year,
          semester: data.semester,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        });
      }
    } catch {
      // Fallback
    }
  };

  const loginAsDemo = () => {
    setIsDemoMode(true);
    setProfile(DEMO_PROFILE);
    setUser({
      id: DEMO_PROFILE.id,
      email: DEMO_PROFILE.email,
      app_metadata: {},
      user_metadata: { name: DEMO_PROFILE.name },
      aud: "authenticated",
      created_at: new Date().toISOString(),
    } as User);
    setIsLoading(false);
  };

  useEffect(() => {
    // Check if running in browser
    const initAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          setUser(session.user);
          await fetchProfile(session.user.id);
        } else {
          // Check local storage for demo mode persistence
          const savedDemo = typeof window !== "undefined" && localStorage.getItem("studyos_demo_auth") === "true";
          if (savedDemo) {
            loginAsDemo();
          }
        }
      } catch {
        // Fallback for offline / dev preview
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        setIsDemoMode(false);
        if (typeof window !== "undefined") localStorage.removeItem("studyos_demo_auth");
        await fetchProfile(session.user.id);
      } else if (!isDemoMode) {
        setUser(null);
        setProfile(null);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    setIsLoading(true);
    if (isDemoMode) {
      setIsDemoMode(false);
      if (typeof window !== "undefined") localStorage.removeItem("studyos_demo_auth");
      setUser(null);
      setProfile(null);
      setIsLoading(false);
      return;
    }

    try {
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isLoading,
        isDemoMode,
        loginAsDemo,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
