import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WorkflowService {
  constructor(private readonly prismaService: PrismaService) {}

  async getWorkflowByModeType(modelType: number) {
    return this.prismaService.workflow.findMany({
      where: { modelType: modelType },
      select: {
        id: true,
        workflowName: true,
      },
      orderBy: [{ workflowSort: 'asc' }],
    });
  }
}
