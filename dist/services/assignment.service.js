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
exports.AssignmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const assignment_entity_1 = require("../entities/assignment.entity");
const assignment_submission_entity_1 = require("../entities/assignment-submission.entity");
let AssignmentService = class AssignmentService {
    constructor(assignmentRepository, submissionRepository) {
        this.assignmentRepository = assignmentRepository;
        this.submissionRepository = submissionRepository;
    }
    async findAll() {
        return this.assignmentRepository.find({
            where: { isActive: true },
            relations: ['course'],
        });
    }
    async findOne(id) {
        return this.assignmentRepository.find({
            where: { id, isActive: true },
            relations: ['course'],
        });
    }
    async create(createAssignmentDto) {
        const assignment = this.assignmentRepository.create(createAssignmentDto);
        return this.assignmentRepository.save(assignment);
    }
    async update(id, updateAssignmentDto) {
        await this.assignmentRepository.update(id, updateAssignmentDto);
        return this.findOne(id);
    }
    async remove(id) {
        await this.assignmentRepository.update(id, { isActive: false });
        return { id };
    }
    async findByCourse(courseId) {
        return this.assignmentRepository.find({
            where: { lesson: { courseId }, isActive: true },
            relations: ['lesson'],
            order: { dueDate: 'ASC' },
        });
    }
    async submitAssignment(submissionDto) {
        const submission = this.submissionRepository.create(submissionDto);
        return this.submissionRepository.save(submission);
    }
    async getSubmissions(assignmentId) {
        return this.submissionRepository.find({
            where: { assignmentId, isActive: true },
            relations: ['student'],
        });
    }
    async getStudentSubmission(assignmentId, studentId) {
        return this.submissionRepository.findOne({
            where: { assignmentId, studentId, isActive: true },
        });
    }
};
exports.AssignmentService = AssignmentService;
exports.AssignmentService = AssignmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(assignment_entity_1.Assignment)),
    __param(1, (0, typeorm_1.InjectRepository)(assignment_submission_entity_1.AssignmentSubmission)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AssignmentService);
//# sourceMappingURL=assignment.service.js.map