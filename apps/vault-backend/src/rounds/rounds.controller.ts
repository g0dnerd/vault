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
import { RoundsService } from './rounds.service';
import { CreateRoundDto } from './dto/create-round.dto';
import { UpdateRoundDto } from './dto/update-round.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RoundEntity } from './entities/round.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('rounds')
@ApiTags('rounds')
export class RoundsController {
  constructor(private readonly roundsService: RoundsService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: RoundEntity })
  create(@Body() createRoundDto: CreateRoundDto) {
    return this.roundsService.create(createRoundDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: RoundEntity, isArray: true })
  findAll() {
    return this.roundsService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: RoundEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const round = await this.roundsService.findOne(id);
    if (!round) {
      throw new NotFoundException(`Round with ID ${id} does not exist.`);
    }
    return round;
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: RoundEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoundDto: UpdateRoundDto
  ) {
    return this.roundsService.update(id, updateRoundDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: RoundEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.roundsService.remove(id);
  }
}
