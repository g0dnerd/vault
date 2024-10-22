import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateEnrollmentDto {
  @IsNumber()
  @ApiProperty()
  tournamentId: number;

  @IsNumber()
  @ApiProperty()
  userId: number;
}
