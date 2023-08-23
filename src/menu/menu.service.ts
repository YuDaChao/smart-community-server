import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MenuStatus, Prisma } from '@prisma/client';
import { MenuEntity } from './entity/menu.entity';

@Injectable()
export class MenuService {
  private readonly menuSelect: Prisma.MenuSelect;
  private readonly menuOrderBy: Prisma.MenuOrderByWithRelationInput[];

  constructor(private readonly prismaService: PrismaService) {
    this.menuSelect = {
      id: true,
      menuName: true,
      menuPath: true,
      menuIcon: true,
    };
    this.menuOrderBy = [
      { menuPriority: 'desc' },
      { createdAt: 'asc' },
      { updatedAt: 'asc' },
    ];
  }

  /**
   * 根据角色 获取菜单列表
   * @param roleId 角色 id
   */
  async getMenusByRoleId(roleId: number) {
    const menus = await this.prismaService.roleMenus.findMany({
      where: {
        roleId,
      },
      select: {
        menuId: true,
      },
    });
    // 一级菜单 ids
    const menuIds = menus.map((menu) => menu.menuId);

    return this.getMenusByIds(menuIds);
  }

  /**
   * 根据菜单 ids 获取菜单列表
   * @param menuIds
   */
  async getMenusByIds(menuIds: number[]) {
    if (menuIds.length === 0) {
      return [];
    }
    const menuWhere: Prisma.MenuWhereInput = {
      menuStatus: MenuStatus.ENABLE,
      id: { in: menuIds },
    };
    return await this.prismaService.menu.findMany({
      where: {
        parentId: null,
        ...menuWhere,
      },
      select: {
        ...this.menuSelect,
        children: {
          where: {
            ...menuWhere,
          },
          select: this.menuSelect,
          orderBy: this.menuOrderBy,
        },
      },
      orderBy: this.menuOrderBy,
    });
  }

  /**
   * 获取所有的菜单列表
   */
  async getAllMenus() {
    return await this.prismaService.menu.findMany({
      where: {
        parentId: null,
        menuStatus: MenuStatus.ENABLE,
      },
      select: {
        ...this.menuSelect,
        children: {
          where: {
            menuStatus: MenuStatus.ENABLE,
          },
          select: this.menuSelect,
        },
      },
      orderBy: this.menuOrderBy,
    });
  }
}
