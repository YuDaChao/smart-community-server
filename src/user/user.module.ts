import { Module } from '@nestjs/common';
import { AreaModule } from '../area/area.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [AreaModule, RoleModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
