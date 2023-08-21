import { Inject, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { MAILER } from './mailer.contants';
import * as process from 'process';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class MailerService {
  constructor(
    @Inject(MAILER) private readonly transporter: nodemailer.Transporter,
  ) {}

  /**
   * 发送邮件
   * @param options
   */
  async sendMail(options: Omit<Mail.Options, 'from'>) {
    return await this.transporter.sendMail({
      from: process.env.MAILER_FROM,
      ...options,
    });
  }
}
