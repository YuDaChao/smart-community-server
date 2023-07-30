import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommunityDto } from './dtos/create-community.dto';
import { GetCommunityDto } from './dtos/get-community.dto';
import { UpdateCommunityDto } from './dtos/update-community.dto';

@Injectable()
export class CommunityService {
  constructor(private readonly prismaService: PrismaService) {}

  async getCommunityListByPage(getCommunityDto: GetCommunityDto) {
    const { current, pageSize, communityAddress, communityName, createdAt } =
      getCommunityDto;
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
      include: {
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
      orderBy: [{ createdAt: 'desc' }, { areaId: 'asc' }],
      take,
      skip,
    });
    return {
      count,
      data: communities,
    };
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
}
