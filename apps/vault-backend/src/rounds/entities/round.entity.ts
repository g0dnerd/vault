import { Round } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class RoundEntity implements Round {
  @ApiProperty()
  id: number;

  @ApiProperty()
  draftId: number;

  @ApiProperty()
  roundIndex: number;

  @ApiProperty({ required: false, default: false })
  paired: boolean;

  @ApiProperty({ required: false, default: false })
  started: boolean;

  @ApiProperty({ required: false, default: false })
  finished: boolean;
}
