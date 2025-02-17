import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Role } from '../users/role.enum';

@Injectable()
export class ImagesService {
  constructor(private prisma: PrismaService) {}

  create(createImageDto: CreateImageDto) {
    return this.prisma.image.create({ data: createImageDto });
  }

  async findAll(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user.roles.includes(Role.Admin)) {
      return this.prisma.image.findMany({
        where: {
          draftPlayer: {
            enrollment: {
              userId,
            },
          },
        },
      });
    }
    return this.prisma.image.findMany();
  }

  async findOne(id: number, userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user.roles.includes(Role.Admin)) {
      const image = await this.prisma.image.findUnique({
        where: { id },
        include: {
          draftPlayer: {
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
      if (image.draftPlayer.enrollment.userId !== userId) {
        throw new UnauthorizedException(
          'User is not authorized to view this image'
        );
      }
    }
    return this.prisma.image.findUnique({ where: { id } });
  }

  async update(id: number, updateImageDto: UpdateImageDto, userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user.roles.includes(Role.Admin)) {
      const image = await this.prisma.image.findUnique({
        where: { id },
        include: {
          draftPlayer: {
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
      if (image.draftPlayer.enrollment.userId !== userId) {
        throw new UnauthorizedException(
          'User is not authorized to update this image'
        );
      }
    }
    return this.prisma.image.update({ where: { id }, data: updateImageDto });
  }

  async remove(id: number, userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user.roles.includes(Role.Admin)) {
      const image = await this.prisma.image.findUnique({
        where: { id },
        include: {
          draftPlayer: {
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
      if (image.draftPlayer.enrollment.userId !== userId) {
        throw new UnauthorizedException(
          'User is not authorized to delete this image'
        );
      }
    }
    return this.prisma.image.delete({ where: { id } });
  }
}
