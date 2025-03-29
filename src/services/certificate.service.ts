import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Certificate } from '../entities/certificate.entity';
import { Progress } from '../entities/progress.entity';

@Injectable()
export class CertificateService {
  constructor(
    @InjectRepository(Certificate)
    private certificateRepository: Repository<Certificate>,
    @InjectRepository(Progress)
    private progressRepository: Repository<Progress>,
  ) {}

  async findAll() {
    return this.certificateRepository.find({
      where: { isActive: true },
      relations: ['student', 'course'],
      order: { issueDate: 'DESC' },
    });
  }

  async findOne(id: string) {
    return this.certificateRepository.findOne({
      where: { id, isActive: true },
      relations: ['student', 'course'],
    });
  }

  async findByStudent(studentId: string) {
    return this.certificateRepository.find({
      where: { studentId, isActive: true },
      relations: ['course'],
      order: { issueDate: 'DESC' },
    });
  }

  async findByCourse(courseId: string) {
    return this.certificateRepository.find({
      where: { courseId, isActive: true },
      relations: ['student'],
      order: { issueDate: 'DESC' },
    });
  }

  async create(studentId: string, courseId: string) {
    // Check if student has completed the course
    const progress = await this.progressRepository.findOne({
      where: { studentId, courseId, isActive: true },
      relations: ['course'],
    });

    if (!progress || progress.overallProgress < 100) {
      throw new Error('Student has not completed the course');
    }

    // Generate certificate number
    const certificateNumber = this.generateCertificateNumber(studentId, courseId);

    const certificate = this.certificateRepository.create({
      studentId,
      courseId,
      certificateNumber,
      issueDate: new Date(),
      finalScore: progress.overallProgress,
      completionTimeHours: this.calculateCompletionTime(progress),
      achievements: this.generateAchievements(progress),
    });

    return this.certificateRepository.save(certificate);
  }

  async verify(certificateNumber: string) {
    return this.certificateRepository.findOne({
      where: { certificateNumber, isActive: true },
      relations: ['student', 'course'],
    });
  }

  private generateCertificateNumber(studentId: string, courseId: string): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 7);
    return `CERT-${timestamp}-${random}`;
  }

  private calculateCompletionTime(progress: Progress): number {
    const startDate = progress.createdAt;
    const endDate = progress.updatedAt;
    const diffHours = Math.abs(endDate.getTime() - startDate.getTime()) / 36e5;
    return Math.round(diffHours);
  }

  private generateAchievements(progress: Progress): any[] {
    const achievements = [];

    if (progress.completedLessons.length === progress.course.totalLessons) {
      achievements.push({
        type: 'COURSE_COMPLETION',
        description: 'Completed all lessons',
        earnedAt: new Date(),
      });
    }

    if (progress.completedAssignments.length === progress.course.totalAssignments) {
      achievements.push({
        type: 'ASSIGNMENT_MASTER',
        description: 'Completed all assignments',
        earnedAt: new Date(),
      });
    }

    if (progress.completedQuizzes.length === progress.course.totalQuizzes) {
      achievements.push({
        type: 'QUIZ_MASTER',
        description: 'Completed all quizzes',
        earnedAt: new Date(),
      });
    }

    return achievements;
  }
}