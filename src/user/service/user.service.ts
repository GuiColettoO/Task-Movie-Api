import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class UserService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(newUser: UserDto) {
    const userAlreadyRegistered = await this.findByUserName(newUser.username);

    if (userAlreadyRegistered) {
      throw new ConflictException(
        `User '${newUser.username}' already registered`,
      );
    }

    const dbUser = new UserEntity();
    dbUser.username = newUser.username;
    dbUser.passwordHash = bcryptHashSync(newUser.password, 10);

    const { id, username } = await this.userRepository.save(dbUser);
    return { id, username };
  }

  async findByUserName(username: string): Promise<UserDto | null> {
    const cachedUser = await this.cacheManager.get<UserDto>(username);

    if (cachedUser) {
      console.log(`Retrieved user '${username}' from cache`);
      return cachedUser;
    }

    const userFound = await this.userRepository.findOne({
      where: { username },
    });

    if (!userFound) {
      console.log(`User '${username}' not found in database`);
      return null;
    }

    await this.cacheManager.set(username, {
      id: userFound.id,
      username: userFound.username,
      password: userFound.passwordHash,
    });

    console.log(`Added user '${username}' to cache`);

    return {
      id: userFound.id,
      username: userFound.username,
      password: userFound.passwordHash,
    };
  }
}
