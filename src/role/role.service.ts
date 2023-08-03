import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MenuService } from '../menu/menu.service';

@Injectable()
export class RoleService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly menuService: MenuService,
  ) {}

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
        roleId: true,
        menu: {
          select: {
            id: true,
            menuName: true,
            parentId: true,
          },
        },
      },
    });
    // 一级菜单 ids
    const parentIds = menus
      .filter((menu) => menu.menu.parentId === null)
      .map((menu) => menu.menuId);
    // 子菜单 ids[]
    const childIds = menus
      .filter((menu) => menu.menu.parentId !== null)
      .map((menu) => menu.menuId);

    const [parentMenus, childMenus] = await Promise.all([
      this.menuService.getMenusByIds(parentIds),
      this.menuService.getMenusByIds(childIds),
    ]);

    return parentMenus.map((parent) => {
      const menu = { ...parent, children: null };
      const children = childMenus.filter(
        (child) => child.parentId === parent.id,
      );
      if (children.length > 0) {
        menu.children = children;
      }
      return menu;
    });
  }
}
