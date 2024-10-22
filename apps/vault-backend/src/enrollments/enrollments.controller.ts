import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { EnrollmentEntity } from './entities/enrollment.entity';

@Controller('enrollments')
@ApiTags('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post()
  @ApiCreatedResponse({ type: EnrollmentEntity })
  create(@Body() createEnrollmentDto: CreateEnrollmentDto) {
    return this.enrollmentsService.create(createEnrollmentDto);
  }

  @Get()
  @ApiOkResponse({ type: EnrollmentEntity, isArray: true })
  findAll() {
    return this.enrollmentsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: EnrollmentEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const enrollment = await this.enrollmentsService.findOne(id);
    if (!enrollment) {
      throw new NotFoundException(`Enrollment with ID ${id} does not exist.`);
    }
    return enrollment;
  }

  @Patch(':id')
  @ApiOkResponse({ type: EnrollmentEntity })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateEnrollmentDto: UpdateEnrollmentDto) {
    return this.enrollmentsService.update(id, updateEnrollmentDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: EnrollmentEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.enrollmentsService.remove(id);
  }

  @Get('tournament/:id')
  @ApiOkResponse({ type: EnrollmentEntity, isArray: true })
  findByTournament(@Param('id', ParseIntPipe) id: number) {
    return this.enrollmentsService.findByTournament(id);
  }

  @Get('user/:id')
  @ApiOkResponse({ type: EnrollmentEntity, isArray: true })
  findByUser(@Param('id', ParseIntPipe) id: number) {
    return this.enrollmentsService.findByUser(id);
  }

  @Get('user/:userId/tournament/:tournamentId')
  @ApiOkResponse({ type: EnrollmentEntity })
  findByUserAndTournament(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('tournamentId', ParseIntPipe) tournamentId: number,
  ) {
    return this.enrollmentsService.findByUserAndTournament(userId, tournamentId);
  }
}
