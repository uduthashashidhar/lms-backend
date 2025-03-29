import { Repository } from 'typeorm';
import { Notification, NotificationType } from '../entities/notification.entity';
export declare class NotificationService {
    private notificationRepository;
    constructor(notificationRepository: Repository<Notification>);
    findAll(userId: string): Promise<Notification[]>;
    findOne(id: string): Promise<Notification>;
    create(createNotificationDto: Partial<Notification>): Promise<Notification>;
    markAsRead(id: string): Promise<Notification>;
    markAllAsRead(userId: string): Promise<Notification[]>;
    remove(id: string): Promise<{
        id: string;
    }>;
    createAssignmentNotification(assignmentId: string, userId: string, type: NotificationType): Promise<Notification>;
    createQuizNotification(quizId: string, userId: string, type: NotificationType): Promise<Notification>;
    createDiscussionNotification(discussionId: string, userId: string, type: NotificationType): Promise<Notification>;
}
