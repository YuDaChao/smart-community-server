import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MenuStatus } from '@prisma/client';

@Injectable()
export class MenuService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * 根据菜单 ids 获取菜单列表
   * @param menuIds
   */
  async getMenusByIds(menuIds: number[]) {
    if (menuIds.length === 0) {
      return [];
    }
    return await this.prismaService.menu.findMany({
      where: {
        parentId: null,
        menuStatus: MenuStatus.ENABLE,
        id: { in: menuIds },
      },
      include: {
        children: {
          where: {
            menuStatus: MenuStatus.ENABLE,
            id: { in: menuIds },
          },
          orderBy: [
            { menuPriority: 'desc' },
            { createdAt: 'asc' },
            { updatedAt: 'asc' },
          ],
        },
      },
      orderBy: [
        { menuPriority: 'desc' },
        { createdAt: 'asc' },
        { updatedAt: 'asc' },
      ],
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
      include: {
        children: {
          where: {
            menuStatus: MenuStatus.ENABLE,
          },
        },
      },
      orderBy: [
        { menuPriority: 'asc' },
        { createdAt: 'asc' },
        { updatedAt: 'asc' },
      ],
    });
  }
}
