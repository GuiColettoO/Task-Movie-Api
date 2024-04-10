import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './main/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Documentação do Task Movie Api')
    .setDescription(
      'Essa API é um desafio feito pela a empresa MKS Desenvolvimento de Sistemas e Empreendimentos Ltda',
    )
    .setVersion('1.0')
    .addTag('users')
    .addTag('auth')
    .addTag('movies')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
