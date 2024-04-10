import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { UserService } from 'src/user/service/user.service';
import { AuthLoginDto, AuthResponseDto } from '../dto/auth.dto';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class AuthService {
  private jwtExpirationTimeInSeconds: number;

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    this.jwtExpirationTimeInSeconds = this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
    );
  }

  async signIn(user: AuthLoginDto): Promise<AuthResponseDto> {
    const foundUser = await this.getUserFromCache(user.username);

    if (!foundUser || !bcryptCompareSync(user.password, foundUser.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: foundUser.id, username: foundUser.username };

    const token = this.jwtService.sign(payload);

    return { token, expiresIn: this.jwtExpirationTimeInSeconds };
  }

  private async getUserFromCache(username: string): Promise<any> {
    const cachedUser = await this.cacheManager.get<any>(username);

    if (cachedUser) {
      return cachedUser;
    }

    const foundUser = await this.userService.findByUserName(username);

    if (foundUser) {
      await this.cacheManager.set(username, foundUser, 60);
    }

    return foundUser;
  }
}
