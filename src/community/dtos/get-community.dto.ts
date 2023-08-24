import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

export class GetCommunityDto {
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  pageSize: number;
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  current: number;
  @IsString()
  @IsOptional()
  communityName: string;
  @IsString()
  @IsOptional()
  communityAddress: string;
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Date)
  createdAt: [Date, Date];
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  communityId: number;
}
