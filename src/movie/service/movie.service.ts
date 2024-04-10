import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { FindAllParameters, MovieDto } from '../dto/movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from 'src/db/entities/movie.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async create(movie: MovieDto) {
    const movieToSave: MovieEntity = {
      title: movie.title,
      director: movie.director,
      year_release: movie.year_release,
      classification: movie.classification,
    };

    const createdMovie = await this.movieRepository.save(movieToSave);

    return this.mapEntityToDto(createdMovie);
  }

  async findById(id: string): Promise<MovieDto> {
    const cachedMovie = await this.cacheManager.get<MovieDto>(id);

    if (cachedMovie) {
      return cachedMovie;
    }

    const foundMovie = await this.movieRepository.findOne({ where: { id } });

    if (!foundMovie) {
      throw new HttpException(
        `Movie with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.cacheManager.set(id, this.mapEntityToDto(foundMovie), 60);

    return this.mapEntityToDto(foundMovie);
  }

  async findAll(params: FindAllParameters): Promise<MovieDto[]> {
    const searchPrams: FindOptionsWhere<MovieEntity> = {};

    if (params.title) {
      searchPrams.title = Like(`%${params.title}%`);
    }

    if (params.director) {
      searchPrams.director = Like(`%${params.director}%`);
    }

    const movieFound = await this.movieRepository.find({
      where: searchPrams,
    });

    return movieFound.map((movieEntity) => this.mapEntityToDto(movieEntity));
  }

  async update(id: string, movie: MovieDto) {
    await this.cacheManager.del(id); // Remover o cache ao atualizar

    const foundMovie = await this.movieRepository.findOne({ where: { id } });

    if (!foundMovie) {
      throw new HttpException(
        `Movie with id '${id}' not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.movieRepository.update(id, this.mapDtoToEntity(movie));
  }

  async remove(id: string) {
    await this.cacheManager.del(id); // Remover o cache ao remover

    const result = await this.movieRepository.delete(id);

    if (!result.affected) {
      throw new HttpException(
        `Movie with id '${id}' not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private mapEntityToDto(movieEntity: MovieEntity): MovieDto {
    return {
      id: movieEntity.id,
      title: movieEntity.title,
      director: movieEntity.director,
      year_release: movieEntity.year_release,
      classification: movieEntity.classification,
    };
  }

  private mapDtoToEntity(movieDto: MovieDto): Partial<MovieEntity> {
    return {
      title: movieDto.title,
      director: movieDto.director,
      year_release: movieDto.year_release,
      classification: movieDto.classification,
    };
  }
}
