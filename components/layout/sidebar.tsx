"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  CheckSquare,
  Calendar,
  Layers,
  HelpCircle,
  GraduationCap,
  Sparkles,
  Clock,
  Settings,
  LogOut,
  BrainCircuit,
  ChevronRight,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth/context";
import { cn } from "@/lib/utilities/cn";

export const NAV_ITEMS = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Subjects",
    href: "/subjects",
    icon: BookOpen,
  },
  {
    name: "Notes",
    href: "/notes",
    icon: FileText,
  },
  {
    name: "Assignments",
    href: "/assignments",
    icon: CheckSquare,
  },
  {
    name: "Calendar",
    href: "/calendar",
    icon: Calendar,
  },
  {
    name: "Flashcards",
    href: "/flashcards",
    icon: Layers,
  },
  {
    name: "Quizzes",
    href: "/quizzes",
    icon: HelpCircle,
  },
  {
    name: "Exam Prep",
    href: "/exams",
    icon: GraduationCap,
  },
  {
    name: "Study Planner",
    href: "/planner",
    icon: Clock,
  },
  {
    name: "AI Assistant",
    href: "/assistant",
    icon: Sparkles,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const { profile, logout, isDemoMode } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <aside
      className={cn(
        "flex h-full w-64 flex-col justify-between border-r border-border/80 bg-card/90 backdrop-blur-md select-none",
        className
      )}
    >
      {/* Brand Header */}
      <div className="flex flex-col space-y-4 p-5 pb-2">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20 ring-1 ring-white/20 group-hover:scale-105 transition-transform">
            <BrainCircuit className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-extrabold tracking-tight text-foreground">
                StudyOS
              </span>
              <Badge variant="default" className="px-1.5 py-0 text-[10px] font-bold">
                v1.0
              </Badge>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Academic Operating System
            </p>
          </div>
        </Link>
      </div>

      {/* Main Navigation Items */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
        <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">
          Core Workspace
        </div>
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-primary/15 text-primary font-semibold shadow-xs"
                  : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={cn(
                    "h-4 w-4 transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground group-hover:text-foreground"
                  )}
                />
                <span>{item.name}</span>
              </div>
              {isActive && <ChevronRight className="h-3.5 w-3.5 text-primary/70" />}
            </Link>
          );
        })}
      </div>

      {/* Footer Profile Menu & Logout */}
      <div className="p-3 border-t border-border/60 bg-card/50">
        {isDemoMode && (
          <div className="mb-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 px-2.5 py-1.5 text-center">
            <span className="text-[11px] font-semibold text-amber-400">
              Demo Persona Active
            </span>
          </div>
        )}

        <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-muted/40 border border-border/40">
          <Link
            href="/settings"
            className="flex items-center gap-2.5 min-w-0 flex-1 hover:opacity-80 transition-opacity"
          >
            <Avatar name={profile?.name || "Student"} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-foreground truncate">
                {profile?.name || "Student User"}
              </p>
              <p className="text-[10px] text-muted-foreground truncate">
                {profile?.course ? `${profile.course} • Sem ${profile.semester || 1}` : profile?.email || "Academic Account"}
              </p>
            </div>
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            title="Log out of StudyOS"
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/15 hover:text-destructive transition-colors shrink-0"
          >
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Log Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
