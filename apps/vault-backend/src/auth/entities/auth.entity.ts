import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class AuthEntity {
  @ApiProperty()
  @IsString()
  token: string;

  @ApiProperty()
  @IsBoolean()
  isAdmin?: boolean;
}
