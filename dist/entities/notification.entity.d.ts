import { User } from './user.entity';
export declare enum NotificationType {
    COURSE_UPDATE = "course_update",
    ASSIGNMENT_DUE = "assignment_due",
    QUIZ_REMINDER = "quiz_reminder",
    DISCUSSION_MENTION = "discussion_mention",
    GRADE_POSTED = "grade_posted",
    ANNOUNCEMENT = "announcement"
}
export declare class Notification {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    user: User;
    userId: string;
    metadata: any;
    isRead: boolean;
    readAt: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
