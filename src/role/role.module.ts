import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { MenuModule } from '../menu/menu.module';
import { RoleController } from './role.controller';

@Module({
  imports: [MenuModule],
  providers: [RoleService],
  exports: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
