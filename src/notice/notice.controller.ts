import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
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

  @Get(':id')
  async getNoticeInfo(
    @Param('id', new ParseIntPipe()) noticeId: number,
    @User('id') userId: number,
  ) {
    return this.noticeService.getNoticeById(noticeId, userId);
  }

  @Put(':id/view')
  async updateNoticeViewCount(
    @Param('id', new ParseIntPipe()) noticeId: number,
  ) {
    return this.noticeService.updateNoticeViewCountById(noticeId);
  }

  @Post()
  async createNotice(
    @Body() createNoticeDto: CreateNoticeDto,
    @User() user: RequestUser,
  ) {
    return this.noticeService.createNotice(createNoticeDto, user);
  }
}
