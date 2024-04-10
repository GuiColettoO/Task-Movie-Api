import { Module } from '@nestjs/common';
import { UsersController } from '../controller/user.controller';
import { UserService } from '../service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [UserService],
  providers: [UserService],
})
export class UserModule {}
