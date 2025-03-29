import { User } from './user.entity';
import { Course } from './course.entity';
export declare class Enrollment {
    id: string;
    student: User;
    studentId: string;
    course: Course;
    courseId: string;
    progress: number;
    completedLessons: string[];
    lastAccessedAt: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
