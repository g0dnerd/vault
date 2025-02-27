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
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { EnrollmentEntity } from './entities/enrollment.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('enrollments')
@ApiTags('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: EnrollmentEntity })
  create(@Body() createEnrollmentDto: CreateEnrollmentDto) {
    return this.enrollmentsService.create(createEnrollmentDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: EnrollmentEntity, isArray: true })
  findAll() {
    return this.enrollmentsService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: EnrollmentEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const enrollment = await this.enrollmentsService.findOne(id);
    if (!enrollment) {
      throw new NotFoundException(`Enrollment with ID ${id} does not exist.`);
    }
    return enrollment;
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: EnrollmentEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEnrollmentDto: UpdateEnrollmentDto
  ) {
    return this.enrollmentsService.update(id, updateEnrollmentDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: EnrollmentEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.enrollmentsService.remove(id);
  }

  @Get('tournament/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: EnrollmentEntity, isArray: true })
  findByTournament(@Param('id', ParseIntPipe) id: number) {
    return this.enrollmentsService.findByTournament(id);
  }

  @Get('user/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: EnrollmentEntity, isArray: true })
  findByUser(@Param('id', ParseIntPipe) id: number) {
    return this.enrollmentsService.findByUser(id);
  }

  @Get('user/:userId/tournament/:tournamentId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: EnrollmentEntity })
  findByUserAndTournament(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('tournamentId', ParseIntPipe) tournamentId: number
  ) {
    return this.enrollmentsService.findByUserAndTournament(
      userId,
      tournamentId
    );
  }
}
