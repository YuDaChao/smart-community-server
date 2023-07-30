import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateCommunityDto {
  @IsString()
  communityName: string;
  @IsString()
  communityAddress: string;
  @IsNumber()
  @IsPositive()
  areaId: number;
}
