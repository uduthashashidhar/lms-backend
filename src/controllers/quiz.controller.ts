import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { QuizService } from '../services/quiz.service';
import { Quiz } from '../entities/quiz.entity';
import { QuizSubmission } from '../entities/quiz-submission.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../entities/user.entity';

@Controller('quizzes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  findAll() {
    return this.quizService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizService.findOne(id);
  }

  @Post()
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  create(@Body() createQuizDto: Partial<Quiz>) {
    return this.quizService.create(createQuizDto);
  }

  @Put(':id')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateQuizDto: Partial<Quiz>) {
    return this.quizService.update(id, updateQuizDto);
  }

  @Delete(':id')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.quizService.remove(id);
  }

  @Get('course/:courseId')
  findByCourse(@Param('courseId') courseId: string) {
    return this.quizService.findByCourse(courseId);
  }

  @Post(':id/submit')
  @Roles(UserRole.STUDENT)
  submitQuiz(
    @Param('id') quizId: string,
    @Body() submissionDto: Partial<QuizSubmission>,
  ) {
    return this.quizService.submitQuiz({
      ...submissionDto,
      quizId,
    });
  }

  @Put(':id/submissions/:submissionId/grade')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  gradeQuiz(
    @Param('submissionId') submissionId: string,
    @Body('score') score: number,
  ) {
    return this.quizService.gradeQuiz(submissionId, score);
  }

  @Get(':id/submissions')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  getSubmissions(@Param('id') quizId: string) {
    return this.quizService.getSubmissions(quizId);
  }

  @Get(':id/submissions/:studentId')
  getStudentSubmission(
    @Param('id') quizId: string,
    @Param('studentId') studentId: string,
  ) {
    return this.quizService.getStudentSubmission(quizId, studentId);
  }
}