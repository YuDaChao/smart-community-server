import { Module } from '@nestjs/common';
import { ResidentService } from './resident.service';
import { ResidentController } from './resident.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [ResidentService],
  controllers: [ResidentController],
})
export class ResidentModule {}
