import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { REQUEST_USER_KEY, RequestUser } from '../constant/jwt.constant';
import { LoggerService } from '../../logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  constructor(private readonly loggerService: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    try {
      const { method, url, query, body, baseUrl, params } = req;
      this.logger.log(`
      method: ${method}
      url: ${`${baseUrl}${url}`} 
      user: ${JSON.stringify(req[REQUEST_USER_KEY])} 
      query: ${JSON.stringify(query)} 
      params: ${JSON.stringify(params)} 
      body: ${JSON.stringify(body)}
     `);
      console.time();
      if (req[REQUEST_USER_KEY] && (req[REQUEST_USER_KEY] as RequestUser).id) {
        this.loggerService.createLogger({
          method,
          url: `${baseUrl}${url}`,
          query: JSON.stringify(query),
          param: JSON.stringify(params),
          body: body as object,
          userId: (req[REQUEST_USER_KEY] as RequestUser).id,
        });
      }
    } finally {
      console.timeEnd();
      next();
    }
  }
}
