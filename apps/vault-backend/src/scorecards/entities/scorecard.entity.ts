import { Scorecard } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ScorecardEntity implements Scorecard {
  @ApiProperty()
  enrollmentId: number;

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
