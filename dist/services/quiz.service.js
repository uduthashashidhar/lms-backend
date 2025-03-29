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
exports.QuizService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const quiz_entity_1 = require("../entities/quiz.entity");
const quiz_submission_entity_1 = require("../entities/quiz-submission.entity");
let QuizService = class QuizService {
    constructor(quizRepository, submissionRepository) {
        this.quizRepository = quizRepository;
        this.submissionRepository = submissionRepository;
    }
    async findAll() {
        return this.quizRepository.find({
            where: { isPublished: true },
            relations: ['lesson'],
        });
    }
    async findOne(id) {
        return this.quizRepository.findOne({
            where: { id, isPublished: true },
            relations: ['lesson'],
        });
    }
    async create(createQuizDto) {
        const quiz = this.quizRepository.create(createQuizDto);
        return this.quizRepository.save(quiz);
    }
    async update(id, updateQuizDto) {
        await this.quizRepository.update(id, updateQuizDto);
        return this.findOne(id);
    }
    async remove(id) {
        await this.quizRepository.update(id, { isPublished: false });
        return { id };
    }
    async findByLesson(lessonId) {
        return this.quizRepository.find({
            where: { lessonId, isPublished: true },
            order: { timeLimit: 'ASC' },
        });
    }
    async findByCourse(courseId) {
        return this.quizRepository.find({
            where: { lesson: { courseId }, isPublished: true },
            relations: ['lesson'],
            order: { timeLimit: 'ASC' },
        });
    }
    async submitQuiz(submissionDto) {
        const submission = this.submissionRepository.create(submissionDto);
        return this.submissionRepository.save(submission);
    }
    async gradeQuiz(submissionId, score) {
        await this.submissionRepository.update(submissionId, { score });
        return this.submissionRepository.findOne({
            where: { id: submissionId },
            relations: ['student', 'quiz'],
        });
    }
    async getSubmissions(quizId) {
        return this.submissionRepository.find({
            where: { quizId, isActive: true },
            relations: ['student'],
        });
    }
    async getStudentSubmission(quizId, studentId) {
        return this.submissionRepository.findOne({
            where: { quizId, studentId, isActive: true },
        });
    }
};
exports.QuizService = QuizService;
exports.QuizService = QuizService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(quiz_entity_1.Quiz)),
    __param(1, (0, typeorm_1.InjectRepository)(quiz_submission_entity_1.QuizSubmission)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], QuizService);
//# sourceMappingURL=quiz.service.js.map