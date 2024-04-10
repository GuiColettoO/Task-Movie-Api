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
} from '@nestjs/common';
import {
  FindAllParameters,
  MovieDto,
  MovieRouteParameters,
} from '../dto/movie.dto';
import { MovieService } from '../service/movie.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  async create(@Body() movie: MovieDto): Promise<MovieDto> {
    return await this.movieService.create(movie);
  }

  @Get('/:id')
  async findById(@Param('id') id: string): Promise<MovieDto> {
    return await this.movieService.findById(id);
  }

  @Get()
  async findAll(@Query() params: FindAllParameters): Promise<MovieDto[]> {
    return await this.movieService.findAll(params);
  }

  @Put('/:id')
  async update(@Param() params: MovieRouteParameters, @Body() movie: MovieDto) {
    await this.movieService.update(params.id, movie);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.movieService.remove(id);
  }
}
