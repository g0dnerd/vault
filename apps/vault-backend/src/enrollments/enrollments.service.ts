import { Injectable } from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  create(createEnrollmentDto: CreateEnrollmentDto) {
    return this.prisma.enrollment.create({ data: createEnrollmentDto, include: { tournament: true } });
  }

  findAll() {
    return this.prisma.enrollment.findMany();
  }

  findOne(id: number) {
    return this.prisma.enrollment.findUnique({
      where: { id },
      include: {
        tournament: true,
      },
    });
  }

  update(id: number, updateEnrollmentDto: UpdateEnrollmentDto) {
    return this.prisma.enrollment.update({
      where: { id },
      data: updateEnrollmentDto,
    });
  }

  remove(id: number) {
    return this.prisma.enrollment.delete({ where: { id } });
  }

  findByTournament(tournamentId: number) {
    return this.prisma.enrollment.findMany({
      where: { tournamentId },
      include: {
        user: true,
      },
    });
  }

  findByUser(id: number) {
    return this.prisma.enrollment.findMany({
      where: { userId: id },
      include: {
        tournament: true,
      },
    });
  }

  findByUserAndTournament(userId: number, tournamentId: number) {
    return this.prisma.enrollment.findFirstOrThrow({
      where: {
        userId,
        tournamentId,
      },
    });
  }
}
