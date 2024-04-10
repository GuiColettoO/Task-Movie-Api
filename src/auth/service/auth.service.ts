import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { UserService } from 'src/user/service/user.service';
import { AuthLoginDto, AuthResponseDto } from '../dto/auth.dto';

@Injectable()
export class AuthService {
  private jwtExpirationTimeInSeconds: number;
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTimeInSeconds = this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
    );
  }

  async signIn(user: AuthLoginDto): Promise<AuthResponseDto> {
    const foundUser = await this.userService.findByUserName(user.username);

    if (!foundUser || !bcryptCompareSync(user.password, foundUser.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: foundUser.id, username: foundUser.username };

    const token = this.jwtService.sign(payload);

    return { token, expiresIn: this.jwtExpirationTimeInSeconds };
  }
}
