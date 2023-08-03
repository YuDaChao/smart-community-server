import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MenuService } from '../menu/menu.service';
import { Prisma } from '@prisma/client';

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

  /**
   * 删除权限菜单
   * @param roleId 权限 id
   * @param menuIds 菜单 ids
   */
  deleteRoleMenu(
    roleId: number,
    menuIds: number[],
  ): Prisma.PrismaPromise<Prisma.BatchPayload> {
    const where: Prisma.RoleMenusWhereInput = {
      roleId,
    };
    if (menuIds.length > 0) {
      where.menuId = {
        in: menuIds,
      };
    }
    return this.prismaService.roleMenus.deleteMany({ where });
  }

  /**
   * 添加权限菜单
   * @param roleId 权限 id
   * @param menuIds 菜单 ids
   */
  addRoleMenus(
    roleId: number,
    menuIds: number[],
  ): Prisma.PrismaPromise<Prisma.BatchPayload> {
    if (menuIds.length === 0) {
      return null;
    }
    const createdAt = new Date();
    return this.prismaService.roleMenus.createMany({
      data: menuIds.map((id) => ({
        roleId,
        menuId: id,
        createdAt,
      })),
    });
  }

  /**
   * 获取所有的权限列表
   */
  async getAllRoles() {
    return this.prismaService.role.findMany({
      orderBy: [{ createdAt: 'asc' }, { updatedAt: 'asc' }],
    });
  }

  /**
   * 修改角色菜单权限
   * @param roleId 角色 Id
   * @param menuIds 菜单id列表
   */
  async updateUserMenu(roleId: number, menuIds: number[]) {
    // 全部清空
    if (menuIds.length === 0) {
      const deleteRoleMenus = await this.deleteRoleMenu(roleId, []);
      return {
        deleteCount: deleteRoleMenus.count,
        addCount: 0,
      };
    }
    const roleMenus = await this.prismaService.roleMenus.findMany({
      where: {
        roleId,
      },
      select: {
        menuId: true,
      },
    });
    const userMenuIds = roleMenus.map((rm) => rm.menuId);
    // 需要新增的
    const addMenuIds = menuIds.filter((id) => !userMenuIds.includes(id));
    // 需要删除的
    const deleteMenuIds = userMenuIds.filter((id) => !menuIds.includes(id));
    const actions: Prisma.PrismaPromise<Prisma.BatchPayload>[] = [];
    if (deleteMenuIds.length > 0) {
      actions.push(this.deleteRoleMenu(roleId, deleteMenuIds));
    }
    if (addMenuIds.length > 0) {
      actions.push(this.addRoleMenus(roleId, addMenuIds));
    }
    if (actions.length === 0) {
      return {
        deleteCount: 0,
        addCount: 0,
      };
    }
    const [deleteCount, addCount] = await this.prismaService.$transaction(
      actions,
    );
    return {
      deleteCount: deleteCount.count,
      addCount: addCount.count,
    };
  }
}
