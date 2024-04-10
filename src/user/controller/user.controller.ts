import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserDto } from '../dto/user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() user: UserDto) {
    this.userService.create(user);
  }
}
