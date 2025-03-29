import { Repository } from 'typeorm';
import { Progress } from '../entities/progress.entity';
import { Enrollment } from '../entities/enrollment.entity';
export declare class ProgressService {
    private progressRepository;
    private enrollmentRepository;
    constructor(progressRepository: Repository<Progress>, enrollmentRepository: Repository<Enrollment>);
    findByStudent(studentId: string): Promise<Progress[]>;
    findByLesson(lessonId: string): Promise<Progress[]>;
    findOne(studentId: string, lessonId: string): Promise<Progress>;
    updateProgress(studentId: string, lessonId: string, progressData: Partial<Progress>, courseId?: string): Promise<Progress>;
    markLessonComplete(studentId: string, courseId: string, lessonId: string): Promise<Progress>;
    markAssignmentComplete(studentId: string, courseId: string, assignmentId: string, lessonId: string): Promise<Progress>;
    markQuizComplete(studentId: string, courseId: string, quizId: string, lessonId: string): Promise<Progress>;
    private calculateOverallProgress;
}
