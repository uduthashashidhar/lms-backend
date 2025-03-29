"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const notification_entity_1 = require("../entities/notification.entity");
let NotificationService = class NotificationService {
    constructor(notificationRepository) {
        this.notificationRepository = notificationRepository;
    }
    async findAll(userId) {
        return this.notificationRepository.find({
            where: { userId, isActive: true },
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        return this.notificationRepository.findOne({
            where: { id, isActive: true },
        });
    }
    async create(createNotificationDto) {
        const notification = this.notificationRepository.create(createNotificationDto);
        return this.notificationRepository.save(notification);
    }
    async markAsRead(id) {
        await this.notificationRepository.update(id, { isRead: true });
        return this.findOne(id);
    }
    async markAllAsRead(userId) {
        await this.notificationRepository.update({ userId, isRead: false }, { isRead: true });
        return this.findAll(userId);
    }
    async remove(id) {
        await this.notificationRepository.update(id, { isActive: false });
        return { id };
    }
    async createAssignmentNotification(assignmentId, userId, type) {
        return this.create({
            userId,
            type,
            title: 'Assignment Notification',
            message: 'You have a new assignment notification',
            metadata: { assignmentId },
        });
    }
    async createQuizNotification(quizId, userId, type) {
        return this.create({
            userId,
            type,
            title: 'Quiz Notification',
            message: 'You have a new quiz notification',
            metadata: { quizId },
        });
    }
    async createDiscussionNotification(discussionId, userId, type) {
        return this.create({
            userId,
            type,
            title: 'Discussion Notification',
            message: 'You have a new discussion notification',
            metadata: { discussionId },
        });
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notification_entity_1.Notification)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NotificationService);
//# sourceMappingURL=notification.service.js.map