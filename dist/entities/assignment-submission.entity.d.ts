import { User } from './user.entity';
import { Assignment } from './assignment.entity';
export declare class AssignmentSubmission {
    id: string;
    assignment: Assignment;
    assignmentId: string;
    student: User;
    studentId: string;
    content: any;
    score: number;
    feedback: string;
    status: string;
    submittedAt: Date;
    gradedAt: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
