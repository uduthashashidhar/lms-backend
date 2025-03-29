import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from '../entities/lesson.entity';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
  ) {}

  async findAll() {
    return this.lessonRepository.find({
      where: { isActive: true },
      relations: ['course'],
    });
  }

  async findOne(id: string) {
    return this.lessonRepository.findOne({
      where: { id, isActive: true },
      relations: ['course'],
    });
  }

  async create(createLessonDto: Partial<Lesson>) {
    const lesson = this.lessonRepository.create(createLessonDto);
    return this.lessonRepository.save(lesson);
  }

  async update(id: string, updateLessonDto: Partial<Lesson>) {
    await this.lessonRepository.update(id, updateLessonDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.lessonRepository.update(id, { isActive: false });
    return { id };
  }

  async findByCourse(courseId: string) {
    return this.lessonRepository.find({
      where: { courseId, isActive: true },
      order: { orderIndex: 'ASC' },
    });
  }
}