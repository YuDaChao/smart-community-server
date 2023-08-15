import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRepairDto } from './dtos/create-repair.dto';

@Injectable()
export class RepairService {
  constructor(private readonly prismaService: PrismaService) {}

  async createRepair(createRepairDto: CreateRepairDto, repairFiles: string[]) {
    return await this.prismaService.repair.create({
      data: {
        ...createRepairDto,
        createdAt: new Date(),
        residentId: 1,
        repairFiles: {
          create: repairFiles.map((file) => ({
            fileUrl: file,
            createdAt: new Date(),
          })),
        },
      },
    });
  }

  async getRepairList() {
    const count = await this.prismaService.repair.count();
    const list = await this.prismaService.repair.findMany({
      include: {
        resident: {
          select: {
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
      },
    });
    return {
      count,
      data: list,
    };
  }
}
