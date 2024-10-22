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
import { RoundsService } from './rounds.service';
import { CreateRoundDto } from './dto/create-round.dto';
import { UpdateRoundDto } from './dto/update-round.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RoundEntity } from './entities/round.entity';

@Controller('rounds')
@ApiTags('rounds')
export class RoundsController {
  constructor(private readonly roundsService: RoundsService) {}

  @Post()
  @ApiCreatedResponse({ type: RoundEntity })
  create(@Body() createRoundDto: CreateRoundDto) {
    return this.roundsService.create(createRoundDto);
  }

  @Get()
  @ApiOkResponse({ type: RoundEntity, isArray: true })
  findAll() {
    return this.roundsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: RoundEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const round = await this.roundsService.findOne(id);
    if (!round) {
      throw new NotFoundException(`Round with ID ${id} does not exist.`);
    }
    return round;
  }

  @Patch(':id')
  @ApiOkResponse({ type: RoundEntity })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateRoundDto: UpdateRoundDto) {
    return this.roundsService.update(id, updateRoundDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: RoundEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.roundsService.remove(id);
  }
}
