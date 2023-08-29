import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import * as process from 'process';
import { REQUEST_USER_KEY } from '../constant/jwt.constant';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    this.logger.error({
      user: req[REQUEST_USER_KEY],
      method: req.method,
      url: `${req.baseUrl}${req.url}`,
      body: req.body,
      query: req.query,
      error: exception,
    });
    res.status(status).json({
      code: status,
      data: null,
      message: exception.message,
    });
  }
}
