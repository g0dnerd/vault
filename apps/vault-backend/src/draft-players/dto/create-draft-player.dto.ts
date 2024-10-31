import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class CreateDraftPlayerDto {
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  draftId: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  enrollmentId: number;
}
