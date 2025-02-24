import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { PrismaService } from '../prisma/prisma.service';
import { MatchGateway } from './matches.gateway';
import { Role } from '@prisma/client';
import { eloProportionality } from '@vault/shared';

@Injectable()
export class MatchesService {
  constructor(
    private prisma: PrismaService,
    private readonly matchGateway: MatchGateway
  ) {}

  create(createMatchDto: CreateMatchDto) {
    return this.prisma.match.create({ data: createMatchDto });
  }

  findOngoing() {
    return this.prisma.match.findMany({
      where: {
        round: {
          draft: {
            started: true,
            finished: false,
          },
        },
      },
      include: {
        round: {
          select: { draftId: true },
        },
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
  }

  findAll() {
    return this.prisma.match.findMany({
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
  }

  async findForDraft(draftId: number) {
    const games = await this.prisma.match.findMany({
      where: {
        round: {
          draftId,
          draft: {
            started: true,
            finished: false,
          },
        },
      },
      include: {
        round: {
          select: { draftId: true },
        },
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
    return games;
  }

  async findCurrentMatchByUserId(userId: number, tournamentId: number) {
    // Find the active match for given user's draft player
    const game = await this.prisma.match.findFirst({
      where: {
        OR: [
          { player1: { enrollment: { tournamentId, userId } } },
          { player2: { enrollment: { tournamentId, userId } } },
        ],
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

    return game;
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

  async update(id: number, updateMatchDto: UpdateMatchDto) {
    return this.prisma.match.update({ where: { id }, data: updateMatchDto });
  }

  async reportResult(
    userId: number,
    matchId: number,
    updateMatchDto: UpdateMatchDto
  ) {
    // Destructure the updateMatchDto and check if the reporting user
    // is authorized to change this match
    const g = await this.prisma.match.findUnique({ where: { id: matchId } });
    if (userId != g.player1Id && userId != g.player2Id) {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });
      console.log(`dto: ${JSON.stringify(updateMatchDto)}`);
      console.log(JSON.stringify(user));
      // If the user is not a player in the game, they need to be
      // an admin to be authorized to update the match
      if (!user.roles.includes(Role.ADMIN)) {
        throw new UnauthorizedException(
          'User is not authorized to update this match'
        );
      } else {
        // If the user is an admin, the result is automatically confirmed as well
        updateMatchDto = {
          ...updateMatchDto,
          reportedById: null,
          resultConfirmed: true,
        };
      }
    }
    const game = await this.prisma.match.update({
      where: { id: matchId },
      data: updateMatchDto,
    });

    this.matchGateway.handleMatchUpdate(game);
    return game;
  }

  async confirmResult(
    userId: number,
    matchId: number,
    _updateMatchDto: UpdateMatchDto
  ) {
    // Destructure the updateMatchDto and check if the reporting user
    // is authorized to change this match
    const g = await this.prisma.match.findUnique({
      where: { id: matchId },
      include: {
        player1: {
          select: {
            enrollment: { select: { id: true, userId: true, elo: true } },
          },
        },
        player2: {
          select: {
            enrollment: { select: { id: true, userId: true, elo: true } },
          },
        },
      },
    });

    // If the user is not a player in the game, they need to be
    // an admin to be authorized to update the match
    if (
      userId != g.player1.enrollment.userId &&
      userId != g.player2.enrollment.userId
    ) {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user.roles.includes(Role.ADMIN)) {
        throw new UnauthorizedException(
          'User is not authorized to update this match'
        );
      }
    }

    const game = await this.prisma.match.update({
      where: { id: matchId },
      include: {
        round: {
          select: {
            draft: { select: { phase: { select: { tournament: true } } } },
          },
        },
      },
      data: { resultConfirmed: true },
    });

    if (game.round.draft.phase.tournament.isLeague) {
      if (!g.player1.enrollment.elo || !g.player1.enrollment.elo) {
        throw new InternalServerErrorException('Could not update elo');
      }
      const p1WinProbability = Math.pow(
        1 +
          10 *
            ((g.player2.enrollment.elo - g.player1.enrollment.elo) / 1135.77),
        -1
      );

      const p2WinProbability = 1 - p1WinProbability;
      let p1EloNew = 0;
      let p2EloNew = 0;

      if (game.player1Wins > game.player2Wins) {
        const p1EloGain = p2WinProbability * eloProportionality;
        p1EloNew = g.player1.enrollment.elo + p1EloGain;
        p2EloNew = g.player2.enrollment.elo - p1EloGain;
      } else if (game.player1Wins < game.player2Wins) {
        const p2EloGain = p1WinProbability * eloProportionality;
        p1EloNew = g.player1.enrollment.elo - p2EloGain;
        p2EloNew = g.player2.enrollment.elo + p2EloGain;
      } else {
        const eloGain = p2WinProbability * eloProportionality;
        p1EloNew = g.player1.enrollment.elo + eloGain / 2;
        p2EloNew = g.player2.enrollment.elo - eloGain / 2;
      }

      await this.prisma.enrollment.update({
        where: {
          id: g.player1.enrollment.id,
        },
        data: {
          elo: p1EloNew,
        },
      });
      await this.prisma.enrollment.update({
        where: {
          id: g.player2.enrollment.id,
        },
        data: {
          elo: p2EloNew,
        },
      });
    }

    this.matchGateway.handleMatchUpdate(game);
    return game;
  }

  remove(id: number) {
    return this.prisma.match.delete({ where: { id } });
  }
}
