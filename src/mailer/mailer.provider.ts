import { Provider } from '@nestjs/common';
import { MAILER, MAILER_OPTIONS } from './mailer.contants';
import * as nodemailer from 'nodemailer';
import { MailerInterface } from './mailer.interface';

export const mailerProvider: Provider = {
  provide: MAILER,
  useFactory: (options: MailerInterface) => {
    return nodemailer.createTransport(options);
  },
  inject: [MAILER_OPTIONS],
};
