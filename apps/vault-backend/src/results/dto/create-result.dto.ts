import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsPositive,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateResultDto {
  @IsNumber()
  @ApiProperty()
  matchId: number;

  @IsNumber()
  @ApiProperty()
  player1Wins: number;

  @IsNumber()
  @ApiProperty()
  player2Wins: number;

  @IsNumber()
  @ApiProperty()
  result: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ required: false, nullable: true })
  reportedById: number | null;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false, default: false })
  confirmed: boolean;
}
