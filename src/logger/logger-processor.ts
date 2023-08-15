import {
  OnQueueActive,
  OnQueueProgress,
  Process,
  Processor,
} from '@nestjs/bull';
import {
  BULL_INSERT_LOGGER_PROCESS,
  BULL_LOGGER_PROCESSOR,
} from '../commons/constant/bull.constant';
import { CreateLoggerDto } from './dtos/create-logger.dto';
import { LoggerService } from './logger.service';
import { Job } from 'bull';

@Processor(BULL_LOGGER_PROCESSOR)
export class LoggerProcessor {
  constructor(private readonly loggerService: LoggerService) {}

  @Process(BULL_INSERT_LOGGER_PROCESS)
  async insertLogger(logger: CreateLoggerDto) {
    console.log('======== ', logger);
    return await this.loggerService.createLogger(logger);
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  @OnQueueProgress()
  OnQProgress(job: Job, progress: number) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...${progress}`,
    );
  }
}
