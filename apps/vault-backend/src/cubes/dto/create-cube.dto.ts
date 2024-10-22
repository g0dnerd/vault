import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  IsPositive,
  IsUrl,
} from 'class-validator';

export class CreateCubeDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  name: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  cardNumber: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({ required: false, nullable: true })
  description: string | null;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  url: string;
}
