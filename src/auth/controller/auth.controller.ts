import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthLoginDto, AuthResponseDto } from '../dto/auth.dto';
import { AuthService } from '../service/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseInterceptors(CacheInterceptor)
  @CacheKey('auth')
  @CacheTTL(60)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() user: AuthLoginDto): Promise<AuthResponseDto> {
    return await this.authService.signIn(user);
  }
}
