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
import { ScorecardsService } from './scorecards.service';
import { CreateScorecardDto } from './dto/create-scorecard.dto';
import { UpdateScorecardDto } from './dto/update-scorecard.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ScorecardEntity } from './entities/scorecard.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('scorecards')
@ApiTags('scorecards')
export class ScorecardsController {
  constructor(private readonly scorecardsService: ScorecardsService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: ScorecardEntity })
  create(@Body() createScorecardDto: CreateScorecardDto) {
    return this.scorecardsService.create(createScorecardDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: ScorecardEntity, isArray: true })
  findAll() {
    return this.scorecardsService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: ScorecardEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const scorecard = await this.scorecardsService.findOne(id);
    if (!scorecard) {
      throw new NotFoundException(`Scorecard with ID ${id} does not exist.`);
    }
    return scorecard;
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: ScorecardEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateScorecardDto: UpdateScorecardDto
  ) {
    return this.scorecardsService.update(id, updateScorecardDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: ScorecardEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.scorecardsService.remove(id);
  }
}
