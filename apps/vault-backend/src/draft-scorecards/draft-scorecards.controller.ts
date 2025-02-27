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

import { DraftScorecardsService } from './draft-scorecards.service';
import { CreateDraftScorecardDto } from './dto/create-draft-scorecard.dto';
import { UpdateDraftScorecardDto } from './dto/update-draft-scorecard.dto';
import { DraftScorecardEntity } from './entities/draft-scorecard.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('draft-scorecards')
@ApiTags('draft-scorecards')
export class DraftScorecardsController {
  constructor(
    private readonly draftScorecardsService: DraftScorecardsService
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: DraftScorecardEntity })
  create(@Body() createDraftScorecardDto: CreateDraftScorecardDto) {
    return this.draftScorecardsService.create(createDraftScorecardDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: DraftScorecardEntity, isArray: true })
  findAll() {
    return this.draftScorecardsService.findAll();
  }

  @Get('draft/:draftId/round/:roundIdx')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: DraftScorecardEntity, isArray: true })
  findAllInRound(@Param('draftId', ParseIntPipe) draftId: number) {
    return this.draftScorecardsService.findAllInDraft(draftId);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: DraftScorecardEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const draftScorecard = await this.draftScorecardsService.findOne(id);
    if (!draftScorecard) {
      throw new NotFoundException(
        `DraftScorecard with ID ${id} does not exist.`
      );
    }
    return draftScorecard;
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: DraftScorecardEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDraftScorecardDto: UpdateDraftScorecardDto
  ) {
    return this.draftScorecardsService.update(id, updateDraftScorecardDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: DraftScorecardEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.draftScorecardsService.remove(id);
  }
}
