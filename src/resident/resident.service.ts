import { Injectable } from '@nestjs/common';
import { Prisma, ResidentType, VerifyStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateResidentDto } from './dtos/create-resident.dto';
import { GetResidentDto } from './dtos/get-resident.dto';
import { UpdateResidentDto } from './dtos/update-resident.dto';
import { ResidentCountInterface } from './interface/resident-count.interface';

@Injectable()
export class ResidentService {
  constructor(private readonly prismaService: PrismaService) {}

  async createResident(createResidentDto: CreateResidentDto) {
    return await this.prismaService.resident.create({
      data: {
        ...createResidentDto,
        createdAt: new Date(),
      },
    });
  }

  async updateResident(id: number, updateResidentDto: UpdateResidentDto) {
    return await this.prismaService.resident.update({
      where: { id },
      data: updateResidentDto,
    });
  }

  async getResidentList(getResidentDto: GetResidentDto) {
    const { pageSize, current, ...filters } = getResidentDto;
    const skip = (current - 1) * pageSize;
    const take = pageSize;
    const where: Prisma.ResidentWhereInput = {};
    Object.keys(filters).forEach((key: keyof typeof filters) => {
      if (key === 'createAt') {
        where.createdAt = {
          gte: filters[key][0],
          lte: filters[key][1],
        };
      }
      if (key === 'residentName') {
        where[key] = {
          startsWith: filters[key],
        };
      }
      if (key === 'communityId' || key === 'buildingId' || key === 'houseId') {
        where[key] = {
          equals: filters[key],
        };
      }
      if (
        key === 'residentPhone' ||
        key === 'residentType' ||
        key === 'verifyStatus'
      ) {
        where[key] = filters[key];
      }
      if (key === 'floorNo' || key === 'floorNumber' || key === 'houseStatus') {
        where.house = {
          is: {
            [key]: filters[key],
          },
        };
      }
    });
    console.log(where);
    const count = await this.prismaService.resident.count({
      where,
    });
    if (count === 0) {
      return {
        count: 0,
        data: [],
      };
    }
    const residentList = await this.prismaService.resident.findMany({
      where,
      include: {
        community: {
          select: {
            id: true,
            communityName: true,
            communityAddress: true,
          },
        },
        building: {
          select: {
            id: true,
            buildingName: true,
          },
        },
        house: {
          select: {
            id: true,
            floorNo: true,
            floorNumber: true,
            houseStatus: true,
          },
        },
      },
      orderBy: [{ createdAt: 'desc' }],
      skip,
      take,
    });
    return {
      count,
      data: residentList,
    };
  }

  /**
   * 查询小区入住人数 已认证的
   * @param params
   */
  async getResidentCountByCommunityId(params: ResidentCountInterface) {
    const { communityId, createdAt } = params;
    const andWhere: Prisma.ResidentWhereInput[] = [
      { verifyStatus: VerifyStatus.SUCCESS },
    ];
    // 超级管理员 查看所有小区数据
    if (communityId) {
      andWhere.push({ communityId });
    }
    if (params.residentType) {
      andWhere.push({ residentType: params.residentType });
    }
    if (createdAt) {
      andWhere.push({
        createdAt: {
          lte: createdAt,
        },
      });
    }
    return this.prismaService.resident.count({ where: { AND: andWhere } });
  }

  /**
   * 查询小区租户人数 已认证的
   * @param communityId
   */
  async getResidentTenantCountByCommunityId(communityId?: number) {
    const andWhere: Prisma.ResidentWhereInput[] = [
      { verifyStatus: VerifyStatus.SUCCESS },
      { residentType: ResidentType.TENANT },
    ];
    // 超级管理员 查看所有小区数据
    if (communityId) {
      andWhere.push({ communityId });
    }
    return this.prismaService.resident.count({ where: { AND: andWhere } });
  }

  /**
   * 统计小区住户房屋类型数
   * @param communityId
   */
  async getResidentHouseStatusCountByCommunityId(communityId?: number) {
    const where: Prisma.ResidentWhereInput = {};
    // 超级管理员 查看所有小区数据
    if (communityId) {
      where.communityId = communityId;
    }
    const result = await this.prismaService.house.groupBy({
      by: ['houseStatus'],
      _count: {
        _all: true,
      },
    });
    return result.map((item) => ({
      houseStatus: item.houseStatus,
      count: item._count._all,
    }));
  }

  /**
   * 统计房屋认证数量
   * @param communityId
   */
  async getResidentCertificationStatusCountByCommunityId(communityId?: number) {
    const where: Prisma.ResidentWhereInput = {};
    // 超级管理员 查看所有小区数据
    if (communityId) {
      where.communityId = communityId;
    }
    const result = await this.prismaService.resident.groupBy({
      by: ['verifyStatus'],
      _count: {
        _all: true,
      },
    });
    return result.map((item) => ({
      certificationStatus: item.verifyStatus,
      count: item._count._all,
    }));
  }
}
