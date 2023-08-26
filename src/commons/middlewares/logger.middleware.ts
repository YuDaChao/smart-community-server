import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { REQUEST_USER_KEY, RequestUser } from '../constant/jwt.constant';
import { LoggerService } from '../../logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggerService: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    try {
      const { method, url, query, body, baseUrl, params } = req;
      console.time(LoggerMiddleware.name);
      if (req[REQUEST_USER_KEY] && (req[REQUEST_USER_KEY] as RequestUser).id) {
        this.loggerService.addLoggerToQueue({
          method,
          url: `${baseUrl}${url}`,
          query: JSON.stringify(query),
          param: JSON.stringify(params),
          body: body as object,
          userId:
            baseUrl === '/auth/signup'
              ? null
              : (req[REQUEST_USER_KEY] as RequestUser).id,
        });
      }
    } finally {
      console.timeEnd(LoggerMiddleware.name);
      next();
    }
  }
}
