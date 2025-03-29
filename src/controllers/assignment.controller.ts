import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { AssignmentService } from '../services/assignment.service';
import { Assignment } from '../entities/assignment.entity';
import { AssignmentSubmission } from '../entities/assignment-submission.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../entities/user.entity';

@Controller('assignments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}
  @Get()
  findAll() {
    return this.assignmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assignmentService.findOne(id);
  }

  @Post()
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  create(@Body() createAssignmentDto: Partial<Assignment>) {
    return this.assignmentService.create(createAssignmentDto);
  }

  @Put(':id')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateAssignmentDto: Partial<Assignment>) {
    return this.assignmentService.update(id, updateAssignmentDto);
  }

  @Delete(':id')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.assignmentService.remove(id);
  }

  @Get('course/:courseId')
  findByCourse(@Param('courseId') courseId: string) {
    return this.assignmentService.findByCourse(courseId);
  }

  @Post(':id/submit')
  @Roles(UserRole.STUDENT)
  submitAssignment(
    @Param('id') assignmentId: string,
    @Body() submissionDto: Partial<AssignmentSubmission>,
  ) {
    return this.assignmentService.submitAssignment({
      ...submissionDto,
      assignmentId,
    });
  }

  @Get(':id/submissions')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  getSubmissions(@Param('id') assignmentId: string) {
    return this.assignmentService.getSubmissions(assignmentId);
  }

  @Get(':id/submissions/:studentId')
  getStudentSubmission(
    @Param('id') assignmentId: string,
    @Param('studentId') studentId: string,
  ) {
    return this.assignmentService.getStudentSubmission(assignmentId, studentId);
  }
}