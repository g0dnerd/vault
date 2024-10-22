import { Module } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { MatchesService } from '../matches/matches.service';

@Module({
  controllers: [ResultsController],
  providers: [ResultsService, MatchesService],
  imports: [PrismaModule],
})
export class ResultsModule { }
