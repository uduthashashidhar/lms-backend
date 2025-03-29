import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignment } from '../entities/assignment.entity';
import { AssignmentSubmission } from '../entities/assignment-submission.entity';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,
    @InjectRepository(AssignmentSubmission)
    private submissionRepository: Repository<AssignmentSubmission>,
  ) {}

  async findAll() {
    return this.assignmentRepository.find({
      where: { isActive: true },
      relations: ['course'],
    });
  }

  async findOne(id: string) {
    return this.assignmentRepository.find({
      where: { id, isActive: true },
      relations: ['course'],
    });
  }

  async create(createAssignmentDto: Partial<Assignment>) {
    const assignment = this.assignmentRepository.create(createAssignmentDto);
    return this.assignmentRepository.save(assignment);
  }

  async update(id: string, updateAssignmentDto: Partial<Assignment>) {
    await this.assignmentRepository.update(id, updateAssignmentDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.assignmentRepository.update(id, { isActive: false });
    return { id };
  }

  async findByCourse(courseId: string) {
    return this.assignmentRepository.find({
      where: { lesson: { courseId }, isActive: true },
      relations: ['lesson'],
      order: { dueDate: 'ASC' },
    });
  }

  async submitAssignment(submissionDto: Partial<AssignmentSubmission>) {
    const submission = this.submissionRepository.create(submissionDto);
    return this.submissionRepository.save(submission);
  }

  async getSubmissions(assignmentId: string) {
    return this.submissionRepository.find({
      where: { assignmentId, isActive: true },
      relations: ['student'],
    });
  }

  async getStudentSubmission(assignmentId: string, studentId: string) {
    return this.submissionRepository.findOne({
      where: { assignmentId, studentId, isActive: true },
    });
  }
}