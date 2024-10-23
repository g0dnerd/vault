import { Injectable } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Match } from '@prisma/client';

@Injectable()
export class MatchesService {
  constructor(private prisma: PrismaService) {}

  create(createMatchDto: CreateMatchDto) {
    return this.prisma.match.create({ data: createMatchDto });
  }

  findAll() {
    return this.prisma.match.findMany();
  }

  async findCurrentMatchByUserId(userId: number, tournamentId: number) {
    const draftPlayer = await this.prisma.draftPlayer.findFirst({
      where: {
        enrollment: {
          tournamentId,
          userId,
        },
        draft: {
          started: true,
          finished: false,
        },
      },
    });

    const game = await this.prisma.match.findFirst({
      where: {
        OR: [{ player1Id: draftPlayer.id }, { player2Id: draftPlayer.id }],
        round: {
          started: true,
          finished: false,
        },
      },
      include: {
        player1: {
          select: {
            enrollment: { select: { user: { select: { username: true } } } },
          },
        },
        player2: {
          select: {
            enrollment: { select: { user: { select: { username: true } } } },
          },
        },
      },
    });

    const opponent =
      draftPlayer.id === game.player1Id ? game.player2 : game.player1;

    const result = await this.prisma.result.findUnique({
      where: {
        matchId: game.id,
      },
      select: {
        player1Wins: true,
        player2Wins: true,
        confirmed: true,
        result: true,
      },
    });

    return {
      game,
      result,
      opponent,
    };
  }

  async findFullGameByIdAndUserId(id: number, userId: number) {
    const game = await this.prisma.match.findUnique({
      where: { id },
      include: {
        player1: {
          select: {
            enrollment: { select: { user: { select: { username: true } } } },
          },
        },
        player2: {
          select: {
            enrollment: { select: { user: { select: { username: true } } } },
          },
        },
        round: {
          select: {
            draft: {
              select: {
                phase: true,
              },
            },
          },
        },
      },
    });

    const draftPlayer = await this.prisma.draftPlayer.findFirstOrThrow({
      where: {
        enrollment: {
          tournamentId: game.round.draft.phase.tournamentId,
          userId,
        },
        draft: {
          started: true,
          finished: false,
        },
      },
    });

    const opponent =
      draftPlayer.id === game.player1Id ? game.player2 : game.player1;

    const result = await this.prisma.result.findUnique({
      where: {
        matchId: game.id,
      },
    });

    return {
      game,
      result,
      opponent,
    };
  }

  findOne(id: number) {
    return this.prisma.match.findUnique({
      where: { id },
      include: {
        player1: true,
        player2: true,
      },
    });
  }

  findOtherGamesInRound(playerId: number, roundId: number) {
    return this.prisma.match.findMany({
      where: {
        round: {
          id: roundId,
          started: true,
          finished: false,
        },
        player1Id: {
          not: playerId,
        },
        player2Id: {
          not: playerId,
        },
      },
    });
  }

  update(id: number, updateMatchDto: UpdateMatchDto) {
    return this.prisma.match.update({ where: { id }, data: updateMatchDto });
  }

  remove(id: number) {
    return this.prisma.match.delete({ where: { id } });
  }
}
