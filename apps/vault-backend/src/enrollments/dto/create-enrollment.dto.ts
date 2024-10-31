import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class CreateEnrollmentDto {
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  tournamentId: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  userId: number;
}
