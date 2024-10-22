import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsPositive,
} from 'class-validator';

export class CreateMatchDto {
  @IsNumber()
  @ApiProperty()
  roundId: number;

  @IsNumber()
  @ApiProperty()
  player1Id: number;

  @IsNumber()
  @ApiProperty()
  player2Id: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  tableNumber: number;
}
