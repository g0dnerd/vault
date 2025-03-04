import { AuthEntity } from './entities/auth.entity';
import { PrismaService } from '../prisma/prisma.service';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../users/entities/user.entity';
import { Role } from '../users/role.enum';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException(`User not found for email ${email}`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isAdmin = user.roles.includes(Role.Admin);
    return {
      token: this.jwtService.sign({ userId: user.id }),
      isAdmin,
    };
  }

  async register(
    email: string,
    password: string,
    username: string
  ): Promise<AuthEntity> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
    });
    return {
      token: this.jwtService.sign({ userId: user.id }),
    };
  }

  async status(userId: number): Promise<AuthEntity> {
    const user = new UserEntity(
      await this.prisma.user.findUnique({
        where: { id: userId },
      })
    );
    const isAdmin = user.roles.includes(Role.Admin);
    return {
      token: this.jwtService.sign({ userId: user.id }),
      isAdmin,
    };
  }
}
