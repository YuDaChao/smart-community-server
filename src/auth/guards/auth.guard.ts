import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AUTH_TYPE_KEY } from '../decotators/auth.decorator';
import { AuthType } from '../enums/auth-type.enum';
import { AccessTokenGuard } from './access-token.guard';

@Injectable()
export class AuthGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType.Bearer;
  private readonly authTypeGuardMap: Record<
    AuthType,
    CanActivate | CanActivate[]
  > = {
    [AuthType.Bearer]: this.accessTokenGuard,
    [AuthType.None]: {
      canActivate: () => true,
    },
  };

  constructor(
    private readonly accessTokenGuard: AccessTokenGuard,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authTypes = this.reflector.getAllAndOverride<AuthType[]>(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()],
    ) ?? [AuthGuard.defaultAuthType];
    // 获取所有的guard
    const guards = authTypes.map((type) => this.authTypeGuardMap[type]).flat();
    let error = new UnauthorizedException();
    for (const guard of guards) {
      try {
        const canActivate = await guard.canActivate(context);
        if (canActivate) {
          return true;
        }
      } catch (e) {
        error = e;
      }
    }
    throw error;
  }
}
