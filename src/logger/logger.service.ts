import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLoggerDto } from './dtos/create-logger.dto';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import {
  BULL_INSERT_LOGGER_PROCESS,
  BULL_LOGGER_PROCESSOR,
} from '../commons/constant/bull.constant';

@Injectable()
export class LoggerService {
  constructor(
    private readonly prismaService: PrismaService,
    @InjectQueue(BULL_LOGGER_PROCESSOR) private readonly loggerQueue: Queue,
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
    const job = await this.loggerQueue.add(
      BULL_INSERT_LOGGER_PROCESS,
      createLoggerDto,
    );
    console.log(job.id);
  }
}
