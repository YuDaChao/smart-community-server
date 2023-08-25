import { Module } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CommunityController } from './community.controller';
import { UserModule } from '../user/user.module';
import { AreaModule } from '../area/area.module';

@Module({
  imports: [UserModule, AreaModule],
  providers: [CommunityService],
  controllers: [CommunityController],
})
export class CommunityModule {}
