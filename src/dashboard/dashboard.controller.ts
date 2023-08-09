import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { User } from '../decorators/user.decorator';
import { RequestUser } from '../constant/jwt.constant';
import { UserService } from '../user/user.service';
import { Permissions } from '../decorators/permission.decorator';
import { Permission } from '../commons/enums/permission.enum';

@Permissions(Permission.DASHBOARD)
@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
    private readonly userService: UserService,
  ) {}

  @Get('resident')
  async getResidentOverview(@User() user: RequestUser) {
    /**
     * 角色判断
     * 1. 小区管理员只能查看本小区的住户
     * 2. 超级管理员可以查看所有小区的住户
     */
    const userInfo = await this.userService.getUserRoleInfoById(user.id);
    const communityId =
      userInfo.roleId === 1 ? undefined : userInfo.communityId;
    return this.dashboardService.getResidentOverview(communityId);
  }
}