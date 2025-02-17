import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { CreateDraftPlayerDto } from './dto/create-draft-player.dto';
import { UpdateDraftPlayerDto } from './dto/update-draft-player.dto';

@Injectable()
export class DraftPlayersService {
  constructor(private prisma: PrismaService) {}

  create(createDraftPlayerDto: CreateDraftPlayerDto) {
    return this.prisma.draftPlayer.create({ data: createDraftPlayerDto });
  }

  findAll() {
    return this.prisma.draftPlayer.findMany();
  }

  findOne(id: number) {
    return this.prisma.draftPlayer.findUnique({ where: { id } });
  }

  update(id: number, updateDraftPlayerDto: UpdateDraftPlayerDto) {
    return this.prisma.draftPlayer.update({
      where: { id },
      data: updateDraftPlayerDto,
    });
  }

  remove(id: number) {
    return this.prisma.draftPlayer.delete({ where: { id } });
  }

  findByTournament(tournamentId: number) {
    return this.prisma.draftPlayer.findMany({
      where: {
        enrollment: {
          tournamentId,
        },
      },
    });
  }

  async findByUser(userId: number) {
    return this.prisma.draftPlayer.findMany({
      where: {
        enrollment: {
          userId,
        },
      },
      include: {
        enrollment: true,
      },
    });
  }
}
