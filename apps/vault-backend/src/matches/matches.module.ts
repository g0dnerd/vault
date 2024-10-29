import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { MatchGateway } from './matches.gateway';

@Module({
  controllers: [MatchesController],
  providers: [MatchesService, MatchGateway],
  imports: [PrismaModule],
})
export class MatchesModule {}
