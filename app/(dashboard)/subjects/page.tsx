"use client";

import * as React from "react";
import { Plus, BookOpen, Search, Filter } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { SubjectCard } from "@/components/domain/subject-card";
import { EmptyState } from "@/components/shared/empty-state";
import { LoadingState } from "@/components/shared/loading-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useAuth } from "@/lib/auth/context";
import { SubjectRepository } from "@/lib/data/subject-repository";
import type { Subject } from "@/types/domain";

export default function SubjectsPage() {
  const { user, isDemoMode } = useAuth();
  const [subjects, setSubjects] = React.useState<Subject[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  // New Subject form state
  const [name, setName] = React.useState("");
  const [code, setCode] = React.useState("");
  const [color, setColor] = React.useState("#6366f1");
  const [semester, setSemester] = React.useState("1");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const fetchSubjects = React.useCallback(async () => {
    setIsLoading(true);
    const activeUserId = user?.id || "00000000-0000-0000-0000-000000000001";
    const data = await SubjectRepository.listByUser(activeUserId, isDemoMode);
    setSubjects(data);
    setIsLoading(false);
  }, [user, isDemoMode]);

  React.useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  const handleCreateSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    const activeUserId = user?.id || "00000000-0000-0000-0000-000000000001";

    const newSub = await SubjectRepository.create(activeUserId, {
      name: name.trim(),
      code: code.trim() || undefined,
      color,
      semester: parseInt(semester, 10) || 1,
    });

    if (newSub) {
      setSubjects((prev) => [newSub, ...prev]);
    } else {
      // Local fallback append for offline demo mode
      setSubjects((prev) => [
        {
          id: `sub-${Date.now()}`,
          userId: activeUserId,
          name,
          code: code || "CS000",
          color,
          semester: parseInt(semester, 10) || 1,
          isArchived: false,
          topicCount: 0,
          noteCount: 0,
          assignmentCount: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        ...prev,
      ]);
    }

    setName("");
    setCode("");
    setIsSubmitting(false);
    setIsDialogOpen(false);
  };

  const filteredSubjects = subjects.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.code && s.code.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <PageHeader
        title="Academic Subjects"
        description="Manage your semester course units, syllabus topics, and learning materials."
      >
        <Button
          onClick={() => setIsDialogOpen(true)}
          variant="gradient"
          size="sm"
          className="gap-1.5"
        >
          <Plus className="h-4 w-4" />
          <span>Add Subject</span>
        </Button>
      </PageHeader>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search subjects or codes…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-full rounded-lg border border-border bg-card/60 pl-9 pr-3 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <LoadingState type="cards" count={3} />
      ) : filteredSubjects.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title={searchQuery ? "No matching subjects found" : "No subjects added yet"}
          description={
            searchQuery
              ? "Try adjusting your search keywords."
              : "Add your first subject to start building your academic workspace and syllabus topics."
          }
          actionLabel="Add First Subject"
          onAction={() => setIsDialogOpen(true)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSubjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      )}

      {/* Add Subject Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogHeader>
          <DialogTitle>Add Academic Subject</DialogTitle>
          <DialogDescription>
            Enter the subject name, course code, and semester details.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleCreateSubject} className="space-y-4 py-2">
          <Input
            label="Subject Name"
            placeholder="e.g. Data Structures &amp; Algorithms"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Course Code"
              placeholder="e.g. CS201"
              value={code}
              onChange={(e) => setCode(e.target.value)}
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

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Color Tag
            </label>
            <div className="flex items-center gap-2">
              {["#6366f1", "#06b6d4", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`h-7 w-7 rounded-full border-2 transition-transform ${
                    color === c ? "scale-110 border-white" : "border-transparent"
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="gradient" isLoading={isSubmitting}>
              Save Subject
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
}
