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
import { PhasesService } from './phases.service';
import { CreatePhaseDto } from './dto/create-phase.dto';
import { UpdatePhaseDto } from './dto/update-phase.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PhaseEntity } from './entities/phase.entity';

@Controller('phases')
@ApiTags('phases')
export class PhasesController {
  constructor(private readonly phasesService: PhasesService) {}

  @Post()
  @ApiCreatedResponse({ type: PhaseEntity })
  create(@Body() createPhaseDto: CreatePhaseDto) {
    return this.phasesService.create(createPhaseDto);
  }

  @Get()
  @ApiOkResponse({ type: PhaseEntity, isArray: true })
  findAll() {
    return this.phasesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: PhaseEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const phase = await this.phasesService.findOne(id);
    if (!phase) {
      throw new NotFoundException(`Phase with ID ${id} does not exist.`);
    }
    return phase;
  }

  @Patch(':id')
  @ApiOkResponse({ type: PhaseEntity })
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePhaseDto: UpdatePhaseDto) {
    return this.phasesService.update(id, updatePhaseDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: PhaseEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.phasesService.remove(id);
  }
}
