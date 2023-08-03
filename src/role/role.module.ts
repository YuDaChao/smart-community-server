import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { MenuModule } from '../menu/menu.module';

@Module({
  imports: [MenuModule],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
