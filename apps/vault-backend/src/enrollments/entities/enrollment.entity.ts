import { Enrollment } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class EnrollmentEntity implements Enrollment {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  tournamentId: number;

  @ApiProperty()
  enrolledOn: Date;
}
