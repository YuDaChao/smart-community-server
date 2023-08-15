import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { REQUEST_USER_KEY, RequestUser } from '../commons/constant/jwt.constant';

export const User = createParamDecorator(
  (key: keyof RequestUser, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request[REQUEST_USER_KEY];
    return user ? (key ? user[key] : user) : null;
  },
);
