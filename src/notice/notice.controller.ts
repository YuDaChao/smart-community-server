import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { CreateNoticeDto } from './dtos/create-notice.dto';
import { User } from '../commons/decorators/user.decorator';
import { RequestUser } from '../commons/constant/jwt.constant';
import { GetNoticeDto } from './dtos/get-notice.dto';

@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Get()
  async getNoticeList(@Query() getNoticeDto: GetNoticeDto) {
    return this.noticeService.getNoticeListByPage(getNoticeDto);
  }

  @Post()
  async createNotice(
    @Body() createNoticeDto: CreateNoticeDto,
    @User() user: RequestUser,
  ) {
    return this.noticeService.createNotice(createNoticeDto, user);
  }
}
