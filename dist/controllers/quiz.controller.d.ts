import { QuizService } from '../services/quiz.service';
import { Quiz } from '../entities/quiz.entity';
import { QuizSubmission } from '../entities/quiz-submission.entity';
export declare class QuizController {
    private readonly quizService;
    constructor(quizService: QuizService);
    findAll(): Promise<Quiz[]>;
    findOne(id: string): Promise<Quiz>;
    create(createQuizDto: Partial<Quiz>): Promise<Quiz>;
    update(id: string, updateQuizDto: Partial<Quiz>): Promise<Quiz>;
    remove(id: string): Promise<{
        id: string;
    }>;
    findByCourse(courseId: string): Promise<Quiz[]>;
    submitQuiz(quizId: string, submissionDto: Partial<QuizSubmission>): Promise<QuizSubmission>;
    gradeQuiz(submissionId: string, score: number): Promise<QuizSubmission>;
    getSubmissions(quizId: string): Promise<QuizSubmission[]>;
    getStudentSubmission(quizId: string, studentId: string): Promise<QuizSubmission>;
}
