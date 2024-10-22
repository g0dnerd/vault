import { ApiProperty } from "@nestjs/swagger";
import {
  IsPositive,
  IsNumber,
  IsBoolean,
  IsOptional
} from 'class-validator';

export class CreatePhaseDto {
  @IsNumber()
  @ApiProperty()
  tournamentId: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  phaseIndex: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @ApiProperty({ default: 3 })
  roundAmount: number;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ default: false })
  started: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ default: false })
  finished: boolean;
}
