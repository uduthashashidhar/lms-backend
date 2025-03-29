import { Lesson } from './lesson.entity';
export declare enum AssignmentStatus {
    PENDING = "pending",
    SUBMITTED = "submitted",
    GRADED = "graded"
}
export declare class Assignment {
    id: string;
    title: string;
    description: string;
    maxScore: number;
    dueDate: Date;
    lesson: Lesson;
    lessonId: string;
    instructions: any;
    rubric: any;
    isPublished: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
