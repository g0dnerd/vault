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
import { Request } from 'express';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { MatchEntity } from './entities/match.entity';
import { MatchesService } from './matches.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('matches')
@ApiTags('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: MatchEntity })
  create(@Body() createMatchDto: CreateMatchDto) {
    return this.matchesService.create(createMatchDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: MatchEntity, isArray: true })
  findAll() {
    return this.matchesService.findAll();
  }

  @Get('ongoing')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: MatchEntity, isArray: true })
  findOngoing() {
    return this.matchesService.findOngoing();
  }

  @Get('draft/:draftId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: MatchEntity, isArray: true })
  findForDraft(@Param('draftId', ParseIntPipe) draftId: number) {
    return this.matchesService.findForDraft(draftId);
  }

  @Get(':id/current/:tournamentId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: MatchEntity })
  findCurrentMatchForUserId(
    @Param('id', ParseIntPipe) id: number,
    @Param('tournamentId', ParseIntPipe) tournamentId: number
  ) {
    return this.matchesService.findCurrentMatchByUserId(id, tournamentId);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: MatchEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const match = await this.matchesService.findOne(id);
    if (!match) {
      throw new NotFoundException(`Match with ID ${id} does not exist.`);
    }
    return match;
  }

  // TODO: Ensure that only this request is only possible for
  // privileged users at certain times
  @Patch('/report/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: MatchEntity })
  reportResult(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMatchDto: UpdateMatchDto
  ) {
    return this.matchesService.reportResult(req.user['id'], id, updateMatchDto);
  }

  @Patch('/confirm/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: MatchEntity })
  confirmResult(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMatchDto: UpdateMatchDto
  ) {
    return this.matchesService.confirmResult(
      req.user['id'],
      id,
      updateMatchDto
    );
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: MatchEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMatchDto: UpdateMatchDto
  ) {
    return this.matchesService.update(id, updateMatchDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: MatchEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.matchesService.remove(id);
  }
}
