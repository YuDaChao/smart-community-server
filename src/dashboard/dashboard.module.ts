import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { ResidentModule } from '../resident/resident.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [ResidentModule, UserModule],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule {}
