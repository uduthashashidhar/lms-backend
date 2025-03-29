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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Certificate = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const course_entity_1 = require("./course.entity");
let Certificate = class Certificate {
};
exports.Certificate = Certificate;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Certificate.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'studentId' }),
    __metadata("design:type", user_entity_1.User)
], Certificate.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Certificate.prototype, "studentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_entity_1.Course),
    (0, typeorm_1.JoinColumn)({ name: 'courseId' }),
    __metadata("design:type", course_entity_1.Course)
], Certificate.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Certificate.prototype, "courseId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Certificate.prototype, "certificateNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Certificate.prototype, "issueDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], Certificate.prototype, "finalScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Certificate.prototype, "completionTimeHours", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Certificate.prototype, "achievements", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Certificate.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Certificate.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Certificate.prototype, "updatedAt", void 0);
exports.Certificate = Certificate = __decorate([
    (0, typeorm_1.Entity)('certificates')
], Certificate);
//# sourceMappingURL=certificate.entity.js.map