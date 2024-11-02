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
import { PhasesService } from './phases.service';
import { CreatePhaseDto } from './dto/create-phase.dto';
import { UpdatePhaseDto } from './dto/update-phase.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PhaseEntity } from './entities/phase.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('phases')
@ApiTags('phases')
export class PhasesController {
  constructor(private readonly phasesService: PhasesService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: PhaseEntity })
  create(@Body() createPhaseDto: CreatePhaseDto) {
    return this.phasesService.create(createPhaseDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: PhaseEntity, isArray: true })
  findAll() {
    return this.phasesService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: PhaseEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const phase = await this.phasesService.findOne(id);
    if (!phase) {
      throw new NotFoundException(`Phase with ID ${id} does not exist.`);
    }
    return phase;
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: PhaseEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePhaseDto: UpdatePhaseDto
  ) {
    return this.phasesService.update(id, updatePhaseDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: PhaseEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.phasesService.remove(id);
  }
}
