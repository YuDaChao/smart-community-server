import { Injectable } from '@nestjs/common';
import { Area } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AreaService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * 根据areaId 递归获取城市信息
   * @param areaId
   */
  async getRecursiveAreaInfoById(areaId: number): Promise<Partial<Area>> {
    return await this.prismaService.area.findFirst({
      where: { id: areaId },
      select: {
        id: true,
        areaName: true,
        areaCode: true,
        parent: {
          select: {
            id: true,
            areaName: true,
            areaCode: true,
            parent: {
              select: {
                id: true,
                areaName: true,
                areaCode: true,
              },
            },
          },
        },
      },
    });
  }
}
