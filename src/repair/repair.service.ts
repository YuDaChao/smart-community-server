import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRepairDto } from './dtos/create-repair.dto';
import { UpdateRepairProcessDto } from './dtos/update-repair-process.dto';
import { WorkflowService } from '../workflow/workflow.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RepairService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly workflowService: WorkflowService,
  ) {}

  /**
   * 报修申请
   * @param createRepairDto
   * @param repairFiles 报修附件
   */
  async createRepair(createRepairDto: CreateRepairDto, repairFiles: string[]) {
    return await this.prismaService.repair.create({
      data: {
        ...createRepairDto,
        repairStatus: true,
        createdAt: new Date(),
        repairFiles: {
          create: repairFiles.map((file) => ({
            fileUrl: file,
            createdAt: new Date(),
          })),
        },
        repairProgress: {
          create: {
            workflowId: 1,
            createdAt: new Date(),
          },
        },
      },
    });
  }

  async updateRepairProcess(updateRepairProcessDto: UpdateRepairProcessDto) {
    const { repairId, remark } = updateRepairProcessDto;
    return this.prismaService.repairProgress.create({
      data: {
        repairId,
        workflowId: 2,
        remark,
        createdAt: new Date(),
      },
    });
  }

  async getRepairList() {
    const where: Prisma.RepairWhereInput = {
      repairStatus: true,
    };
    const count = await this.prismaService.repair.count({ where });
    const list = await this.prismaService.repair.findMany({
      where,
      include: {
        resident: {
          select: {
            id: true,
            residentName: true,
            residentType: true,
          },
        },
        repairFiles: {
          select: {
            id: true,
            fileUrl: true,
          },
        },
        repairProgress: {
          include: {
            workflow: {
              select: {
                id: true,
                workflowName: true,
              },
            },
            repairProgressFiles: {
              select: {
                id: true,
                fileUrl: true,
              },
            },
          },
        },
      },
      orderBy: [{ createdAt: 'desc' }],
    });
    return {
      count,
      data: list,
    };
  }

  async getRepairById(repairId: number) {
    const repairInfo = await this.prismaService.repair.findUnique({
      where: { id: repairId },
      include: {
        resident: {
          select: {
            id: true,
            residentName: true,
            residentType: true,
          },
        },
        repairFiles: {
          select: {
            id: true,
            fileUrl: true,
          },
        },
        repairProgress: {
          include: {
            workflow: {
              select: {
                id: true,
                workflowName: true,
              },
            },
            repairProgressFiles: {
              select: {
                id: true,
                fileUrl: true,
              },
            },
          },
        },
      },
    });
    const repairWorkflows = await this.workflowService.getWorkflowByModeType(1);
    return {
      repairInfo,
      repairWorkflows,
    };
  }
}
