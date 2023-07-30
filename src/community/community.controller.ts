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
import { CommunityService } from './community.service';
import { CreateCommunityDto } from './dtos/create-community.dto';
import { GetCommunityDto } from './dtos/get-community.dto';
import { UpdateCommunityDto } from './dtos/update-community.dto';

@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Get()
  async getCommunityList(@Query() getCommunityDto: GetCommunityDto) {
    return this.communityService.getCommunityListByPage(getCommunityDto);
  }

  @Post()
  async createCommunity(@Body() createCommunityDto: CreateCommunityDto) {
    return await this.communityService.createCommunity(createCommunityDto);
  }

  @Put(':communityId')
  async updateCommunity(
    @Param('communityId', new ParseIntPipe()) communityId: number,
    @Body() updateCommunityDto: UpdateCommunityDto,
  ) {
    return await this.communityService.updateCommunity(
      communityId,
      updateCommunityDto,
    );
  }
}
