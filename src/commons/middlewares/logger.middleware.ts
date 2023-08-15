import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { REQUEST_USER_KEY } from '../constant/jwt.constant';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const { method, url, query, body, baseUrl } = req;
    this.logger.log(`
      method: ${method}
      url: ${`${baseUrl}${url}`} 
      user: ${JSON.stringify(req[REQUEST_USER_KEY])} 
      query: ${JSON.stringify(query)} 
      body: ${JSON.stringify(body)}
     `);
    next();
  }
}
