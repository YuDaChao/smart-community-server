import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { utilities, WinstonModule } from 'nest-winston';
import { createLogger } from 'winston';
import * as winston from 'winston';
import * as process from 'process';
import { ResponseInterceptor } from './commons/interceptors/response.interceptor';

dotenv.config();

async function bootstrap() {
  const logInstance = createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          winston.format.ms(),
          utilities.format.nestLike(process.env.APP_NAME, {
            colors: true,
            prettyPrint: true,
          }),
        ),
      }),
    ],
  });
  const logger = WinstonModule.createLogger({
    instance: logInstance,
  });
  const app = await NestFactory.create(AppModule, {
    logger,
    cors: true,
  });
  // logger
  // app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  await app.listen(50000);
}

bootstrap();
