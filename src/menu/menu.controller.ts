import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuEntity } from './entity/menu.entity';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  async getAllMenus() {
    return this.menuService.getAllMenus();
  }

  @Get()
  async getMenus(@Query('roleId', new ParseIntPipe()) roleId: number) {
    const menus = await this.menuService.getMenusByRoleId(roleId);
    return menus.map((menu) => new MenuEntity(menu));
  }
}
