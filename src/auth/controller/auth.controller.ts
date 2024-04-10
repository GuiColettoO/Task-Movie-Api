import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthLoginDto, AuthResponseDto } from '../dto/auth.dto';
import { AuthService } from '../service/auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() user: AuthLoginDto): Promise<AuthResponseDto> {
    return await this.authService.signIn(user);
  }
}
