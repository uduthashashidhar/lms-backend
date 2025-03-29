import { AssignmentService } from '../services/assignment.service';
import { Assignment } from '../entities/assignment.entity';
import { AssignmentSubmission } from '../entities/assignment-submission.entity';
export declare class AssignmentController {
    private readonly assignmentService;
    constructor(assignmentService: AssignmentService);
    findAll(): Promise<Assignment[]>;
    findOne(id: string): Promise<Assignment[]>;
    create(createAssignmentDto: Partial<Assignment>): Promise<Assignment>;
    update(id: string, updateAssignmentDto: Partial<Assignment>): Promise<Assignment[]>;
    remove(id: string): Promise<{
        id: string;
    }>;
    findByCourse(courseId: string): Promise<Assignment[]>;
    submitAssignment(assignmentId: string, submissionDto: Partial<AssignmentSubmission>): Promise<AssignmentSubmission>;
    getSubmissions(assignmentId: string): Promise<AssignmentSubmission[]>;
    getStudentSubmission(assignmentId: string, studentId: string): Promise<AssignmentSubmission>;
}
