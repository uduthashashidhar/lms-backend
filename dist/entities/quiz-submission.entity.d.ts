import { User } from './user.entity';
import { Quiz } from './quiz.entity';
export declare class QuizSubmission {
    id: string;
    quiz: Quiz;
    quizId: string;
    student: User;
    studentId: string;
    answers: {
        questionId: string;
        answer: string | string[];
        isCorrect: boolean;
        points: number;
    }[];
    score: number;
    percentageScore: number;
    passed: boolean;
    attemptNumber: number;
    startedAt: Date;
    completedAt: Date;
    timeSpentSeconds: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
