import { Body, Controller, Put } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RoleService } from './role.service';
import { UpdateRoleMenuDto } from './dtos/update-role-menu.dto';

@Controller('role')
export class RoleController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly roleService: RoleService,
  ) {}

  @Put('menu')
  async updateUserRoleMenu(@Body() updateRoleMenuDto: UpdateRoleMenuDto) {
    return await this.roleService.updateUserMenu(
      updateRoleMenuDto.roleId,
      updateRoleMenuDto.menuIds,
    );
  }
}
