import { ApiProperty } from '@nestjs/swagger';
import { Draft } from '@prisma/client';
import { DraftPlayerEntity } from '../../draft-players/entities/draft-player.entity';

export class DraftEntity implements Draft {
  @ApiProperty()
  id: number;

  @ApiProperty()
  phaseId: number;

  @ApiProperty()
  cubeId: number;

  @ApiProperty({ default: 0 })
  tableFirst: number;

  @ApiProperty({ default: 0 })
  tableLast: number;

  @ApiProperty({ default: false })
  started: boolean;

  @ApiProperty({ default: false })
  finished: boolean;

  @ApiProperty({ default: false })
  seated: boolean;

  @ApiProperty({ default: [DraftPlayerEntity] })
  players: DraftPlayerEntity[];
}
