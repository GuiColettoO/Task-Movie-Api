import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from '../movie/module/movie.module';
import { UserModule } from '../user/module/user.module';
import { AuthModule } from '../auth/module/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from 'src/db/db.module';

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
