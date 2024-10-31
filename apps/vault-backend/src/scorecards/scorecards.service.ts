import { Injectable } from '@nestjs/common';
import { CreateScorecardDto } from './dto/create-scorecard.dto';
import { UpdateScorecardDto } from './dto/update-scorecard.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ScorecardsService {
  constructor(private prisma: PrismaService) {}

  create(createScorecardDto: CreateScorecardDto) {
    return this.prisma.scorecard.create({ data: createScorecardDto });
  }

  findAll() {
    return this.prisma.scorecard.findMany();
  }

  findOne(id: number) {
    return this.prisma.scorecard.findUnique({ where: { enrollmentId: id } });
  }

  update(id: number, updateScorecardDto: UpdateScorecardDto) {
    return this.prisma.scorecard.update({
      where: { enrollmentId: id },
      data: updateScorecardDto,
    });
  }

  remove(id: number) {
    return this.prisma.scorecard.delete({ where: { enrollmentId: id } });
  }
}
