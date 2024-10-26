import { Injectable } from '@nestjs/common';
import { CreateDraftDto } from './dto/create-draft.dto';
import { UpdateDraftDto } from './dto/update-draft.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DraftsService {
  constructor(private prisma: PrismaService) {}

  create(createDraftDto: CreateDraftDto) {
    return this.prisma.draft.create({ data: createDraftDto });
  }

  findAll() {
    return this.prisma.draft.findMany();
  }

  findOne(id: number) {
    return this.prisma.draft.findUnique({
      where: { id },
      include: {
        players: {
          select: {
            enrollment: {
              select: {
                user: {
                  select: {
                    username: true,
                  },
                },
              },
            },
          },
        },
        cube: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  update(id: number, updateDraftDto: UpdateDraftDto) {
    return this.prisma.draft.update({ where: { id }, data: updateDraftDto });
  }

  remove(id: number) {
    return this.prisma.draft.delete({ where: { id } });
  }

  getOngoingDraftsForTournament(tournamentId: number) {
    return this.prisma.draft.findMany({
      where: {
        started: true,
        finished: false,
        phase: {
          tournamentId,
        },
      },
      include: {
        players: true,
      },
    });
  }

  async getCurrentDraft(userId: number) {
    const enrollments = await this.prisma.enrollment.findMany({
      where: { userId: userId },
    });
    const draftPlayer = await this.prisma.draftPlayer.findFirstOrThrow({
      where: {
        enrollmentId: {
          in: enrollments.map((enrollment) => enrollment.id),
        },
        draft: {
          started: true,
          finished: false,
        },
      },
      select: {
        draft: true,
      },
    });
    return draftPlayer.draft;
  }
}
