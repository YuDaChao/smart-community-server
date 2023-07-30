import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { REQUEST_USER_KEY, RequestUser } from '../constant/jwt.constant';

/**
 * 解码 jwt token 获取用户信息，并存入req中
 */

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const [_, token] = req.headers.authorization?.split(' ') ?? [];
    req[REQUEST_USER_KEY] = this.jwtService.decode(token) as RequestUser;
    next();
  }
}
