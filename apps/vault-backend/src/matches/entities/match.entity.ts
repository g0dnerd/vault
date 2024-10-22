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

  @ApiProperty()
  player1: DraftPlayerEntity;

  @ApiProperty()
  player2Id: number;

  @ApiProperty()
  player2: DraftPlayerEntity;

  @ApiProperty()
  tableNumber: number;
}
