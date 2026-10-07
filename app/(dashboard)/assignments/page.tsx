"use client";

import * as React from "react";
import { Plus, CheckSquare, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { AssignmentCard } from "@/components/domain/assignment-card";
import { EmptyState } from "@/components/shared/empty-state";
import { LoadingState } from "@/components/shared/loading-state";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useAuth } from "@/lib/auth/context";
import { AssignmentRepository } from "@/lib/data/assignment-repository";
import { SubjectRepository } from "@/lib/data/subject-repository";
import type { Assignment, Subject } from "@/types/domain";

export default function AssignmentsPage() {
  const { user, isDemoMode } = useAuth();
  const [assignments, setAssignments] = React.useState<Assignment[]>([]);
  const [subjects, setSubjects] = React.useState<Subject[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState<number>(0);

  // Form state
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [subjectId, setSubjectId] = React.useState("");
  const [deadline, setDeadline] = React.useState("");
  const [priority, setPriority] = React.useState<"HIGH" | "MEDIUM" | "LOW">("MEDIUM");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    setCurrentTime(Date.now());
  }, []);

  const fetchAssignments = React.useCallback(async () => {
    setIsLoading(true);
    const activeUserId = user?.id || "00000000-0000-0000-0000-000000000001";
    const [assignData, subjectsData] = await Promise.all([
      AssignmentRepository.listByUser(activeUserId, isDemoMode),
      SubjectRepository.listByUser(activeUserId, isDemoMode),
    ]);
    setAssignments(assignData);
    setSubjects(subjectsData);
    if (subjectsData.length > 0 && !subjectId) {
      setSubjectId(subjectsData[0].id);
    }
    setIsLoading(false);
  }, [user, isDemoMode, subjectId]);

  React.useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  const handleStatusChange = (assignmentId: string, status: Assignment["status"]) => {
    setAssignments((prev) =>
      prev.map((a) => (a.id === assignmentId ? { ...a, status } : a))
    );
  };

  const handleCreateAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !deadline) return;

    setIsSubmitting(true);
    const activeUserId = user?.id || "00000000-0000-0000-0000-000000000001";
    const sub = subjects.find((s) => s.id === subjectId);

    const newAssign = await AssignmentRepository.create(activeUserId, {
      title: title.trim(),
      description: description.trim() || undefined,
      subjectId: subjectId || undefined,
      deadline: new Date(deadline).toISOString(),
      priority,
      status: "NOT_STARTED",
    });

    if (newAssign) {
      setAssignments((prev) => [
        { ...newAssign, subjectName: sub?.name, subjectColor: sub?.color },
        ...prev,
      ]);
    } else {
      setAssignments((prev) => [
        {
          id: `assign-${Date.now()}`,
          userId: activeUserId,
          subjectId: subjectId || null,
          title: title.trim(),
          description: description.trim() || null,
          deadline: new Date(deadline).toISOString(),
          priority,
          status: "NOT_STARTED",
          subjectName: sub?.name || "General",
          subjectColor: sub?.color || "#6366f1",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        ...prev,
      ]);
    }

    setTitle("");
    setDescription("");
    setDeadline("");
    setIsSubmitting(false);
    setIsDialogOpen(false);
  };

  const dueSoonList = assignments.filter((a) => {
    if (!currentTime) return false;
    const time = new Date(a.deadline).getTime();
    return a.status !== "COMPLETED" && time >= currentTime && time <= currentTime + 3 * 24 * 60 * 60 * 1000;
  });

  const overdueList = assignments.filter((a) => {
    if (!currentTime) return false;
    const time = new Date(a.deadline).getTime();
    return a.status !== "COMPLETED" && time < currentTime;
  });

  const completedList = assignments.filter((a) => a.status === "COMPLETED");
  const pendingList = assignments.filter((a) => a.status !== "COMPLETED");

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <PageHeader
        title="Assignments &amp; Deadlines"
        description="Track academic deliverables, problem sets, and lab reports by urgency."
      >
        <Button
          onClick={() => setIsDialogOpen(true)}
          variant="gradient"
          size="sm"
          className="gap-1.5"
        >
          <Plus className="h-4 w-4" />
          <span>New Assignment</span>
        </Button>
      </PageHeader>

      {isLoading ? (
        <LoadingState type="cards" count={3} />
      ) : (
        <Tabs defaultValue="all">
          <TabsList className="flex flex-wrap h-auto gap-1">
            <TabsTrigger value="all" count={pendingList.length}>
              Pending Tasks
            </TabsTrigger>
            <TabsTrigger value="due-soon" count={dueSoonList.length}>
              Due Soon
            </TabsTrigger>
            <TabsTrigger value="overdue" count={overdueList.length}>
              Overdue
            </TabsTrigger>
            <TabsTrigger value="completed" count={completedList.length}>
              Completed
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="pt-2">
            {pendingList.length === 0 ? (
              <EmptyState
                icon={CheckSquare}
                title="No pending assignments"
                description="You are completely caught up! Add a new task or lab report to stay ahead."
                actionLabel="Create Assignment"
                onAction={() => setIsDialogOpen(true)}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {pendingList.map((a) => (
                  <AssignmentCard
                    key={a.id}
                    assignment={a}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="due-soon" className="pt-2">
            {dueSoonList.length === 0 ? (
              <EmptyState
                icon={Clock}
                title="No tasks due in the next 3 days"
                description="No immediate deadlines looming. Perfect time to review weak topics!"
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {dueSoonList.map((a) => (
                  <AssignmentCard
                    key={a.id}
                    assignment={a}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="overdue" className="pt-2">
            {overdueList.length === 0 ? (
              <EmptyState
                icon={AlertTriangle}
                title="Zero overdue assignments"
                description="Great job staying on top of your deadlines!"
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {overdueList.map((a) => (
                  <AssignmentCard
                    key={a.id}
                    assignment={a}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="pt-2">
            {completedList.length === 0 ? (
              <EmptyState
                icon={CheckCircle2}
                title="No completed assignments yet"
                description="Mark assignments as done when submitted to see them listed here."
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {completedList.map((a) => (
                  <AssignmentCard
                    key={a.id}
                    assignment={a}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}

      {/* Create Assignment Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogHeader>
          <DialogTitle>Create Assignment Deadline</DialogTitle>
          <DialogDescription>
            Record submission details, due date, and priority level.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleCreateAssignment} className="space-y-4 py-2">
          <Input
            label="Assignment Title"
            placeholder="e.g. Lab Report 2: Titration Curves"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            {subjects.length > 0 ? (
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Subject
                </label>
                <select
                  value={subjectId}
                  onChange={(e) => setSubjectId(e.target.value)}
                  className="h-10 w-full rounded-lg border border-input bg-card/60 px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                >
                  {subjects.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <Input label="Subject" placeholder="General" disabled />
            )}

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as "HIGH" | "MEDIUM" | "LOW")}
                className="h-10 w-full rounded-lg border border-input bg-card/60 px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              >
                <option value="HIGH">HIGH Priority</option>
                <option value="MEDIUM">MEDIUM Priority</option>
                <option value="LOW">LOW Priority</option>
              </select>
            </div>
          </div>

          <Input
            label="Due Date &amp; Time"
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />

          <Textarea
            label="Description / Instructions (Optional)"
            placeholder="Enter instructions, questions to solve, or format criteria…"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="gradient" isLoading={isSubmitting}>
              Save Assignment
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
}
