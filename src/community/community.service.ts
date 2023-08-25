import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as xlsx from 'node-xlsx';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommunityDto } from './dtos/create-community.dto';
import { GetCommunityDto } from './dtos/get-community.dto';
import { UpdateCommunityDto } from './dtos/update-community.dto';
import { CommunityFileInterface } from './dtos/community-file.interface';
import { Community } from '@prisma/client';
import { AreaService } from '../area/area.service';

@Injectable()
export class CommunityService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly areaService: AreaService,
  ) {}

  async getCommunityListByPage(getCommunityDto: GetCommunityDto) {
    const {
      current,
      pageSize,
      communityAddress,
      communityName,
      createdAt,
      communityId,
    } = getCommunityDto;
    const take = pageSize;
    const skip = (current - 1) * pageSize;
    const where = [];
    if (communityName) {
      where.push({
        communityName: {
          contains: communityName,
        },
      });
    }
    if (communityId) {
      where.push({
        communityId: {
          equals: communityId,
        },
      });
    }
    if (communityAddress) {
      where.push({
        communityAddress: {
          contains: communityAddress,
        },
      });
    }
    if (createdAt) {
      where.push({
        createdAt: {
          gte: createdAt[0],
          lte: createdAt[1],
        },
      });
    }
    const count = await this.prismaService.community.count({
      where: {
        AND: where,
      },
    });
    if (count === 0) {
      return {
        count: 0,
        data: [],
      };
    }
    const communities = await this.prismaService.community.findMany({
      where: {
        AND: where,
      },
      select: {
        id: true,
        communityName: true,
        communityAddress: true,
        createdAt: true,
        updatedAt: true,
        area: {
          select: {
            id: true,
            areaName: true,
            areaCode: true,
            parentId: true,
            parent: {
              select: {
                id: true,
                areaName: true,
                areaCode: true,
                parentId: true,
                parent: {
                  select: {
                    id: true,
                    areaName: true,
                    areaCode: true,
                    parentId: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: [{ createdAt: 'desc' }],
      take,
      skip,
    });
    return {
      count,
      data: communities,
    };
  }

  /**
   * 查询小区列表
   * @param communityName
   */
  async getCommunityDictList(communityName?: string) {
    return this.prismaService.community.findMany({
      where: { communityName: { contains: communityName } },
      select: {
        id: true,
        communityName: true,
      },
      orderBy: [{ createdAt: 'asc' }],
      take: 10,
      skip: 0,
    });
  }

  async createCommunity(createCommunityDto: CreateCommunityDto) {
    return this.prismaService.community.create({
      data: {
        ...createCommunityDto,
        createdAt: new Date(),
      },
    });
  }

  async updateCommunity(
    communityId: number,
    updateCommunityDto: UpdateCommunityDto,
  ) {
    try {
      return await this.prismaService.community.update({
        where: { id: communityId },
        data: updateCommunityDto,
      });
    } catch (e) {
      if (e.code === 'P2025') {
        throw new NotFoundException(e.meta.cause);
      }
      throw new InternalServerErrorException();
    }
  }

  async batchExportCommunity(file: Express.Multer.File) {
    const workSheets = xlsx.parse<CommunityFileInterface>(file.buffer);
    const worksheet = workSheets[0];
    if (!worksheet || worksheet.data.length <= 1) {
      throw new NotFoundException();
    }
    const { data } = worksheet;
    const successCommunities: Omit<Community, 'id'>[] = [];
    const failCommunities: string[][] = [];
    const createdAt = new Date();
    let index = 1;
    const filterCommunities = data
      .slice(1)
      .filter(
        (community) =>
          community[0] &&
          community[1] &&
          community[2] &&
          community[3] &&
          community[4],
      );
    for (const community of filterCommunities) {
      const communityName = community[0];
      const communityAddress = community[1];
      const provinceName = String(community[2]);
      const cityName = String(community[3]);
      const areaName = String(community[4]);

      const areaIds = await this.areaService.getAreaIdByName(
        provinceName,
        cityName,
        areaName,
      );
      if (areaIds.length === 1) {
        successCommunities.push({
          communityName,
          communityAddress,
          areaId: areaIds[0],
          createdAt,
          updatedAt: createdAt,
        });
      } else {
        index++;
        failCommunities.push([
          index + '',
          communityName,
          communityAddress,
          provinceName,
          cityName,
          areaName,
          areaIds.length === 0 ? '城市没有匹配到' : '匹配到多个城市',
        ]);
      }
    }
    if (successCommunities.length === 0) {
      return { success: [], fail: failCommunities };
    }
    const result = await this.prismaService.community.createMany({
      data: successCommunities,
    });
    return { success: result, fail: failCommunities };
  }
}
