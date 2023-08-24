import { Module } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CommunityController } from './community.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [CommunityService],
  controllers: [CommunityController],
})
export class CommunityModule {}
