import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsString, IsDate } from 'class-validator';

@Entity({ name: 'movie' })
export class MovieEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'varchar' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @Column({ type: 'varchar' })
  @IsString()
  @IsNotEmpty()
  director: string;

  @Column({ type: 'date' })
  @IsDate()
  year_release: Date;

  @Column({ type: 'varchar' })
  @IsString()
  @IsNotEmpty()
  classification?: string;
}
