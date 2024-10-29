import { ApiProperty } from '@nestjs/swagger';

import { Match } from '@prisma/client';
import { DraftPlayerEntity } from '../../draft-players/entities/draft-player.entity';

export class MatchEntity implements Match {
  @ApiProperty()
  id: number;

  @ApiProperty()
  roundId: number;

  @ApiProperty()
  player1Id: number;

  @ApiProperty({
    type: () => DraftPlayerEntity,
    required: false,
    nullable: true,
  })
  player1: DraftPlayerEntity | null;

  @ApiProperty()
  player2Id: number;

  @ApiProperty({
    type: () => DraftPlayerEntity,
    required: false,
    nullable: true,
  })
  player2: DraftPlayerEntity | null;

  @ApiProperty()
  tableNumber: number;

  @ApiProperty({ required: false, nullable: true })
  player1Wins: number | null;

  @ApiProperty({ required: false, nullable: true })
  player2Wins: number | null;

  @ApiProperty({ required: false, nullable: true })
  result: number | null;

  @ApiProperty({ required: false, nullable: true })
  reportedById: number | null;

  @ApiProperty({
    type: () => DraftPlayerEntity,
    required: false,
    nullable: true,
  })
  reportedBy: DraftPlayerEntity | null;

  @ApiProperty()
  resultConfirmed: boolean;
}
