import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @ApiProperty({
    description: 'The username of the user',
    example: 'john.doe',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  username: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  password: string;
}
