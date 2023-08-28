import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetNoticeDto } from './dtos/get-notice.dto';
import { Prisma } from '@prisma/client';
import { CreateNoticeDto } from './dtos/create-notice.dto';
import { NoticeStatus } from './enums';
import { RequestUser } from '../commons/constant/jwt.constant';

@Injectable()
export class NoticeService {
  constructor(private readonly prismaService: PrismaService) {}

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
}
