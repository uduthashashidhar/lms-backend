import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { DiscussionService } from '../services/discussion.service';
import { Discussion } from '../entities/discussion.entity';
import { DiscussionReply } from '../entities/discussion-reply.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../entities/user.entity';

@Controller('discussions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DiscussionController {
  constructor(private readonly discussionService: DiscussionService) {}

  @Get()
  findAll() {
    return this.discussionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.discussionService.findOne(id);
  }

  @Post()
  create(@Body() createDiscussionDto: Partial<Discussion>) {
    return this.discussionService.create(createDiscussionDto);
  }

  @Put(':id')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateDiscussionDto: Partial<Discussion>) {
    return this.discussionService.update(id, updateDiscussionDto);
  }

  @Delete(':id')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.discussionService.remove(id);
  }

  @Get('course/:courseId')
  findByCourse(@Param('courseId') courseId: string) {
    return this.discussionService.findByCourse(courseId);
  }

  @Post(':id/replies')
  addReply(
    @Param('id') discussionId: string,
    @Body() replyDto: Partial<DiscussionReply>,
  ) {
    return this.discussionService.addReply(discussionId, replyDto);
  }

  @Delete('replies/:replyId')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  removeReply(@Param('replyId') replyId: string) {
    return this.discussionService.removeReply(replyId);
  }

  @Get(':id/replies')
  getReplies(@Param('id') discussionId: string) {
    return this.discussionService.getReplies(discussionId);
  }
}