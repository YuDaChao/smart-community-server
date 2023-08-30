import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import { CreateRepairDto } from './create-repair.dto';
import { PageDto } from '../../commons/page.dto';
import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class GetRepairDto extends IntersectionType(
  PartialType(CreateRepairDto),
  PageDto,
) {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  communityId: number;
}
