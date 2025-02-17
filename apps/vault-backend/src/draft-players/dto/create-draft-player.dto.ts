import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class CreateDraftPlayerDto {
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  draftId: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  enrollmentId: number;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false })
  checkedIn?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false })
  checkedOut?: boolean;
}
