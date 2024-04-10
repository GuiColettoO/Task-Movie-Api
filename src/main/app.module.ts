import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/module/auth.module';
import { DbModule } from 'src/db/db.module';
import { MovieModule } from 'src/movie/module/movie.module';
import { UserModule } from 'src/user/module/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MovieModule,
    UserModule,
    AuthModule,
    DbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
