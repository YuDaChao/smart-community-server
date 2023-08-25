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

  /**
   * 根据名称验证获取 id，验证城市名称是否正确
   * @param provinceName
   * @param cityName
   * @param areaName
   */
  async getAreaIdByName(
    provinceName: string,
    cityName: string,
    areaName: string,
  ) {
    const areas = await this.prismaService.area.findMany({
      where: {
        areaName: { equals: areaName },
      },
      select: {
        id: true,
        parent: {
          where: { areaName: { equals: cityName } },
          select: {
            id: true,
            parent: {
              where: { areaName: { equals: provinceName } },
              select: { id: true },
            },
          },
        },
      },
    });
    return areas.map((area) => area.id);
  }
}
