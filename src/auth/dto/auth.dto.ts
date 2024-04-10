export class AuthResponseDto {
  token: string;
  expiresIn: number;
}

export class AuthLoginDto {
  username: string;
  password: string;
}
