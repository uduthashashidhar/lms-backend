import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from '../entities/quiz.entity';
import { QuizSubmission } from '../entities/quiz-submission.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
    @InjectRepository(QuizSubmission)
    private submissionRepository: Repository<QuizSubmission>,
  ) {}

  async findAll() {
    return this.quizRepository.find({
      where: { isPublished: true },
      relations: ['lesson'],
    });
  }

  async findOne(id: string) {
    return this.quizRepository.findOne({
      where: { id, isPublished: true },
      relations: ['lesson'],
    });
  }

  async create(createQuizDto: Partial<Quiz>) {
    const quiz = this.quizRepository.create(createQuizDto);
    return this.quizRepository.save(quiz);
  }

  async update(id: string, updateQuizDto: Partial<Quiz>) {
    await this.quizRepository.update(id, updateQuizDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.quizRepository.update(id, { isPublished: false });
    return { id };
  }

  async findByLesson(lessonId: string) {
    return this.quizRepository.find({
      where: { lessonId, isPublished: true },
      order: { timeLimit: 'ASC' },
    });
  }

  async findByCourse(courseId: string) {
    return this.quizRepository.find({
      where: { lesson: { courseId }, isPublished: true },
      relations: ['lesson'],
      order: { timeLimit: 'ASC' },
    });
  }

  async submitQuiz(submissionDto: Partial<QuizSubmission>) {
    const submission = this.submissionRepository.create(submissionDto);
    return this.submissionRepository.save(submission);
  }

  async gradeQuiz(submissionId: string, score: number) {
    await this.submissionRepository.update(submissionId, { score });
    return this.submissionRepository.findOne({
      where: { id: submissionId },
      relations: ['student', 'quiz'],
    });
  }

  async getSubmissions(quizId: string) {
    return this.submissionRepository.find({
      where: { quizId, isActive: true },
      relations: ['student'],
    });
  }

  async getStudentSubmission(quizId: string, studentId: string) {
    return this.submissionRepository.findOne({
      where: { quizId, studentId, isActive: true },
    });
  }
}