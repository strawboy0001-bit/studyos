export type PriorityLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export type AssignmentStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'SUBMITTED' | 'COMPLETED';

export type ExamPreparationStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'READY';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  college: string | null;
  course: string | null;
  year: number | null;
  semester: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface Subject {
  id: string;
  userId: string;
  name: string;
  code?: string | null;
  color: string;
  semester?: number | null;
  isArchived: boolean;
  topicCount?: number;
  noteCount?: number;
  assignmentCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Topic {
  id: string;
  subjectId: string;
  userId: string;
  name: string;
  unit?: string | null;
  importance: PriorityLevel;
  currentPriority: PriorityLevel;
  quizAccuracy: number;
  confidenceLevel: number;
  subjectName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Note {
  id: string;
  userId: string;
  subjectId?: string | null;
  topicId?: string | null;
  title: string;
  content: string;
  tags: string[];
  isPinned: boolean;
  subjectName?: string;
  topicName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Assignment {
  id: string;
  userId: string;
  subjectId?: string | null;
  title: string;
  description?: string | null;
  deadline: string;
  priority: PriorityLevel;
  status: AssignmentStatus;
  subjectName?: string;
  subjectColor?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Exam {
  id: string;
  userId: string;
  subjectId?: string | null;
  title: string;
  examDate: string;
  syllabusScope?: string | null;
  preparationStatus: ExamPreparationStatus;
  subjectName?: string;
  subjectColor?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NextActionRecommendation {
  action: string;
  subject: string;
  topic: string;
  reason: string;
  estimatedMinutes: number;
  priority: PriorityLevel;
  sourceContext?: string;
  actionUrl?: string;
}

export interface AIInsight {
  id: string;
  userId: string;
  category: 'RECOMMENDATION' | 'WEAK_TOPIC' | 'EXAM_WARNING' | 'PROGRESS';
  title: string;
  content: string;
  priority: PriorityLevel;
  actionLabel?: string | null;
  actionUrl?: string | null;
  isRead: boolean;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  type: 'DEADLINE' | 'EXAM' | 'RECOMMENDATION' | 'SYSTEM';
  title: string;
  message: string;
  link?: string | null;
  isRead: boolean;
  createdAt: string;
}
