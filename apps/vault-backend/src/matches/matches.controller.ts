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
import { MatchesService } from './matches.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MatchEntity } from './entities/match.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('matches')
@ApiTags('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Post()
  @ApiCreatedResponse({ type: MatchEntity })
  create(@Body() createMatchDto: CreateMatchDto) {
    return this.matchesService.create(createMatchDto);
  }

  @Get()
  @ApiOkResponse({ type: MatchEntity, isArray: true })
  findAll() {
    return this.matchesService.findAll();
  }

  @Get('draft/:draftId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: MatchEntity, isArray: true })
  findForDraft(@Param('draftId', ParseIntPipe) draftId: number) {
    return this.matchesService.findForDraft(draftId);
  }

  @Get('current/:tournamentId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: MatchEntity })
  /// Gets the currently active match for the current user,
  /// where id is a tournament ID.
  findCurrentUserCurrentMatch(
    @Request() req,
    @Param('tournamentId', ParseIntPipe) tournamentId: number
  ) {
    return this.matchesService.findCurrentMatchByUserId(
      req.user.id,
      tournamentId
    );
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
  @ApiOkResponse({ type: MatchEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const match = await this.matchesService.findOne(id);
    if (!match) {
      throw new NotFoundException(`Match with ID ${id} does not exist.`);
    }
    return match;
  }

  @Patch(':id')
  @ApiOkResponse({ type: MatchEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMatchDto: UpdateMatchDto
  ) {
    return this.matchesService.update(id, updateMatchDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: MatchEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.matchesService.remove(id);
  }
}
