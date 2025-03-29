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
exports.ProgressService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const progress_entity_1 = require("../entities/progress.entity");
const enrollment_entity_1 = require("../entities/enrollment.entity");
let ProgressService = class ProgressService {
    constructor(progressRepository, enrollmentRepository) {
        this.progressRepository = progressRepository;
        this.enrollmentRepository = enrollmentRepository;
    }
    async findByStudent(studentId) {
        if (!studentId) {
            throw new Error('Student ID is required');
        }
        const progress = await this.progressRepository.find({
            where: { studentId, isActive: true },
            relations: ['lesson', 'course'],
            order: { updatedAt: 'DESC' },
        });
        return progress;
    }
    async findByLesson(lessonId) {
        if (!lessonId) {
            throw new Error('Lesson ID is required');
        }
        const progress = await this.progressRepository.find({
            where: { lessonId, isActive: true },
            relations: ['student', 'course'],
            order: { updatedAt: 'DESC' },
        });
        return progress;
    }
    async findOne(studentId, lessonId) {
        if (!studentId || !lessonId) {
            throw new Error('Student ID and Lesson ID are required');
        }
        const progress = await this.progressRepository.findOne({
            where: { studentId, lessonId, isActive: true },
            relations: ['lesson', 'student', 'course'],
        });
        return progress;
    }
    async updateProgress(studentId, lessonId, progressData, courseId) {
        if (!studentId || !lessonId) {
            throw new Error('Student ID and Lesson ID are required');
        }
        if (!progressData) {
            throw new Error('Progress data is required');
        }
        if (!courseId) {
            throw new Error('Course ID is required for updating enrollment progress');
        }
        let progressRecord = await this.findOne(studentId, lessonId);
        if (!progressRecord) {
            progressRecord = this.progressRepository.create({
                studentId,
                lessonId,
                courseId,
                completedLessons: [],
                completedAssignments: [],
                completedQuizzes: [],
                progressPercentage: 0,
                overallProgress: 0,
            });
        }
        Object.assign(progressRecord, progressData);
        const savedProgress = await this.progressRepository.save(progressRecord);
        await this.enrollmentRepository.update({ studentId, courseId }, { progress: savedProgress.overallProgress });
        return savedProgress;
    }
    async markLessonComplete(studentId, courseId, lessonId) {
        if (!studentId || !courseId || !lessonId) {
            throw new Error('Student ID, Course ID and Lesson ID are required');
        }
        let progressRecord = await this.findOne(studentId, lessonId);
        if (!progressRecord) {
            progressRecord = this.progressRepository.create({
                studentId,
                lessonId,
                courseId,
                completedLessons: [],
                completedAssignments: [],
                completedQuizzes: [],
                progressPercentage: 0,
                overallProgress: 0,
            });
        }
        if (!progressRecord.completedLessons.includes(lessonId)) {
            progressRecord.completedLessons.push(lessonId);
            return this.updateProgress(studentId, lessonId, {
                completedLessons: progressRecord.completedLessons,
                overallProgress: this.calculateOverallProgress(progressRecord),
            }, courseId);
        }
        return progressRecord;
    }
    async markAssignmentComplete(studentId, courseId, assignmentId, lessonId) {
        if (!studentId || !courseId || !assignmentId || !lessonId) {
            throw new Error('Student ID, Course ID, Assignment ID and Lesson ID are required');
        }
        let progressRecord = await this.findOne(studentId, lessonId);
        if (!progressRecord) {
            progressRecord = this.progressRepository.create({
                studentId,
                lessonId,
                courseId,
                completedLessons: [],
                completedAssignments: [],
                completedQuizzes: [],
                progressPercentage: 0,
                overallProgress: 0,
            });
        }
        if (!progressRecord.completedAssignments.includes(assignmentId)) {
            progressRecord.completedAssignments.push(assignmentId);
            return this.updateProgress(studentId, lessonId, {
                completedAssignments: progressRecord.completedAssignments,
                overallProgress: this.calculateOverallProgress(progressRecord),
            }, courseId);
        }
        return progressRecord;
    }
    async markQuizComplete(studentId, courseId, quizId, lessonId) {
        if (!studentId || !courseId || !quizId || !lessonId) {
            throw new Error('Student ID, Course ID, Quiz ID and Lesson ID are required');
        }
        let progressRecord = await this.findOne(studentId, lessonId);
        if (!progressRecord) {
            progressRecord = this.progressRepository.create({
                studentId,
                lessonId,
                courseId,
                completedLessons: [],
                completedAssignments: [],
                completedQuizzes: [],
                progressPercentage: 0,
                overallProgress: 0,
            });
        }
        if (!progressRecord.completedQuizzes.includes(quizId)) {
            progressRecord.completedQuizzes.push(quizId);
            return this.updateProgress(studentId, lessonId, {
                completedQuizzes: progressRecord.completedQuizzes,
                overallProgress: this.calculateOverallProgress(progressRecord),
            }, courseId);
        }
        return progressRecord;
    }
    calculateOverallProgress(progress) {
        if (!progress.course) {
            return 0;
        }
        const totalItems = progress.course.totalLessons +
            progress.course.totalAssignments +
            progress.course.totalQuizzes;
        const completedItems = progress.completedLessons.length +
            progress.completedAssignments.length +
            progress.completedQuizzes.length;
        const overallProgress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
        const lessonProgress = progress.course.totalLessons > 0 ?
            (progress.completedLessons.length / progress.course.totalLessons) * 100 : 0;
        progress.progressPercentage = Math.round(lessonProgress);
        return Math.round(overallProgress);
    }
};
exports.ProgressService = ProgressService;
exports.ProgressService = ProgressService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(progress_entity_1.Progress)),
    __param(1, (0, typeorm_1.InjectRepository)(enrollment_entity_1.Enrollment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProgressService);
//# sourceMappingURL=progress.service.js.map