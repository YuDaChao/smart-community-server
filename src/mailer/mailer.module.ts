import { DynamicModule, Module } from '@nestjs/common';
import { mailerProvider } from './mailer.provider';
import { MailerInterface } from './mailer.interface';
import { MAILER_OPTIONS } from './mailer.contants';
import { MailerService } from './mailer.service';

@Module({})
export class MailerModule {
  static forRoot(options: MailerInterface): DynamicModule {
    return {
      module: MailerModule,
      providers: [
        {
          provide: MAILER_OPTIONS,
          useValue: options,
        },
        mailerProvider,
        MailerService,
      ],
      exports: [MailerService],
    };
  }
}
