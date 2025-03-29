import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification, NotificationType } from '../entities/notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async findAll(userId: string) {
    return this.notificationRepository.find({
      where: { userId, isActive: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    return this.notificationRepository.findOne({
      where: { id, isActive: true },
    });
  }

  async create(createNotificationDto: Partial<Notification>) {
    const notification = this.notificationRepository.create(createNotificationDto);
    return this.notificationRepository.save(notification);
  }

  async markAsRead(id: string) {
    await this.notificationRepository.update(id, { isRead: true });
    return this.findOne(id);
  }

  async markAllAsRead(userId: string) {
    await this.notificationRepository.update(
      { userId, isRead: false },
      { isRead: true },
    );
    return this.findAll(userId);
  }

  async remove(id: string) {
    await this.notificationRepository.update(id, { isActive: false });
    return { id };
  }

  async createAssignmentNotification(assignmentId: string, userId: string, type: NotificationType) {
    return this.create({
      userId,
      type,
      title: 'Assignment Notification',
      message: 'You have a new assignment notification',
      metadata: { assignmentId },
    });
  }

  async createQuizNotification(quizId: string, userId: string, type: NotificationType) {
    return this.create({
      userId,
      type,
      title: 'Quiz Notification',
      message: 'You have a new quiz notification',
      metadata: { quizId },
    });
  }

  async createDiscussionNotification(discussionId: string, userId: string, type: NotificationType) {
    return this.create({
      userId,
      type,
      title: 'Discussion Notification',
      message: 'You have a new discussion notification',
      metadata: { discussionId },
    });
  }
}