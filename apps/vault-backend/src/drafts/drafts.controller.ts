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
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { DraftsService } from './drafts.service';
import { CreateDraftDto } from './dto/create-draft.dto';
import { UpdateDraftDto } from './dto/update-draft.dto';
import { DraftEntity } from './entities/draft.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('drafts')
@ApiTags('drafts')
export class DraftsController {
  constructor(private readonly draftsService: DraftsService) { }

  @Post()
  @ApiCreatedResponse({ type: DraftEntity })
  create(@Body() createDraftDto: CreateDraftDto) {
    return this.draftsService.create(createDraftDto);
  }

  @Get()
  @ApiOkResponse({ type: DraftEntity, isArray: true })
  findAll() {
    return this.draftsService.findAll();
  }

  @Get('current')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: DraftEntity })
  async getCurrentDraft(@Request() req) {
    const currentDraft = await this.draftsService.getCurrentDraft(req.user.id)
      .catch(() => {
        throw new NotFoundException('No draft found for current user');
      });
    return currentDraft;
  }

  @Get(':tournamentId/ongoing')
  @ApiOkResponse({ type: DraftEntity, isArray: true })
  getOngoingDraftsForTournament(@Param('tournamentId', ParseIntPipe) tournamentId: number) {
    return this.draftsService.getOngoingDraftsForTournament(tournamentId);
  }

  @Get(':userId/current')
  @ApiOkResponse({ type: DraftEntity })
  getCurrentDraftForUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.draftsService.getCurrentDraft(userId);
  }

  @Get(':id')
  @ApiOkResponse({ type: DraftEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const draft = await this.draftsService.findOne(id);
    if (!draft) {
      throw new NotFoundException(`Draft with ID ${id} does not exist.`);
    }
    return draft;
  }

  @Patch(':id')
  @ApiOkResponse({ type: DraftEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDraftDto: UpdateDraftDto
  ) {
    return this.draftsService.update(id, updateDraftDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: DraftEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.draftsService.remove(id);
  }
}
