import { Result } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ResultEntity implements Result {
  @ApiProperty()
  matchId: number;

  @ApiProperty()
  player1Wins: number;

  @ApiProperty()
  player2Wins: number;

  @ApiProperty()
  result: number;

  @ApiProperty({ required: false, nullable: true })
  reportedById: number | null;

  @ApiProperty()
  confirmed: boolean;
}
