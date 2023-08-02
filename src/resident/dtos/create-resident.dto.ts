import { IsNumber, Matches, IsPositive, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateResidentDto {
  @IsString()
  residentName: string;
  @Matches(/^[1-8]\d{10}$/)
  residentPhone: string;
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  floorNumber: number;
  @IsString()
  floorNo: string;
  @IsNumber()
  @Type(() => Number)
  communityId: number;
  @IsNumber()
  @Type(() => Number)
  buildingId: number;
}
