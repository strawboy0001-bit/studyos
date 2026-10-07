"use client";

import * as React from "react";
import { User, School, BookOpen, Save, CheckCircle2, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth/context";
import { ProfileRepository } from "@/lib/data/profile-repository";

export default function SettingsPage() {
  const { user, profile, refreshProfile, isDemoMode } = useAuth();

  const [name, setName] = React.useState(profile?.name || "Surya Demo");
  const [college, setCollege] = React.useState(profile?.college || "National Institute of Technology");
  const [course, setCourse] = React.useState(profile?.course || "BCA");
  const [year, setYear] = React.useState(profile?.year ? String(profile.year) : "1");
  const [semester, setSemester] = React.useState(profile?.semester ? String(profile.semester) : "1");

  const [isSaving, setIsSaving] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);

  React.useEffect(() => {
    if (profile) {
      setName(profile.name);
      setCollege(profile.college || "");
      setCourse(profile.course || "");
      setYear(profile.year ? String(profile.year) : "1");
      setSemester(profile.semester ? String(profile.semester) : "1");
    }
  }, [profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setIsSaved(false);

    if (user && !isDemoMode) {
      await ProfileRepository.update(user.id, {
        name,
        college,
        course,
        year: parseInt(year, 10) || 1,
        semester: parseInt(semester, 10) || 1,
      });
      await refreshProfile();
    }

    setIsSaving(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl">
      <PageHeader
        title="Settings &amp; Academic Profile"
        description="Manage your college enrollment, degree program, and system preferences."
      />

      {isSaved && (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-400 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>Profile changes saved successfully.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <Card className="p-6 space-y-5">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2 pb-2 border-b border-border/50">
            <User className="h-4 w-4 text-primary" />
            <span>Personal Information</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Student Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              label="Email Address"
              value={profile?.email || user?.email || "demo.student@studyos.local"}
              disabled
              helperText="Email is managed via your authentication provider."
            />
          </div>
        </Card>

        <Card className="p-6 space-y-5">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2 pb-2 border-b border-border/50">
            <School className="h-4 w-4 text-indigo-400" />
            <span>Academic Affiliation</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Input
                label="College / University"
                placeholder="e.g. National Institute of Technology"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
              />
            </div>
            <Input
              label="Course / Degree Program"
              placeholder="e.g. BCA, B.Tech CS, BSc Chemistry"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Year"
                type="number"
                min={1}
                max={6}
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
              <Input
                label="Semester"
                type="number"
                min={1}
                max={12}
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-3 bg-card/60">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Data Security &amp; Privacy</span>
          </h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Your notes, quiz answers, and academic documents are secured using PostgreSQL Row Level Security. No other student or external entity can query your records.
          </p>
        </Card>

        <div className="flex justify-end gap-3">
          <Button type="submit" variant="gradient" isLoading={isSaving} className="gap-2">
            <Save className="h-4 w-4" />
            <span>Save Profile</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
