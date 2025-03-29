import { Lesson } from './lesson.entity';
export declare enum QuestionType {
    MULTIPLE_CHOICE = "multiple_choice",
    TRUE_FALSE = "true_false",
    SHORT_ANSWER = "short_answer",
    ESSAY = "essay"
}
export declare class Quiz {
    id: string;
    title: string;
    description: string;
    timeLimit: number;
    maxAttempts: number;
    passingScore: number;
    lesson: Lesson;
    lessonId: string;
    questions: {
        id: string;
        type: QuestionType;
        question: string;
        options?: string[];
        correctAnswer: string | string[];
        points: number;
    }[];
    isPublished: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
