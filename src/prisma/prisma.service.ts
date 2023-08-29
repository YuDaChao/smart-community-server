import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly nestLogger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [{ emit: 'event', level: 'query' }],
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.$on('query', (e: any) => {
      this.nestLogger.log(e);
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
