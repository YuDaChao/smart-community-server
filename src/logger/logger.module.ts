import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { BullModule } from '@nestjs/bull';
import { BULL_LOGGER_PROCESSOR } from '../commons/constant/bull.constant';
import { LoggerProcessor } from './logger-processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: BULL_LOGGER_PROCESSOR,
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  providers: [LoggerService, LoggerProcessor],
  exports: [LoggerService, LoggerProcessor],
})
export class LoggerModule {}
