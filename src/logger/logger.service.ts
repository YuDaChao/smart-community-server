import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLoggerDto } from './dtos/create-logger.dto';

import { ClientProxy } from '@nestjs/microservices';
import {
  RMQ_LOGGER,
  RMQ_SERVER_NAME,
} from '../commons/constant/rabbitmq.constant';
import { Request } from 'express';
import {
  REQUEST_USER_KEY,
  RequestUser,
} from '../commons/constant/jwt.constant';

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

  async addLoggerToQueue(req: Request) {
    const { method, url, query, body, baseUrl, params } = req;
    const log = {
      method,
      url: `${baseUrl}${url}`,
      query: JSON.stringify(query),
      param: JSON.stringify(params),
      body: body as object,
      userId: (req[REQUEST_USER_KEY] as RequestUser).id ?? null,
    };
    this.client.send(RMQ_LOGGER, log).subscribe();
    return 'success';
  }
}
