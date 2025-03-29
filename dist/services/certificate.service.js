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
exports.CertificateService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const certificate_entity_1 = require("../entities/certificate.entity");
const progress_entity_1 = require("../entities/progress.entity");
let CertificateService = class CertificateService {
    constructor(certificateRepository, progressRepository) {
        this.certificateRepository = certificateRepository;
        this.progressRepository = progressRepository;
    }
    async findAll() {
        return this.certificateRepository.find({
            where: { isActive: true },
            relations: ['student', 'course'],
            order: { issueDate: 'DESC' },
        });
    }
    async findOne(id) {
        return this.certificateRepository.findOne({
            where: { id, isActive: true },
            relations: ['student', 'course'],
        });
    }
    async findByStudent(studentId) {
        return this.certificateRepository.find({
            where: { studentId, isActive: true },
            relations: ['course'],
            order: { issueDate: 'DESC' },
        });
    }
    async findByCourse(courseId) {
        return this.certificateRepository.find({
            where: { courseId, isActive: true },
            relations: ['student'],
            order: { issueDate: 'DESC' },
        });
    }
    async create(studentId, courseId) {
        const progress = await this.progressRepository.findOne({
            where: { studentId, courseId, isActive: true },
            relations: ['course'],
        });
        if (!progress || progress.overallProgress < 100) {
            throw new Error('Student has not completed the course');
        }
        const certificateNumber = this.generateCertificateNumber(studentId, courseId);
        const certificate = this.certificateRepository.create({
            studentId,
            courseId,
            certificateNumber,
            issueDate: new Date(),
            finalScore: progress.overallProgress,
            completionTimeHours: this.calculateCompletionTime(progress),
            achievements: this.generateAchievements(progress),
        });
        return this.certificateRepository.save(certificate);
    }
    async verify(certificateNumber) {
        return this.certificateRepository.findOne({
            where: { certificateNumber, isActive: true },
            relations: ['student', 'course'],
        });
    }
    generateCertificateNumber(studentId, courseId) {
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substring(2, 7);
        return `CERT-${timestamp}-${random}`;
    }
    calculateCompletionTime(progress) {
        const startDate = progress.createdAt;
        const endDate = progress.updatedAt;
        const diffHours = Math.abs(endDate.getTime() - startDate.getTime()) / 36e5;
        return Math.round(diffHours);
    }
    generateAchievements(progress) {
        const achievements = [];
        if (progress.completedLessons.length === progress.course.totalLessons) {
            achievements.push({
                type: 'COURSE_COMPLETION',
                description: 'Completed all lessons',
                earnedAt: new Date(),
            });
        }
        if (progress.completedAssignments.length === progress.course.totalAssignments) {
            achievements.push({
                type: 'ASSIGNMENT_MASTER',
                description: 'Completed all assignments',
                earnedAt: new Date(),
            });
        }
        if (progress.completedQuizzes.length === progress.course.totalQuizzes) {
            achievements.push({
                type: 'QUIZ_MASTER',
                description: 'Completed all quizzes',
                earnedAt: new Date(),
            });
        }
        return achievements;
    }
};
exports.CertificateService = CertificateService;
exports.CertificateService = CertificateService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(certificate_entity_1.Certificate)),
    __param(1, (0, typeorm_1.InjectRepository)(progress_entity_1.Progress)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CertificateService);
//# sourceMappingURL=certificate.service.js.map