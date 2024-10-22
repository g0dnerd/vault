import { Tournament } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { EnrollmentEntity } from '../../enrollments/entities/enrollment.entity';

export class TournamentEntity implements Tournament {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false, default: false })
  public: boolean;

  @ApiProperty()
  playerCapacity: number;

  @ApiProperty({ required: false, nullable: true })
  description: string | null;

  @ApiProperty({ required: false, nullable: true })
  enrollments: EnrollmentEntity[] | null;
}
