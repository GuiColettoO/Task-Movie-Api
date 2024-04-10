import { Module } from '@nestjs/common';
import { MovieController } from '../controller/movie.controller';
import { MovieService } from '../service/movie.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from 'src/db/entities/movie.entity';

@Module({
  controllers: [MovieController],
  imports: [TypeOrmModule.forFeature([MovieEntity])],
  providers: [MovieService],
})
export class MovieModule {}
