import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateDraftPlayerDto {
  @IsNumber()
  @ApiProperty()
  draftId: number;

  @IsNumber()
  @ApiProperty()
  enrollmentId: number;
}
