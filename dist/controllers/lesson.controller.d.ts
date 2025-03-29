import { LessonService } from '../services/lesson.service';
import { Lesson } from '../entities/lesson.entity';
export declare class LessonController {
    private readonly lessonService;
    constructor(lessonService: LessonService);
    findAll(): Promise<Lesson[]>;
    findOne(id: string): Promise<Lesson>;
    create(createLessonDto: Partial<Lesson>): Promise<Lesson>;
    update(id: string, updateLessonDto: Partial<Lesson>): Promise<Lesson>;
    remove(id: string): Promise<{
        id: string;
    }>;
    findByCourse(courseId: string): Promise<Lesson[]>;
}
