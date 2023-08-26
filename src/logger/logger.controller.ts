import { Controller } from '@nestjs/common';
import { LoggerService } from './logger.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { RMQ_LOGGER } from '../commons/constant/rabbitmq.constant';
import { CreateLoggerDto } from './dtos/create-logger.dto';

@Controller('logger')
export class LoggerController {
  constructor(private readonly loggerService: LoggerService) {}

  @MessagePattern(RMQ_LOGGER)
  async insertLogger(
    @Payload() data: CreateLoggerDto,
    @Ctx() context: RmqContext,
  ) {
    console.log(`Pattern: ${context.getPattern()}`);
    return await this.loggerService.createLogger(data);
  }
}
