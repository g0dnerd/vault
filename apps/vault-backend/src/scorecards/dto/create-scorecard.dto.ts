import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsPositive,
} from 'class-validator';

export class CreateScorecardDto {
  @IsNumber()
  @ApiProperty()
  enrollmentId: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty({ required: false, default: 0 })
  score: number;
  
  @IsNumber()
  @IsPositive()
  @ApiProperty({ required: false, default: 0 })
  gamesPlayed: number;
  
  @IsNumber()
  @IsPositive()
  @ApiProperty({ required: false, default: 0 })
  gamesWon: number;
  
  @IsNumber()
  @IsPositive()
  @ApiProperty({ required: false, default: 0 })
  pmw: number;
  
  @IsNumber()
  @IsPositive()
  @ApiProperty({ required: false, default: 0 })
  omw: number;
  
  @IsNumber()
  @IsPositive()
  @ApiProperty({ required: false, default: 0 })
  pgw: number;
  
  @IsNumber()
  @IsPositive()
  @ApiProperty({ required: false, default: 0 })
  ogw: number;
}