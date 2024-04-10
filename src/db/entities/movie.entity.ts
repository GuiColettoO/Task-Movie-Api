import { MovieClassificationEnum } from 'src/movie/enum/movieClassification.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'movie' })
export class MovieEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  director: string;

  @Column({ type: 'date' })
  year_release: Date;

  @Column({ type: 'varchar' })
  classification?: MovieClassificationEnum;
}
