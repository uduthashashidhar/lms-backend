import { User } from './user.entity';
import { Course } from './course.entity';
export declare class Certificate {
    id: string;
    student: User;
    studentId: string;
    course: Course;
    courseId: string;
    certificateNumber: string;
    issueDate: Date;
    finalScore: number;
    completionTimeHours: number;
    achievements: {
        type: string;
        description: string;
        earnedAt: Date;
    }[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
