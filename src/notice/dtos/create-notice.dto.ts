import { NoticeStatus, NoticeType } from '../enums';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateNoticeDto {
  @IsString()
  @IsNotEmpty()
  noticeTitle: string;
  @IsEnum(NoticeType)
  noticeType: NoticeType;
  @IsString()
  @IsNotEmpty()
  noticeContent: string;
  @IsEnum(NoticeStatus)
  noticeStatus: NoticeStatus;
  @IsOptional()
  @IsNumber()
  communityId?: number;
}
