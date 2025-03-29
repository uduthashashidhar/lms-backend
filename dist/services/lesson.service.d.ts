import { Repository } from 'typeorm';
import { Lesson } from '../entities/lesson.entity';
export declare class LessonService {
    private lessonRepository;
    constructor(lessonRepository: Repository<Lesson>);
    findAll(): Promise<Lesson[]>;
    findOne(id: string): Promise<Lesson>;
    create(createLessonDto: Partial<Lesson>): Promise<Lesson>;
    update(id: string, updateLessonDto: Partial<Lesson>): Promise<Lesson>;
    remove(id: string): Promise<{
        id: string;
    }>;
    findByCourse(courseId: string): Promise<Lesson[]>;
}
