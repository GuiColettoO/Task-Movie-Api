import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserDto } from '../dto/user.dto';
import { ApiTags } from '@nestjs/swagger';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@ApiTags('users')
@Controller('user')
//@UseInterceptors(CacheInterceptor)
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @CacheKey('users')
  @CacheTTL(60)
  async create(@Body() user: UserDto) {
    return await this.userService.create(user);
  }
}
