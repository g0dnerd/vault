import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { PrismaService } from '../prisma/prisma.service';
import { MatchesService } from '../matches/matches.service';

@Injectable()
export class ResultsService {
  constructor(
    private prisma: PrismaService,
    private matchesService: MatchesService
  ) {}

  async create(userId: number, createResultDto: CreateResultDto) {
    const { matchId, player1Wins, player2Wins } = createResultDto;
    const result =
      player1Wins === player2Wins ? 0 : player1Wins > player2Wins ? -1 : 1;
    await this.prisma.result.upsert({
      where: {
        matchId,
      },
      update: {
        confirmed: true,
      },
      create: {
        matchId,
        player1Wins,
        player2Wins,
        result,
        reportedById: userId,
        confirmed: false,
      },
    });

    return await this.matchesService.findFullGameByIdAndUserId(matchId, userId);
  }

  findAll() {
    return this.prisma.result.findMany();
  }

  findOne(id: number) {
    return this.prisma.result.findUnique({ where: { matchId: id } });
  }

  async update(userId: number, id: number, updateResultDto: UpdateResultDto) {
    // Find the result without modifying it
    const result = await this.prisma.result.findUnique({
      where: { matchId: id },
      include: {
        match: {
          select: {
            player1Id: true,
            player2Id: true,
            id: true,
          },
        },
      },
    });

    // Only the player that has not reported the result may confirm it
    if (
      userId == result.reportedById ||
      (userId != result.match.player1Id && userId != result.match.player2Id)
    ) {
      throw new UnauthorizedException(
        'Player is not authorized to confirm this result'
      );
    }

    // Actually modify the result and set `confirmed` to true
    await this.prisma.result.update({
      where: { matchId: id },
      data: updateResultDto,
    });

    // Let `matchesService` handle returning the updated match,
    // including the result
    return await this.matchesService.findFullGameByIdAndUserId(
      result.match.id,
      userId
    );
  }

  remove(id: number) {
    return this.prisma.result.delete({ where: { matchId: id } });
  }
}
