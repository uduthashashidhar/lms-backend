import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Progress } from '../entities/progress.entity';
import { Enrollment } from '../entities/enrollment.entity';

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(Progress)
    private progressRepository: Repository<Progress>,
    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,
  ) {}

  async findByStudent(studentId: string) {
    if (!studentId) {
      throw new Error('Student ID is required');
    }
    const progress = await this.progressRepository.find({
      where: { studentId, isActive: true },
      relations: ['lesson', 'course'],
      order: { updatedAt: 'DESC' },
    });
    return progress;
  }

  async findByLesson(lessonId: string) {
    if (!lessonId) {
      throw new Error('Lesson ID is required');
    }
    const progress = await this.progressRepository.find({
      where: { lessonId, isActive: true },
      relations: ['student', 'course'],
      order: { updatedAt: 'DESC' },
    });
    return progress;
  }

  async findOne(studentId: string, lessonId: string) {
    if (!studentId || !lessonId) {
      throw new Error('Student ID and Lesson ID are required');
    }
    const progress = await this.progressRepository.findOne({
      where: { studentId, lessonId, isActive: true },
      relations: ['lesson', 'student', 'course'],
    });
    return progress;
  }

  async updateProgress(studentId: string, lessonId: string, progressData: Partial<Progress>, courseId?: string) {
    if (!studentId || !lessonId) {
      throw new Error('Student ID and Lesson ID are required');
    }
    if (!progressData) {
      throw new Error('Progress data is required');
    }
    if (!courseId) {
      throw new Error('Course ID is required for updating enrollment progress');
    }
    let progressRecord = await this.findOne(studentId, lessonId);
    
    if (!progressRecord) {
      progressRecord = this.progressRepository.create({
        studentId,
        lessonId,
        courseId,
        completedLessons: [],
        completedAssignments: [],
        completedQuizzes: [],
        progressPercentage: 0,
        overallProgress: 0,
      });
    }

    Object.assign(progressRecord, progressData);
    const savedProgress = await this.progressRepository.save(progressRecord);

    // Update enrollment progress
    await this.enrollmentRepository.update(
      { studentId, courseId },
      { progress: savedProgress.overallProgress },
    );

    return savedProgress;
  }

  async markLessonComplete(studentId: string, courseId: string, lessonId: string) {
    if (!studentId || !courseId || !lessonId) {
      throw new Error('Student ID, Course ID and Lesson ID are required');
    }
    let progressRecord = await this.findOne(studentId, lessonId);
    if (!progressRecord) {
      progressRecord = this.progressRepository.create({
        studentId,
        lessonId,
        courseId,
        completedLessons: [],
        completedAssignments: [],
        completedQuizzes: [],
        progressPercentage: 0,
        overallProgress: 0,
      });
    }
    if (!progressRecord.completedLessons.includes(lessonId)) {
      progressRecord.completedLessons.push(lessonId);
      return this.updateProgress(studentId, lessonId, {
        completedLessons: progressRecord.completedLessons,
        overallProgress: this.calculateOverallProgress(progressRecord),
      }, courseId);
    }
    return progressRecord;
  }

  async markAssignmentComplete(studentId: string, courseId: string, assignmentId: string, lessonId: string) {
    if (!studentId || !courseId || !assignmentId || !lessonId) {
      throw new Error('Student ID, Course ID, Assignment ID and Lesson ID are required');
    }
    let progressRecord = await this.findOne(studentId, lessonId);
    if (!progressRecord) {
      progressRecord = this.progressRepository.create({
        studentId,
        lessonId,
        courseId,
        completedLessons: [],
        completedAssignments: [],
        completedQuizzes: [],
        progressPercentage: 0,
        overallProgress: 0,
      });
    }
    if (!progressRecord.completedAssignments.includes(assignmentId)) {
      progressRecord.completedAssignments.push(assignmentId);
      return this.updateProgress(studentId, lessonId, {
        completedAssignments: progressRecord.completedAssignments,
        overallProgress: this.calculateOverallProgress(progressRecord),
      }, courseId);
    }
    return progressRecord;
  }

  async markQuizComplete(studentId: string, courseId: string, quizId: string, lessonId: string) {
    if (!studentId || !courseId || !quizId || !lessonId) {
      throw new Error('Student ID, Course ID, Quiz ID and Lesson ID are required');
    }
    let progressRecord = await this.findOne(studentId, lessonId);
    if (!progressRecord) {
      progressRecord = this.progressRepository.create({
        studentId,
        lessonId,
        courseId,
        completedLessons: [],
        completedAssignments: [],
        completedQuizzes: [],
        progressPercentage: 0,
        overallProgress: 0,
      });
    }
    if (!progressRecord.completedQuizzes.includes(quizId)) {
      progressRecord.completedQuizzes.push(quizId);
      return this.updateProgress(studentId, lessonId, {
        completedQuizzes: progressRecord.completedQuizzes,
        overallProgress: this.calculateOverallProgress(progressRecord),
      }, courseId);
    }
    return progressRecord;
  }

  private calculateOverallProgress(progress: Progress): number {
    if (!progress.course) {
      return 0;
    }
    const totalItems = progress.course.totalLessons +
      progress.course.totalAssignments +
      progress.course.totalQuizzes;

    const completedItems = progress.completedLessons.length +
      progress.completedAssignments.length +
      progress.completedQuizzes.length;

    const overallProgress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
    
    // Calculate lesson-specific progress percentage
    const lessonProgress = progress.course.totalLessons > 0 ?
      (progress.completedLessons.length / progress.course.totalLessons) * 100 : 0;
    progress.progressPercentage = Math.round(lessonProgress);

    return Math.round(overallProgress);
  }
}