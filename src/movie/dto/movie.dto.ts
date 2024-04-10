import {
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
  IsEnum,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { MovieClassificationEnum } from '../enum/movieClassification.enum';
import { ApiProperty } from '@nestjs/swagger';

export class MovieDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @ApiProperty({
    description: 'The title of the movie',
    example: 'The Shawshank Redemption',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  title: string;

  @ApiProperty({
    description: 'The director of the movie',
    example: 'Frank Darabont',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  director: string;

  @ApiProperty({
    description: 'The year of release of the movie',
    example: '1994-10-14',
  })
  @IsDateString()
  year_release: Date;

  @ApiProperty({
    description: 'The classification of the movie',
    example: 'PG-13',
  })
  @IsEnum(MovieClassificationEnum)
  classification: string;
}

export interface FindAllParameters {
  title: string;
  director: string;
}

export class MovieRouteParameters {
  @IsUUID()
  id: string;
}
