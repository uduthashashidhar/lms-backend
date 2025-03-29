import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { CertificateService } from '../services/certificate.service';
import { Certificate } from '../entities/certificate.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../entities/user.entity';

@Controller('certificates')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) {}

  @Get()
  findAll() {
    return this.certificateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.certificateService.findOne(id);
  }

  @Get('student/:studentId')
  findByStudent(@Param('studentId') studentId: string) {
    return this.certificateService.findByStudent(studentId);
  }

  @Get('course/:courseId')
  findByCourse(@Param('courseId') courseId: string) {
    return this.certificateService.findByCourse(courseId);
  }

  @Post('generate/:studentId/:courseId')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  generate(
    @Param('studentId') studentId: string,
    @Param('courseId') courseId: string,
  ) {
    return this.certificateService.create(studentId, courseId);
  }

  @Get('verify/:certificateNumber')
  verify(@Param('certificateNumber') certificateNumber: string) {
    return this.certificateService.verify(certificateNumber);
  }
}