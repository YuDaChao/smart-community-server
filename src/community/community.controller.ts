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
import { User } from '../commons/decorators/user.decorator';
import { RequestUser } from '../commons/constant/jwt.constant';
import { UserService } from '../user/user.service';

@Controller('community')
export class CommunityController {
  constructor(
    private readonly communityService: CommunityService,
    private readonly userService: UserService,
  ) {}

  @Get()
  async getCommunityList(
    @Query() getCommunityDto: GetCommunityDto,
    @User() user: RequestUser,
  ) {
    /**
     * 角色判断
     * 1. 小区管理员只能查看本小区的住户
     * 2. 超级管理员可以查看所有小区的住户
     */
    const userInfo = await this.userService.getUserRoleInfoById(user.id);
    const query: GetCommunityDto = {
      ...getCommunityDto,
    };
    // 1. 小区管理员只能查看本小区的住户
    if (userInfo.communityId) {
      query.communityId = userInfo.communityId;
    }
    return this.communityService.getCommunityListByPage(query);
  }

  @Get('/dict')
  async getCommunityDictList(@Query('communityName') communityName: string) {
    return this.communityService.getCommunityDictList(communityName);
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
