import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetNoticeDto } from './dtos/get-notice.dto';
import { Prisma } from '@prisma/client';
import { CreateNoticeDto } from './dtos/create-notice.dto';
import { NoticeStatus } from './enums';
import { RequestUser } from '../commons/constant/jwt.constant';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class NoticeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly redisService: RedisService,
  ) {}

  /**
   * 查询通知列表
   * @param getNoticeDto
   */
  async getNoticeListByPage(getNoticeDto: GetNoticeDto) {
    const { pageSize, current } = getNoticeDto;
    const count = await this.prismaService.notice.count();
    if (count === 0) {
      return { count, data: [] };
    }
    const take = pageSize;
    const skip = (current - 1) * pageSize;
    const notices = await this.prismaService.notice.findMany({
      where: {
        noticeStatus: NoticeStatus.ENABLE,
      },
      include: {
        user: {
          select: {
            id: true,
            userName: true,
          },
        },
        community: {
          select: {
            id: true,
            communityName: true,
          },
        },
      },
      orderBy: [{ createdAt: 'desc' }],
      take,
      skip,
    });
    return { count, data: notices };
  }

  async getNoticeById(noticeId: number, userId: number) {
    const key = this.getRedisNoticeKey(userId, noticeId);
    const redisViewCount = await this.redisService.get(key);
    const noticeInfo = await this.prismaService.notice.findUnique({
      where: { id: noticeId },
      include: {
        user: {
          select: {
            id: true,
            userName: true,
          },
        },
        community: {
          select: {
            id: true,
            communityName: true,
          },
        },
      },
    });
    if (!redisViewCount) {
      const noticeViewCount = await this.updateNoticeViewCountById(noticeId);
      noticeInfo.viewCount = noticeViewCount;
      await this.redisService.set(key, noticeViewCount);
    } else {
      await this.redisService.set(key, redisViewCount + 1);
    }

    return noticeInfo;
  }

  async createNotice(createNoticeDto: CreateNoticeDto, user: RequestUser) {
    const { communityId, ...rest } = createNoticeDto;

    // 不能创建不属于自己管辖的通知
    if (user.communityId && communityId && user.communityId !== communityId) {
      throw new ForbiddenException();
    }

    const notice: Prisma.NoticeCreateInput = {
      createdAt: new Date(),
      viewCount: 0,
      user: {
        connect: { id: user.id },
      },
      ...rest,
    };
    const cId = user.communityId || communityId;

    if (cId) {
      notice.community = {
        connect: { id: cId },
      };
    }
    return this.prismaService.notice.create({ data: notice });
  }

  /**
   * 更新阅读量
   * @param noticeId
   */
  async updateNoticeViewCountById(noticeId: number) {
    const noticeInfo = await this.prismaService.notice.findUnique({
      where: { id: noticeId },
      select: {
        viewCount: true,
      },
    });
    if (!noticeInfo) {
      return 0;
    }
    await this.prismaService.notice.update({
      where: { id: noticeId },
      data: { viewCount: (noticeInfo.viewCount || 0) + 1 },
    });
    return (noticeInfo.viewCount || 0) + 1;
  }

  getRedisNoticeKey(userId: number, noticeId: number) {
    return `user#${userId}_notice#${noticeId}`;
  }
}
