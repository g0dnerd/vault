import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { TournamentsModule } from '../tournaments/tournaments.module';
import { UsersModule } from '../users/users.module';
import { EnrollmentsModule } from '../enrollments/enrollments.module';
import { MatchesModule } from '../matches/matches.module';
import { AuthModule } from '../auth/auth.module';
import { ImagesModule } from '../images/images.module';
import { CubesModule } from '../cubes/cubes.module';
import { RoundsModule } from '../rounds/rounds.module';
import { ScorecardsModule } from '../scorecards/scorecards.module';
import { DraftScorecardsModule } from '../draft-scorecards/draft-scorecards.module';
import { PhasesModule } from '../phases/phases.module';
import { DraftPlayersModule } from '../draft-players/draft-players.module';
import { DraftsModule } from '../drafts/drafts.module';
import { MatchesService } from '../matches/matches.service';
import { MatchGateway } from '../matches/matches.gateway';

@Module({
  imports: [
    PrismaModule,
    TournamentsModule,
    UsersModule,
    EnrollmentsModule,
    MatchesModule,
    AuthModule,
    CubesModule,
    RoundsModule,
    ScorecardsModule,
    DraftScorecardsModule,
    PhasesModule,
    DraftPlayersModule,
    DraftsModule,
    ImagesModule,
  ],
  controllers: [AppController],
  providers: [AppService, MatchGateway, MatchesService],
})
export class AppModule {}
