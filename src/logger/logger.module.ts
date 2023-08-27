import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  RMQ_QUEUE_NAME,
  RMQ_SERVER_NAME,
} from '../commons/constant/rabbitmq.constant';
import { LoggerController } from './logger.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: RMQ_SERVER_NAME,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://192.168.0.100:5672'],
          queue: RMQ_QUEUE_NAME,
        },
      },
    ]),
  ],
  providers: [LoggerService],
  exports: [LoggerService],
  controllers: [LoggerController],
})
export class LoggerModule {}
