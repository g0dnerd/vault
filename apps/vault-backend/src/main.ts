import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import expressSession from 'express-session';

import { AppModule } from './app/app.module';
import { HttpExceptionFilter } from './http-exception-filter/http-exception.filter';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [
        'http://localhost',
        'http://localhost:4200',
        'https://vault.paulkukowski.net',
      ],
      preflightContinue: false,
      maxAge: 3600,
    },
  });

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.use(
    expressSession({
      cookie: {
        maxAge: 60 * 1000,
      },
      secret: 'local-secret-super-secret-oh-no-ive-been-hacked',
      name: 'session',
      resave: false,
      saveUninitialized: true,
    })
  );

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle('Vault API')
    .setDescription('The Vault API description')
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(globalPrefix, app, document);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new PrismaClientExceptionFilter(httpAdapter)
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
