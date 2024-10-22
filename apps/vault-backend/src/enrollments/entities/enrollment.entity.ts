import { Enrollment } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { TournamentEntity } from '../../tournaments/entities/tournament.entity';

export class EnrollmentEntity implements Enrollment {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  tournamentId: number;

  @ApiProperty({ type: TournamentEntity })
  tournament: TournamentEntity;

  @ApiProperty()
  enrolledOn: Date;
}
