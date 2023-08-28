import { IntersectionType } from '@nestjs/mapped-types';
import { PageDto } from '../../commons/page.dto';
import { UpdateNoticeDto } from './update-notice.dto';

export class GetNoticeDto extends IntersectionType(UpdateNoticeDto, PageDto) {}
