import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';

@Module({
  providers: [MenuService],
  exports: [MenuService],
  controllers: [MenuController],
})
export class MenuModule {}
