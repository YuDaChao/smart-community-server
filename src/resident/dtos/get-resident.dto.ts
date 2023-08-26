import { IntersectionType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PageDto } from '../../commons/page.dto';
import { UpdateResidentDto } from './update-resident.dto';
import { ResidentType } from '@prisma/client';

export class GetResidentDto extends IntersectionType(
  UpdateResidentDto,
  PageDto,
) {
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Date)
  createAt?: [Date, Date];
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  floorNumber?: number;
  @IsOptional()
  @IsString()
  floorNo?: string;
  @IsOptional()
  @IsEnum(ResidentType)
  residentType?: ResidentType;
}
