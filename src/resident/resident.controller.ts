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
import { CreateResidentDto } from './dtos/create-resident.dto';
import { GetResidentDto } from './dtos/get-resident.dto';
import { UpdateResidentDto } from './dtos/update-resident.dto';
import { ResidentService } from './resident.service';
import { UserService } from '../user/user.service';
import { User } from '../decorators/user.decorator';
import { RequestUser } from '../constant/jwt.constant';

@Controller('resident')
export class ResidentController {
  constructor(
    private readonly residentService: ResidentService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async createResident(@Body() createResidentDto: CreateResidentDto) {
    return await this.residentService.createResident(createResidentDto);
  }

  @Put(':residentId')
  async updateResident(
    @Param('residentId', new ParseIntPipe()) residentId: number,
    @Body() updateResidentDto: UpdateResidentDto,
  ) {
    return await this.residentService.updateResident(
      residentId,
      updateResidentDto,
    );
  }

  @Get()
  async getResidentList(
    @Query() getResidentDto: GetResidentDto,
    @User() user: RequestUser,
  ) {
    /**
     * 角色判断
     * 1. 小区管理员只能查看本小区的住户
     * 2. 超级管理员可以查看所有小区的住户
     */
    const userInfo = await this.userService.getUserRoleInfoById(user.id);
    const query: GetResidentDto = {
      ...getResidentDto,
    };
    // 1. 小区管理员只能查看本小区的住户
    if (userInfo.roleId === 1) {
      query.communityId = userInfo.communityId;
    }
    return this.residentService.getResidentList(query);
  }
}
