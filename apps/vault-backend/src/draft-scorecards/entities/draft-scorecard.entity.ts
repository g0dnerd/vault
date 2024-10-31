import { DraftScorecard } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class DraftScorecardEntity implements DraftScorecard {
  @ApiProperty()
  id: number;

  @ApiProperty()
  playerId: number;

  @ApiProperty()
  score: number;

  @ApiProperty()
  gamesPlayed: number;

  @ApiProperty()
  gamesWon: number;

  @ApiProperty()
  pmw: number;

  @ApiProperty()
  omw: number;

  @ApiProperty()
  pgw: number;

  @ApiProperty()
  ogw: number;
}
