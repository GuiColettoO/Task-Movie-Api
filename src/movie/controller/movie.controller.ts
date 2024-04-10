import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  FindAllParameters,
  MovieDto,
  MovieRouteParameters,
} from '../dto/movie.dto';
import { MovieService } from '../service/movie.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@ApiTags('movies')
@UseGuards(AuthGuard)
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  // @UseInterceptors(CacheInterceptor)
  @CacheKey('movies')
  @CacheTTL(60)
  @Post()
  async create(@Body() movie: MovieDto): Promise<MovieDto> {
    return await this.movieService.create(movie);
  }

  // @UseInterceptors(CacheInterceptor)
  @CacheKey('movies')
  @CacheTTL(60)
  @Get('/:id')
  async findById(@Param('id') id: string): Promise<MovieDto> {
    return await this.movieService.findById(id);
  }

  // @UseInterceptors(CacheInterceptor)
  @CacheKey('movies')
  @CacheTTL(60)
  @Get()
  async findAll(@Query() params: FindAllParameters): Promise<MovieDto[]> {
    return await this.movieService.findAll(params);
  }

  // @UseInterceptors(CacheInterceptor)
  @CacheKey('movies')
  @CacheTTL(60)
  @Put('/:id')
  async update(@Param() params: MovieRouteParameters, @Body() movie: MovieDto) {
    await this.movieService.update(params.id, movie);
  }

  // @UseInterceptors(CacheInterceptor)
  @CacheKey('movies')
  @CacheTTL(60)
  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.movieService.remove(id);
  }
}
