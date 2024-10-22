import { ApiProperty } from '@nestjs/swagger';
import { Phase } from '@prisma/client';

export class PhaseEntity implements Phase {
  @ApiProperty()
  id: number;

  @ApiProperty()
  tournamentId: number;

  @ApiProperty()
  phaseIndex: number;

  @ApiProperty({ default: 3 })
  roundAmount: number;

  @ApiProperty({ default: false })
  started: boolean;

  @ApiProperty({ default: false })
  finished: boolean;
}
