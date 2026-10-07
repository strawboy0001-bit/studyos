import { z } from "zod";

export const subjectSchema = z.object({
  name: z.string().min(1, { message: "Subject name is required" }).max(120),
  code: z.string().max(20).optional().nullable(),
  color: z.string().regex(/^#([0-9a-fA-F]{3}){1,2}$/, { message: "Invalid hex color" }).default("#3b82f6").optional(),
  semester: z.coerce.number().min(1).max(12).optional().nullable(),
});

export const noteSchema = z.object({
  title: z.string().min(1, { message: "Note title is required" }).max(200),
  subjectId: z.string().uuid().optional().nullable(),
  topicId: z.string().uuid().optional().nullable(),
  content: z.string().default("").optional(),
  tags: z.array(z.string()).default([]).optional(),
  isPinned: z.boolean().default(false).optional(),
});

export const assignmentSchema = z.object({
  title: z.string().min(1, { message: "Assignment title is required" }).max(200),
  subjectId: z.string().uuid().optional().nullable(),
  description: z.string().optional().nullable(),
  deadline: z.string().min(1, { message: "Deadline is required" }),
  priority: z.enum(["HIGH", "MEDIUM", "LOW"]).default("MEDIUM").optional(),
  status: z.enum(["NOT_STARTED", "IN_PROGRESS", "SUBMITTED", "COMPLETED"]).default("NOT_STARTED").optional(),
});

export const examSchema = z.object({
  title: z.string().min(1, { message: "Exam title is required" }).max(200),
  subjectId: z.string().uuid().optional().nullable(),
  examDate: z.string().min(1, { message: "Exam date is required" }),
  syllabusScope: z.string().optional().nullable(),
  preparationStatus: z.enum(["NOT_STARTED", "IN_PROGRESS", "READY"]).default("NOT_STARTED").optional(),
});

export type SubjectInput = z.infer<typeof subjectSchema>;
export type NoteInput = z.infer<typeof noteSchema>;
export type AssignmentInput = z.infer<typeof assignmentSchema>;
export type ExamInput = z.infer<typeof examSchema>;
