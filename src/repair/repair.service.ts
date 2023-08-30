import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRepairDto } from './dtos/create-repair.dto';
import { UpdateRepairProcessDto } from './dtos/update-repair-process.dto';
import { WorkflowService } from '../workflow/workflow.service';
import { Prisma } from '@prisma/client';
import { GetRepairDto } from './dtos/get-repair.dto';

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

  async getRepairList(getRepairDto: GetRepairDto) {
    const { pageSize, current, communityId } = getRepairDto;
    const where: Prisma.RepairWhereInput = {
      repairStatus: true,
    };
    if (communityId) {
      where.resident = {
        communityId,
      };
    }
    const count = await this.prismaService.repair.count({ where });
    if (count === 0) {
      return {
        count,
        data: [],
      };
    }
    const take = pageSize;
    const skip = (current - 1) * pageSize;
    const list = await this.prismaService.repair.findMany({
      where,
      include: {
        resident: {
          select: {
            id: true,
            residentName: true,
            residentType: true,
            residentPhone: true,
            communityId: true,
            building: {
              select: {
                id: true,
                buildingName: true,
                parent: true,
              },
            },
            house: {
              select: {
                id: true,
                floorNumber: true,
                floorNo: true,
              },
            },
          },
        },
        repairType: {
          select: {
            id: true,
            repairTypeName: true,
          },
        },
      },
      orderBy: [{ createdAt: 'desc' }],
      take,
      skip,
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
        repairType: true,
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
