/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateTournamentDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  name: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: false })
  public: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, default: '' })
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  playerCapacity: number;
}
