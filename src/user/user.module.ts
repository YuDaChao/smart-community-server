import { Module } from '@nestjs/common';
import { AreaModule } from '../area/area.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [AreaModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
