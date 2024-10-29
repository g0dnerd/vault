import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import expressSession from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';

import { AppModule } from './app/app.module';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';
import { HttpExceptionFilter } from './http-exception-filter/http-exception.filter';
import { PrismaClient } from '@prisma/client';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['192.168.2.65', 'http://localhost'],
      preflightContinue: false,
      maxAge: 3600,
    },
  });

  app.setGlobalPrefix('api');
  app.use(
    expressSession({
      cookie: {
        maxAge: 60 * 1000, // ms
      },
      secret: 'local-secret-super-secret-oh-no-ive-been-hacked',
      name: 'session',
      resave: false,
      saveUninitialized: true,
      store: new PrismaSessionStore(new PrismaClient(), {
        checkPeriod: 2 * 60 * 1000, // ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }),
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
  SwaggerModule.setup('api', app, document);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new PrismaClientExceptionFilter(httpAdapter)
  );

  await app.listen(3000);
}
bootstrap();
