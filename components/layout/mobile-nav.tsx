"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  BrainCircuit,
  LayoutDashboard,
  BookOpen,
  FileText,
  CheckSquare,
  Sparkles,
  Layers,
  GraduationCap,
  Calendar,
  Clock,
  Settings,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { NAV_ITEMS } from "@/components/layout/sidebar";
import { cn } from "@/lib/utilities/cn";

export interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col justify-between border-r border-border bg-card p-5 shadow-2xl animate-in slide-in-from-left duration-200">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-border/60">
            <Link
              href="/dashboard"
              onClick={onClose}
              className="flex items-center gap-2.5"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-sm">
                <BrainCircuit className="h-4 w-4" />
              </div>
              <span className="text-base font-bold text-foreground">StudyOS</span>
              <Badge variant="default" className="text-[10px] py-0 px-1.5">v1.0</Badge>
            </Link>
            <button
              onClick={onClose}
              className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Links */}
          <nav className="mt-4 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
            {NAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/15 text-primary font-semibold"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-border/60 text-center">
          <p className="text-[11px] text-muted-foreground">
            StudyOS • Academic Operating System
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Mobile Bottom Quick Bar for quick thumb navigation
 */
export function MobileBottomBar() {
  const pathname = usePathname();

  const primaryMobileTabs = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Subjects", href: "/subjects", icon: BookOpen },
    { name: "Notes", href: "/notes", icon: FileText },
    { name: "Tasks", href: "/assignments", icon: CheckSquare },
    { name: "Assistant", href: "/assistant", icon: Sparkles },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t border-border/80 bg-card/95 px-2 backdrop-blur-md lg:hidden">
      {primaryMobileTabs.map((tab) => {
        const isActive =
          pathname === tab.href ||
          (tab.href !== "/dashboard" && pathname.startsWith(tab.href));
        const Icon = tab.icon;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 px-3 py-1 text-[10px] font-medium transition-colors",
              isActive ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground")} />
            <span>{tab.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
