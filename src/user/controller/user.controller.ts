import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserDto } from '../dto/user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('user')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() user: UserDto) {
    this.userService.create(user);
  }
}
