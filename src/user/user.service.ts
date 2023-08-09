import { Injectable } from '@nestjs/common';
import { Area, Menu } from '@prisma/client';
import { AreaService } from '../area/area.service';
import { PrismaService } from '../prisma/prisma.service';
import { RoleService } from '../role/role.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly areaService: AreaService,
    private readonly roleService: RoleService,
  ) {}

  async getUserRoleInfoById(userId: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        roleId: true,
        communityId: true,
      },
    });
    let permissionCodes: string[] = [];
    if (user.roleId) {
      const permissions = await this.roleService.getPermissionsByRoleId(
        user.roleId,
      );
      permissionCodes = permissions.map((p) => p.permissionCode);
    }
    return {
      ...user,
      permissionCodes,
    };
  }

  /**
   * 根据用户 id 获取用户基本信息 （所属社区，角色，区域）
   * @param userId
   */
  async getUserAndRelationInfo(userId: number) {
    return await this.prismaService.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        userName: true,
        avatar: true,
        roleId: true,
        role: {
          select: {
            roleName: true,
          },
        },
        communityId: true,
        community: {
          select: {
            communityName: true,
            communityAddress: true,
            areaId: true,
          },
        },
      },
    });
  }

  /**
   * 根据用户 id 获取用户基本信息 （所属社区，角色，权限，区域）以及 菜单信息
   * @param userId
   */
  async getUserInfoById(userId: number) {
    const userAndCommunity = await this.getUserAndRelationInfo(userId);
    const { community, role, ...user } = userAndCommunity;
    let area: Partial<Area>;
    let menuList: Partial<Menu>[] = [];
    let permissionList = [];
    if (community.areaId) {
      area = await this.areaService.getRecursiveAreaInfoById(community.areaId);
    }
    if (user.roleId) {
      menuList = await this.roleService.getMenusByRoleId(user.roleId);
      permissionList = await this.roleService.getPermissionsByRoleId(
        user.roleId,
      );
    }
    return {
      ...user,
      ...community,
      ...role,
      menus: menuList,
      permissions: permissionList,
      area,
    };
  }
}
