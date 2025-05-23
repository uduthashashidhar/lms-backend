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
exports.DiscussionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const discussion_entity_1 = require("../entities/discussion.entity");
const discussion_reply_entity_1 = require("../entities/discussion-reply.entity");
let DiscussionService = class DiscussionService {
    constructor(discussionRepository, replyRepository) {
        this.discussionRepository = discussionRepository;
        this.replyRepository = replyRepository;
    }
    async findAll() {
        return this.discussionRepository.find({
            where: { isActive: true },
            relations: ['course', 'author'],
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        return this.discussionRepository.findOne({
            where: { id, isActive: true },
            relations: ['course', 'author', 'replies', 'replies.author'],
        });
    }
    async create(createDiscussionDto) {
        const discussion = this.discussionRepository.create(createDiscussionDto);
        return this.discussionRepository.save(discussion);
    }
    async update(id, updateDiscussionDto) {
        await this.discussionRepository.update(id, updateDiscussionDto);
        return this.findOne(id);
    }
    async remove(id) {
        await this.discussionRepository.update(id, { isActive: false });
        return { id };
    }
    async findByCourse(courseId) {
        return this.discussionRepository.find({
            where: { courseId, isActive: true },
            relations: ['author'],
            order: { createdAt: 'DESC' },
        });
    }
    async addReply(discussionId, replyDto) {
        const reply = this.replyRepository.create({
            ...replyDto,
            discussionId,
        });
        await this.replyRepository.save(reply);
        return this.findOne(discussionId);
    }
    async removeReply(replyId) {
        await this.replyRepository.update(replyId, { isActive: false });
        return { id: replyId };
    }
    async getReplies(discussionId) {
        return this.replyRepository.find({
            where: { discussionId, isActive: true },
            relations: ['author'],
            order: { createdAt: 'ASC' },
        });
    }
};
exports.DiscussionService = DiscussionService;
exports.DiscussionService = DiscussionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(discussion_entity_1.Discussion)),
    __param(1, (0, typeorm_1.InjectRepository)(discussion_reply_entity_1.DiscussionReply)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], DiscussionService);
//# sourceMappingURL=discussion.service.js.map