import { Injectable } from '@nestjs/common';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { PrismaService } from '../prisma/prisma.service';
import { MatchesService } from '../matches/matches.service';

@Injectable()
export class ResultsService {
  constructor(private prisma: PrismaService, private matchesService: MatchesService) { }

  async create(userId: number, createResultDto: CreateResultDto) {
    const { matchId, player1Wins, player2Wins } = createResultDto;
    const resultInt = player1Wins === player2Wins ? 0 : player1Wins > player2Wins ? -1 : 1;
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
        result: resultInt,
        reportedById: userId,
        confirmed: false,
      }
    });

    return await this.matchesService.findFullGameByIdAndUserId(matchId, userId);
  }

  findAll() {
    return this.prisma.result.findMany();
  }

  findOne(id: number) {
    return this.prisma.result.findUnique({ where: { matchId: id } });
  }

  update(id: number, updateResultDto: UpdateResultDto) {
    return this.prisma.result.update({ where: { matchId: id }, data: updateResultDto });
  }

  remove(id: number) {
    return this.prisma.result.delete({ where: { matchId: id } });
  }
}
