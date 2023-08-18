import { Module } from '@nestjs/common';
import { RepairService } from './repair.service';
import { RepairController } from './repair.controller';
import { WorkflowModule } from '../workflow/workflow.module';

@Module({
  imports: [WorkflowModule],
  providers: [RepairService],
  controllers: [RepairController],
})
export class RepairModule {}
