import { User } from './user.entity';
import { Course } from './course.entity';
import { Lesson } from './lesson.entity';
export declare class Discussion {
    id: string;
    title: string;
    content: string;
    author: User;
    authorId: string;
    course: Course;
    courseId: string;
    lesson: Lesson;
    lessonId: string;
    replyCount: number;
    isPinned: boolean;
    tags: string[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
