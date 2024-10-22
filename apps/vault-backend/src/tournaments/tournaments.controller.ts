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
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TournamentEntity } from './entities/tournament.entity';
import { TournamentsService } from './tournaments.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tournaments')
@ApiTags('tournaments')
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) {}

  @Post()
  @ApiCreatedResponse({ type: TournamentEntity })
  create(@Body() createTournamentDto: CreateTournamentDto) {
    return this.tournamentsService.create(createTournamentDto);
  }

  @Get()
  @ApiOkResponse({ type: TournamentEntity, isArray: true })
  findAll() {
    return this.tournamentsService.findAll();
  }

  @Get('enrolled')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: TournamentEntity, isArray: true })
  async findEnrolled(@Request() req) {
    return this.findByUser(req.user.id);
  }

  @Get('available')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: TournamentEntity, isArray: true })
  async findAvailable(@Request() req) {
    return this.findAvailableForUser(req.user.id);
  }

  @Get(':userId/enrolled')
  @ApiOkResponse({ type: TournamentEntity, isArray: true })
  findByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.tournamentsService.findByUser(userId);
  }

  @Get(':userId/available')
  @ApiOkResponse({ type: TournamentEntity, isArray: true })
  findAvailableForUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.tournamentsService.findAvailableForUser(userId);
  }

  @Get(':id')
  @ApiOkResponse({ type: TournamentEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const tournament = await this.tournamentsService.findOne(id);
    if (!tournament) {
      throw new NotFoundException(`Tournament with ID ${id} does not exist.`);
    }
    return tournament;
  }

  @Patch(':id')
  @ApiOkResponse({ type: TournamentEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTournamentDto: UpdateTournamentDto,
  ) {
    return this.tournamentsService.update(id, updateTournamentDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: TournamentEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tournamentsService.remove(id);
  }
}
