import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  async getMenus(@Query('roleId', new ParseIntPipe()) roleId: number) {
    return await this.menuService.getMenusByRoleId(roleId);
  }
}
