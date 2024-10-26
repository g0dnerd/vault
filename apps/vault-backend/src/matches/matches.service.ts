import { Injectable } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { PrismaService } from '../prisma/prisma.service';

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
    // Find the active draft player for the given user and tournament
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

    // Find the active match for that draft player
    const game = await this.prisma.match.findFirst({
      where: {
        OR: [{ player1Id: draftPlayer.id }, { player2Id: draftPlayer.id }],
        round: {
          started: true,
          finished: false,
        },
      },
      // Include userId and username for both players
      // so that we can return information on the opponent
      include: {
        player1: {
          select: {
            enrollment: {
              select: {
                userId: true,
                user: { select: { username: true } },
              },
            },
          },
        },
        player2: {
          select: {
            enrollment: {
              select: {
                userId: true,
                user: { select: { username: true } },
              },
            },
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
        reportedBy: {
          select: {
            enrollment: {
              select: {
                userId: true,
              },
            },
          },
        },
      },
    });

    // Return the match, the result and the opponent
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
            enrollment: {
              select: {
                userId: true,
                user: { select: { username: true } },
              },
            },
          },
        },
        player2: {
          select: {
            enrollment: {
              select: {
                userId: true,
                user: { select: { username: true } },
              },
            },
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
      // TODO: Just return the reported by draft player ID instead and have that in redux in the frontend
      include: {
        reportedBy: {
          select: {
            enrollment: {
              select: {
                userId: true,
              },
            },
          },
        },
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
