/**
 * @teacher/types - Shared TypeScript types for teacher.ac.pk
 */

// ============================================================================
// User & Auth Types
// ============================================================================

export type UserRole = 
  | 'STUDENT'
  | 'TEACHER'
  | 'CONTENT_AUTHOR'
  | 'REVIEWER'
  | 'INSTITUTION_ADMIN'
  | 'PLATFORM_ADMIN'
  | 'PARENT';

export interface User {
  id: string;
  email: string;
  phone?: string;
  name: string;
  avatar?: string;
  roles: UserRole[];
  institutionId?: string;
  language: 'en' | 'ur';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  phone?: string;
  role?: UserRole;
}

// ============================================================================
// Institution Types
// ============================================================================

export interface Institution {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  primaryColor?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// Course & Content Types
// ============================================================================

export type EducationLevel = 
  | 'LITERACY'
  | 'MIDDLE_SCHOOL'
  | 'MATRIC'
  | 'INTERMEDIATE'
  | 'O_LEVEL'
  | 'A_LEVEL'
  | 'UNIVERSITY'
  | 'PROFESSIONAL_EXAM';

export type ExamBoard =
  | 'FEDERAL'
  | 'PUNJAB'
  | 'SINDH'
  | 'KPK'
  | 'BALOCHISTAN'
  | 'CAMBRIDGE'
  | 'EDEXCEL'
  | 'AKU_EB'
  | 'OTHER';

export interface Course {
  id: string;
  title: string;
  description: string;
  slug: string;
  level: EducationLevel;
  board?: ExamBoard;
  subject: string;
  language: 'en' | 'ur' | 'both';
  thumbnail?: string;
  isPublished: boolean;
  isFree: boolean;
  institutionId?: string;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  order: number;
  isLocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description?: string;
  order: number;
  durationMinutes?: number;
  createdAt: Date;
  updatedAt: Date;
}

export type ContentType = 'VIDEO' | 'TEXT' | 'PDF' | 'AUDIO' | 'INTERACTIVE';

export interface Content {
  id: string;
  lessonId: string;
  type: ContentType;
  title: string;
  data: Record<string, unknown>;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// Assessment Types
// ============================================================================

export type QuestionType = 
  | 'MCQ_SINGLE'
  | 'MCQ_MULTIPLE'
  | 'TRUE_FALSE'
  | 'FILL_BLANK'
  | 'SHORT_ANSWER'
  | 'LONG_ANSWER'
  | 'NUMERIC'
  | 'MATCHING'
  | 'SEQUENCE';

export type DifficultyLevel = 'EASY' | 'MEDIUM' | 'HARD';

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options?: string[];
  correctAnswer: string | string[] | number;
  explanation?: string;
  marks: number;
  difficulty: DifficultyLevel;
  subject: string;
  topic?: string;
  tags: string[];
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
}

export type PaperType = 'PAST_PAPER' | 'GUESS_PAPER' | 'MOCK_EXAM';

export type PaperStatus = 'DRAFT' | 'UNDER_REVIEW' | 'PUBLISHED' | 'ARCHIVED';

export interface Paper {
  id: string;
  type: PaperType;
  title: string;
  year?: number;
  session?: string;
  board?: ExamBoard;
  subject: string;
  level: EducationLevel;
  status: PaperStatus;
  totalMarks: number;
  durationMinutes: number;
  questionIds: string[];
  createdById: string;
  reviewedById?: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Quiz {
  id: string;
  courseId?: string;
  moduleId?: string;
  title: string;
  description?: string;
  questionIds: string[];
  totalMarks: number;
  durationMinutes?: number;
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
  showCorrectAnswers: boolean;
  maxAttempts?: number;
  passingScore?: number;
  isPublished: boolean;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// Progress & Submission Types
// ============================================================================

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: Date;
  completedAt?: Date;
  progressPercent: number;
}

export interface Progress {
  id: string;
  userId: string;
  lessonId: string;
  completed: boolean;
  completedAt?: Date;
  timeSpentSeconds: number;
}

export type SubmissionStatus = 'SUBMITTED' | 'GRADED' | 'RETURNED';

export interface Submission {
  id: string;
  userId: string;
  quizId?: string;
  assignmentId?: string;
  paperId?: string;
  answers: Record<string, unknown>;
  score?: number;
  maxScore: number;
  status: SubmissionStatus;
  feedback?: string;
  gradedById?: string;
  submittedAt: Date;
  gradedAt?: Date;
}

// ============================================================================
// API Response Types
// ============================================================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// ============================================================================
// Health Check Types
// ============================================================================

export interface HealthStatus {
  status: 'ok' | 'degraded' | 'down';
  timestamp: string;
  version: string;
  services: {
    database: 'connected' | 'disconnected' | 'not_configured';
    redis: 'connected' | 'disconnected' | 'not_configured';
  };
}

