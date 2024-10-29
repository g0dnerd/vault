import { ApiProperty } from '@nestjs/swagger';
import { Draft } from '@prisma/client';
import { DraftPlayerEntity } from '../../draft-players/entities/draft-player.entity';
import { PhaseEntity } from '../../phases/entities/phase.entity';
import { CubeEntity } from '../../cubes/entities/cube.entity';

export class DraftEntity implements Draft {
  @ApiProperty()
  id: number;

  @ApiProperty()
  phaseId: number;

  @ApiProperty({ type: () => PhaseEntity })
  phase: PhaseEntity;

  @ApiProperty()
  cubeId: number;

  @ApiProperty({ type: () => CubeEntity })
  cube: CubeEntity;

  @ApiProperty({ required: false, nullable: false })
  tableFirst: number | null;

  @ApiProperty({ required: false, nullable: false })
  tableLast: number | null;

  @ApiProperty()
  started: boolean;

  @ApiProperty()
  finished: boolean;

  @ApiProperty()
  seated: boolean;

  @ApiProperty({ type: () => DraftPlayerEntity, isArray: true, default: [] })
  players: DraftPlayerEntity[];
}
