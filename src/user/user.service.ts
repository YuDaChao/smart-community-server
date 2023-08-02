import { Injectable } from '@nestjs/common';
import { Area } from '@prisma/client';
import { AreaService } from '../area/area.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly areaService: AreaService,
  ) {}

  async getUserRoleInfoById(userId: number) {
    return this.prismaService.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        role: true,
        communityId: true,
      },
    });
  }

  async getUserInfoById(userId: number) {
    const userAndCommunity = await this.prismaService.user.findFirst({
      where: { id: userId },
      select: {
        id: true,
        userName: true,
        avatar: true,
        role: true,
        communityId: true,
        community: {
          select: {
            communityName: true,
            communityAddress: true,
            areaId: true,
          },
        },
      },
    });
    const { community, ...user } = userAndCommunity;
    let area: Partial<Area>;
    if (community.areaId) {
      area = await this.areaService.getRecursiveAreaInfoById(community.areaId);
    }
    return {
      ...user,
      ...community,
      area,
    };
  }
}
