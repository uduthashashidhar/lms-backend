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
exports.DiscussionReply = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const discussion_entity_1 = require("./discussion.entity");
let DiscussionReply = class DiscussionReply {
};
exports.DiscussionReply = DiscussionReply;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DiscussionReply.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], DiscussionReply.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'authorId' }),
    __metadata("design:type", user_entity_1.User)
], DiscussionReply.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DiscussionReply.prototype, "authorId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => discussion_entity_1.Discussion),
    (0, typeorm_1.JoinColumn)({ name: 'discussionId' }),
    __metadata("design:type", discussion_entity_1.Discussion)
], DiscussionReply.prototype, "discussion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DiscussionReply.prototype, "discussionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => DiscussionReply, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'parentReplyId' }),
    __metadata("design:type", DiscussionReply)
], DiscussionReply.prototype, "parentReply", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DiscussionReply.prototype, "parentReplyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], DiscussionReply.prototype, "likeCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], DiscussionReply.prototype, "isInstructorResponse", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], DiscussionReply.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], DiscussionReply.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], DiscussionReply.prototype, "updatedAt", void 0);
exports.DiscussionReply = DiscussionReply = __decorate([
    (0, typeorm_1.Entity)('discussion_replies')
], DiscussionReply);
//# sourceMappingURL=discussion-reply.entity.js.map