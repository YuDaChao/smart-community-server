import {
  IsNumber,
  Matches,
  IsString,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ResidentType } from '@prisma/client';

export class CreateResidentDto {
  @IsString()
  residentName: string;
  @Matches(/^[1-8]\d{10}$/)
  residentPhone: string;
  @IsEnum(ResidentType)
  residentType: ResidentType;
  @IsNumber()
  @Type(() => Number)
  communityId: number;
  @IsNumber()
  @Type(() => Number)
  buildingId: number;
  @IsNumber()
  @Type(() => Number)
  houseId: number;
}
