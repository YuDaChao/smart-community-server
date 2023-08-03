import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MenuService {
  constructor(private readonly prismaService: PrismaService) {}

  async getMenusByIds(menuIds: number[]) {
    if (menuIds.length === 0) {
      return [];
    }
    return await this.prismaService.menu.findMany({
      where: {
        id: { in: menuIds },
      },
      select: {
        id: true,
        menuName: true,
        menuIcon: true,
        menuPath: true,
        parentId: true,
      },
    });
  }

  /**
   * 获取所有的菜单列表
   */
  async getAllMenus() {
    return await this.prismaService.menu.findMany({
      where: {
        parentId: null,
      },
      include: {
        children: true,
      },
      orderBy: [{ createdAt: 'asc' }, { updatedAt: 'asc' }],
    });
  }
}
