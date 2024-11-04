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
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { DraftsService } from './drafts.service';
import { CreateDraftDto } from './dto/create-draft.dto';
import { UpdateDraftDto } from './dto/update-draft.dto';
import { DraftEntity } from './entities/draft.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('drafts')
@ApiTags('drafts')
export class DraftsController {
  constructor(private readonly draftsService: DraftsService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: DraftEntity })
  create(@Body() createDraftDto: CreateDraftDto) {
    return this.draftsService.create(createDraftDto);
  }

  @Get()
  @ApiOkResponse({ type: DraftEntity, isArray: true })
  findAll() {
    return this.draftsService.findAll();
  }

  @Get('current/:tournamentId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: DraftEntity })
  async getCurrentDraft(
    @Req() req: Request,
    @Param('tournamentId', ParseIntPipe) tournamentId: number
  ) {
    const currentDraft = await this.draftsService
      .getCurrentDraft(req.user['id'], tournamentId)
      .catch(() => {
        throw new NotFoundException('No draft found for current user');
      });
    return currentDraft;
  }

  @Get(':tournamentId/ongoing')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: DraftEntity, isArray: true })
  getOngoingDraftsForTournament(
    @Param('tournamentId', ParseIntPipe) tournamentId: number
  ) {
    return this.draftsService.getOngoingDraftsForTournament(tournamentId);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: DraftEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const draft = await this.draftsService.findOne(id);
    if (!draft) {
      throw new NotFoundException(`Draft with ID ${id} does not exist.`);
    }
    return draft;
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: DraftEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDraftDto: UpdateDraftDto
  ) {
    return this.draftsService.update(id, updateDraftDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: DraftEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.draftsService.remove(id);
  }
}
