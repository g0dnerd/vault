import { Injectable } from '@nestjs/common';
import { CreateDraftScorecardDto } from './dto/create-draft-scorecard.dto';
import { UpdateDraftScorecardDto } from './dto/update-draft-scorecard.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DraftScorecardsService {
  constructor(private prisma: PrismaService) {}

  create(createDraftScorecardDto: CreateDraftScorecardDto) {
    return this.prisma.draftScorecard.create({ data: createDraftScorecardDto });
  }

  findAll() {
    return this.prisma.draftScorecard.findMany();
  }

  findAllInDraft(draftId: number) {
    return this.prisma.draftScorecard.findMany({
      where: {
        player: {
          draftId,
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.draftScorecard.findUnique({ where: { id } });
  }

  update(id: number, updateDraftScorecardDto: UpdateDraftScorecardDto) {
    return this.prisma.draftScorecard.update({
      where: { id },
      data: updateDraftScorecardDto,
    });
  }

  remove(id: number) {
    return this.prisma.draftScorecard.delete({ where: { id } });
  }
}
