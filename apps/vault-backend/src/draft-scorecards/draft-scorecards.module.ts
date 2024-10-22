import { Module } from '@nestjs/common';
import { DraftScorecardsService } from './draft-scorecards.service';
import { DraftScorecardsController } from './draft-scorecards.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [DraftScorecardsController],
  providers: [DraftScorecardsService],
  imports: [PrismaModule],
})
export class DraftScorecardsModule {}
