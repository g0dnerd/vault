import { DraftScorecard } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class DraftScorecardEntity implements DraftScorecard {
  @ApiProperty()
  id: number;

  @ApiProperty()
  playerId: number;

  @ApiProperty({ required: false, default: 0 })
  score: number;

  @ApiProperty({ required: false, default: 0 })
  gamesPlayed: number;

  @ApiProperty({ required: false, default: 0 })
  gamesWon: number;

  @ApiProperty({ required: false, default: 0 })
  pmw: number;

  @ApiProperty({ required: false, default: 0 })
  omw: number;

  @ApiProperty({ required: false, default: 0 })
  pgw: number;

  @ApiProperty({ required: false, default: 0 })
  ogw: number;
}
