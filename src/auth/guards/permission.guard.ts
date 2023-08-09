import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '../../user/user.service';
import { PERMISSION_KEY } from '../../decorators/permission.decorator';
import { Permission } from '../../commons/enums/permission.enum';
import { REQUEST_USER_KEY, RequestUser } from '../../constant/jwt.constant';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredPermissions) {
      return true;
    }
    const reqUser = context.switchToHttp().getRequest()[
      REQUEST_USER_KEY
    ] as RequestUser;
    const userInfo = await this.userService.getUserRoleInfoById(reqUser.id);
    return requiredPermissions.some((p) =>
      userInfo.permissionCodes.includes(p),
    );
  }
}
