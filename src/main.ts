import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { createLogger } from 'winston';
import * as process from 'process';
import { ResponseInterceptor } from './commons/interceptors/response.interceptor';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RMQ_QUEUE_NAME } from './commons/constant/rabbitmq.constant';

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

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      // rabbitmq 地址
      urls: ['amqp://localhost:5672'],
      queue: RMQ_QUEUE_NAME,
      queueOptions: {},
    },
  });

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  await app.startAllMicroservices();
  await app.listen(50000);
}

bootstrap();
