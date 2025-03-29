import { NotificationService } from '../services/notification.service';
import { Notification } from '../entities/notification.entity';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    findAll(userId: string): Promise<Notification[]>;
    findOne(id: string): Promise<Notification>;
    markAsRead(id: string): Promise<Notification>;
    markAllAsRead(userId: string): Promise<Notification[]>;
    remove(id: string): Promise<{
        id: string;
    }>;
}
