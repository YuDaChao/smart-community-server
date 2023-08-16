import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLoggerDto } from './dtos/create-logger.dto';

import { ClientProxy } from '@nestjs/microservices';
import {
  RMQ_LOGGER,
  RMQ_SERVER_NAME,
} from '../commons/constant/rabbitmq.constant';

@Injectable()
export class LoggerService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(RMQ_SERVER_NAME) private readonly client: ClientProxy,
  ) {}

  async createLogger(createLoggerDto: CreateLoggerDto) {
    return await this.prismaService.logger.create({
      data: {
        ...createLoggerDto,
        createdAt: new Date(),
      },
    });
  }

  async addLoggerToQueue(createLoggerDto: CreateLoggerDto) {
    this.client.send(RMQ_LOGGER, createLoggerDto).subscribe();
    return 'success';
  }
}
