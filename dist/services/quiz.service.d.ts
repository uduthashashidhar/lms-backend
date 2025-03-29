import { Repository } from 'typeorm';
import { Quiz } from '../entities/quiz.entity';
import { QuizSubmission } from '../entities/quiz-submission.entity';
export declare class QuizService {
    private quizRepository;
    private submissionRepository;
    constructor(quizRepository: Repository<Quiz>, submissionRepository: Repository<QuizSubmission>);
    findAll(): Promise<Quiz[]>;
    findOne(id: string): Promise<Quiz>;
    create(createQuizDto: Partial<Quiz>): Promise<Quiz>;
    update(id: string, updateQuizDto: Partial<Quiz>): Promise<Quiz>;
    remove(id: string): Promise<{
        id: string;
    }>;
    findByLesson(lessonId: string): Promise<Quiz[]>;
    findByCourse(courseId: string): Promise<Quiz[]>;
    submitQuiz(submissionDto: Partial<QuizSubmission>): Promise<QuizSubmission>;
    gradeQuiz(submissionId: string, score: number): Promise<QuizSubmission>;
    getSubmissions(quizId: string): Promise<QuizSubmission[]>;
    getStudentSubmission(quizId: string, studentId: string): Promise<QuizSubmission>;
}
