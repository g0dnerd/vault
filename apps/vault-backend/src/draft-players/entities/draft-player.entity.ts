import { DraftPlayer } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class DraftPlayerEntity implements DraftPlayer {
  @ApiProperty()
  id: number;

  @ApiProperty()
  checkedIn: boolean;

  @ApiProperty()
  checkedOut: boolean;

  @ApiProperty()
  draftId: number;

  @ApiProperty()
  enrollmentId: number;
}
