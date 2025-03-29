import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { LessonService } from '../services/lesson.service';
import { Lesson } from '../entities/lesson.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../entities/user.entity';

@Controller('lessons')
@UseGuards(JwtAuthGuard, RolesGuard)
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Get()
  findAll() {
    return this.lessonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonService.findOne(id);
  }

  @Post()
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  create(@Body() createLessonDto: Partial<Lesson>) {
    return this.lessonService.create(createLessonDto);
  }

  @Put(':id')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateLessonDto: Partial<Lesson>) {
    return this.lessonService.update(id, updateLessonDto);
  }

  @Delete(':id')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.lessonService.remove(id);
  }

  @Get('course/:courseId')
  findByCourse(@Param('courseId') courseId: string) {
    return this.lessonService.findByCourse(courseId);
  }
}