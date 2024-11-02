import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../users/entities/user.entity';
import { IsString } from 'class-validator';

export class AuthEntity {
  @ApiProperty()
  @IsString()
  token: string;

  @ApiProperty()
  user: UserEntity;
}
