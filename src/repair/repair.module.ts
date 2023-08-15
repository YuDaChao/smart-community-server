import { Module } from '@nestjs/common';
import { RepairService } from './repair.service';
import { RepairController } from './repair.controller';

@Module({
  providers: [RepairService],
  controllers: [RepairController],
})
export class RepairModule {}
