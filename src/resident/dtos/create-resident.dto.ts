import { IsNumber, Matches, IsPositive, IsString } from 'class-validator';

export class CreateResidentDto {
  @IsString()
  residentName: string;
  @Matches(/^[1-8]\d{10}$/)
  residentPhone: string;
  @IsNumber()
  @IsPositive()
  floorNumber: number;
  @IsString()
  floorNo: string;
  @IsNumber()
  communityId: number;
  @IsNumber()
  buildingId: number;
}
