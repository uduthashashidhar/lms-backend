import { User } from './user.entity';
import { Lesson } from './lesson.entity';
import { Course } from './course.entity';
export declare enum ProgressStatus {
    NOT_STARTED = "not_started",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed"
}
export declare class Progress {
    id: string;
    student: User;
    studentId: string;
    lesson: Lesson;
    lessonId: string;
    status: ProgressStatus;
    timeSpentSeconds: number;
    lastAccessedAt: Date;
    completedAt: Date;
    progressPercentage: number;
    completedLessons: string[];
    course: Course;
    courseId: string;
    overallProgress: number;
    completedAssignments: string[];
    completedQuizzes: string[];
    metadata: any;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
