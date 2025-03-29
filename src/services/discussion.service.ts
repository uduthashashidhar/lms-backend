import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discussion } from '../entities/discussion.entity';
import { DiscussionReply } from '../entities/discussion-reply.entity';

@Injectable()
export class DiscussionService {
  constructor(
    @InjectRepository(Discussion)
    private discussionRepository: Repository<Discussion>,
    @InjectRepository(DiscussionReply)
    private replyRepository: Repository<DiscussionReply>,
  ) {}

  async findAll() {
    return this.discussionRepository.find({
      where: { isActive: true },
      relations: ['course', 'author'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    return this.discussionRepository.findOne({
      where: { id, isActive: true },
      relations: ['course', 'author', 'replies', 'replies.author'],
    });
  }

  async create(createDiscussionDto: Partial<Discussion>) {
    const discussion = this.discussionRepository.create(createDiscussionDto);
    return this.discussionRepository.save(discussion);
  }

  async update(id: string, updateDiscussionDto: Partial<Discussion>) {
    await this.discussionRepository.update(id, updateDiscussionDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.discussionRepository.update(id, { isActive: false });
    return { id };
  }

  async findByCourse(courseId: string) {
    return this.discussionRepository.find({
      where: { courseId, isActive: true },
      relations: ['author'],
      order: { createdAt: 'DESC' },
    });
  }

  async addReply(discussionId: string, replyDto: Partial<DiscussionReply>) {
    const reply = this.replyRepository.create({
      ...replyDto,
      discussionId,
    });
    await this.replyRepository.save(reply);
    return this.findOne(discussionId);
  }

  async removeReply(replyId: string) {
    await this.replyRepository.update(replyId, { isActive: false });
    return { id: replyId };
  }

  async getReplies(discussionId: string) {
    return this.replyRepository.find({
      where: { discussionId, isActive: true },
      relations: ['author'],
      order: { createdAt: 'ASC' },
    });
  }
}