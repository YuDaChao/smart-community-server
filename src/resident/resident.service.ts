import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma, VerifyStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateResidentDto } from './dtos/create-resident.dto';
import { GetResidentDto } from './dtos/get-resident.dto';
import { UpdateResidentDto } from './dtos/update-resident.dto';

@Injectable()
export class ResidentService {
  constructor(private readonly prismaService: PrismaService) {}

  async createResident(createResidentDto: CreateResidentDto) {
    return this.prismaService.resident.create({
      data: {
        ...createResidentDto,
        createdAt: new Date(),
      },
    });
  }

  async updateResident(id: number, updateResidentDto: UpdateResidentDto) {
    return this.prismaService.resident.update({
      where: { id },
      data: updateResidentDto,
    });
  }

  async getResidentList(getResidentDto: GetResidentDto) {
    const { pageSize, current, ...filters } = getResidentDto;
    const skip = (current - 1) * pageSize;
    const take = pageSize;
    const andWhere: Prisma.ResidentWhereInput[] = [];
    Object.keys(filters).forEach((key: keyof typeof filters) => {
      if (key === 'createAt') {
        andWhere.push({
          createdAt: {
            gte: filters[key][0],
            lte: filters[key][1],
          },
        });
      }
      if (key === 'residentName') {
        andWhere.push({
          [key]: {
            startsWith: filters[key],
          },
        });
      }
      if (
        key === 'residentPhone' ||
        key === 'communityId' ||
        key === 'buildingId' ||
        key === 'houseId'
      ) {
        andWhere.push({
          [key]: {
            equals: filters[key],
          },
        });
      }
      if (key === 'floorNo' || key === 'floorNumber') {
        andWhere.push({
          house: {
            is: {
              [key]: filters[key],
            },
          },
        });
      }
    });
    const count = await this.prismaService.resident.count({
      where: {
        AND: andWhere,
      },
    });
    if (count === 0) {
      return {
        count: 0,
        data: [],
      };
    }
    const residentList = await this.prismaService.resident.findMany({
      where: {
        AND: andWhere,
      },
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
   * 查询小区总人数 已认证的
   * @param communityId
   */
  async getResidentCountByCommunityId(communityId?: number) {
    const andWhere: Prisma.ResidentWhereInput[] = [
      { verifyStatus: VerifyStatus.SUCCESS },
    ];
    // 超级管理员 查看所有小区数据
    if (communityId) {
      andWhere.push({ communityId });
    }
    return this.prismaService.resident.count({ where: { AND: andWhere } });
  }

  /**
   * 统计小区住户房屋类型人数
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
