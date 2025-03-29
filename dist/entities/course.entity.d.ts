import { User } from './user.entity';
export declare class Course {
    id: string;
    title: string;
    description: string;
    isPublished: boolean;
    syllabus: any;
    thumbnailUrl: string;
    enrollmentCount: number;
    totalLessons: number;
    totalAssignments: number;
    totalQuizzes: number;
    instructor: User;
    instructorId: string;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
