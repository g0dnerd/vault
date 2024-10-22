import { Module } from '@nestjs/common';
import { ScorecardsService } from './scorecards.service';
import { ScorecardsController } from './scorecards.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [ScorecardsController],
  providers: [ScorecardsService],
  imports: [PrismaModule],
})
export class ScorecardsModule {}
