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

export class MovieDto {
  @IsUUID()
  @IsOptional()
  id: string;
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  title: string;
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  director: string;
  @IsDateString()
  year_release: Date;
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
