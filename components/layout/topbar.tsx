"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  Bell,
  Sparkles,
  User,
  LogOut,
  Settings,
  Flame,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth/context";

export interface TopBarProps {
  onOpenMobileNav: () => void;
}

export function TopBar({ onOpenMobileNav }: TopBarProps) {
  const router = useRouter();
  const { profile, logout, isDemoMode, loginAsDemo } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);
  const [todayFormatted, setTodayFormatted] = React.useState("Today");

  React.useEffect(() => {
    setTodayFormatted(
      new Date().toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    );
  }, []);

  const handleLogout = async () => {
    setShowProfileMenu(false);
    await logout();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border/80 bg-card/80 px-4 sm:px-6 backdrop-blur-md">
      {/* Left section: Mobile hamburger + Date greeting */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileNav}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted hover:text-foreground lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">{todayFormatted}</span>
          <span>•</span>
          <div className="flex items-center gap-1 text-amber-400 font-medium">
            <Flame className="h-3.5 w-3.5 fill-amber-400" />
            <span>3-Day Streak</span>
          </div>
        </div>
      </div>

      {/* Right section: Search trigger, Demo Toggle, Notifications, User menu */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {!isDemoMode && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={loginAsDemo}
            className="hidden md:flex items-center gap-1.5 text-xs text-indigo-400 border-indigo-500/30 hover:bg-indigo-500/10"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Load BCA Demo Persona</span>
          </Button>
        )}

        {isDemoMode && (
          <Badge variant="outline" className="hidden sm:inline-flex text-[11px] border-amber-500/40 text-amber-300 bg-amber-500/10">
            Demo Student Mode
          </Badge>
        )}

        <Link
          href="/calendar"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          title="Notifications & Deadlines"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary ring-2 ring-card" />
        </Link>

        {/* User Dropdown Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowProfileMenu((prev) => !prev)}
            className="flex items-center gap-2 rounded-full ring-2 ring-border/80 hover:ring-primary transition-all focus:outline-none"
            aria-expanded={showProfileMenu}
          >
            <Avatar name={profile?.name || "Student"} size="sm" />
          </button>

          {showProfileMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowProfileMenu(false)}
              />
              <div className="absolute right-0 top-11 z-50 w-56 rounded-xl border border-border bg-card p-2 shadow-xl animate-in fade-in-50 zoom-in-95">
                <div className="px-3 py-2 border-b border-border/50 mb-1">
                  <p className="text-xs font-bold text-foreground">
                    {profile?.name || "Student User"}
                  </p>
                  <p className="text-[11px] text-muted-foreground truncate">
                    {profile?.email || "student@studyos.local"}
                  </p>
                </div>

                <Link
                  href="/settings"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2.5 rounded-md px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <User className="h-3.5 w-3.5" />
                  <span>Academic Profile</span>
                </Link>

                <Link
                  href="/settings"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2.5 rounded-md px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <Settings className="h-3.5 w-3.5" />
                  <span>System Preferences</span>
                </Link>

                <div className="border-t border-border/50 my-1" />

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 rounded-md px-3 py-2 text-xs font-medium text-destructive hover:bg-destructive/10 text-left"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
