import { Course } from './course.entity';
export declare enum LessonType {
    VIDEO = "video",
    ARTICLE = "article",
    QUIZ = "quiz",
    ASSIGNMENT = "assignment"
}
export declare class Lesson {
    id: string;
    title: string;
    description: string;
    type: LessonType;
    content: any;
    orderIndex: number;
    course: Course;
    courseId: string;
    duration: number;
    isPublished: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
