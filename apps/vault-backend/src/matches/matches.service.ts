import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { PrismaService } from '../prisma/prisma.service';
import { MatchGateway } from './matches.gateway';
import { Role } from '@prisma/client';

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
      // If the user is not a player in the game, they need to be
      // an admin to be authorized to update the match
      if (!user.roles.includes(Role.ADMIN)) {
        throw new UnauthorizedException(
          'User is not authorized to update this match'
        );
      } else {
        // If the user is an admin, the result is automatically confirmed as well
        updateMatchDto = { ...updateMatchDto, resultConfirmed: true };
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
    const g = await this.prisma.match.findUnique({ where: { id: matchId } });
    if (userId != g.reportedById) {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });
      // If the user is not a player in the game, they need to be
      // an admin to be authorized to update the match
      if (!user.roles.includes(Role.ADMIN)) {
        throw new UnauthorizedException(
          'User is not authorized to update this match'
        );
      }
    }
    const game = await this.prisma.match.update({
      where: { id: matchId },
      data: { resultConfirmed: true },
    });

    this.matchGateway.handleMatchUpdate(game);
    return game;
  }

  remove(id: number) {
    return this.prisma.match.delete({ where: { id } });
  }
}
